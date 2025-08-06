import React, { useEffect, useRef, useState } from 'react';
import IconButton from '@/shared/ui/IconButton';
import { Send, Paperclip, Smile, X, File as FileIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../conversationThunk'
import { socket } from '../../../lib/socket';
import axiosIntance from '@/services/axiosInstance'
import toast from 'react-hot-toast';

const MessageInput = ({ conversationId }) => {
    const [text, setText] = useState('');
    const { user: currentUser } = useSelector(state => state.auth)
    const typingTimeoutRef = useRef(null);
    const [attachment, setAttachment] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleTyping = (e) => {
        setText(e.target.value);

        if (!typingTimeoutRef.current) {
            socket.emit('typing_start', { conversationId });
        }
        
        clearTimeout(typingTimeoutRef.current);

        typingTimeoutRef.current = setTimeout(() => {
            socket.emit('typing_stop', { conversationId });
            typingTimeoutRef.current = null;
        }, 1500)
    }

    useEffect(() => {
        return () => clearTimeout(typingTimeoutRef.current);
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileType = file.type.startsWith('image/') ? 'image' : 'file';
            setAttachment({
                file: file,
                preview: fileType === 'image'? URL.createObjectURL(file) : null,
                type: fileType
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (text.trim() === '' && !attachment || isUploading) return;

        setIsUploading(true)

        try {
            let finalContent;

            if(attachment) {
                toast.loading('Uploading file...')
                let uploadedFileUrl;

                try {
                    
                    const sigResponse = await axiosIntance.get('utilities/cloudinary-signature')
                    const { timestamp, signature } = sigResponse.data
    
                    const formData = new FormData();
                    formData.append('file', attachment.file)
                    formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY)
                    formData.append('timestamp', timestamp)
                    formData.append('signature', signature)
                    formData.append('folder', 'chat_media')
    
                    const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/raw/upload`, {
                        method: 'POST',
                        body: formData
                    })
    
                    const uploadResult = await uploadResponse.json()
    
                    if(!uploadResponse.ok) throw new Error(uploadResult.error.message)
    
                    uploadedFileUrl = uploadResult.secure_url
                    toast.dismiss()
                } catch (uploadError) {
                    throw new Error('File upload failed. Please try again.')
                }

                finalContent = {
                    type: attachment.type,
                    message: text,
                    url: uploadedFileUrl,
                    metadata: {
                        fileName: attachment.file.name,
                        fileSize: attachment.file.size
                    }
                }
            } else {
                finalContent = {
                    type: 'text',
                    message: text,
                    url: null
                }
            }

            const messageData = {
                conversationId,
                senderId: currentUser._id,
                content: finalContent
            };
    
            socket.emit('send_message', messageData)
    
            clearTimeout(typingTimeoutRef.current);
            socket.emit('typing_stop', { conversationId });
            typingTimeoutRef.current = null;
    
            setText('');
            setAttachment(null)
        } catch (error) {         
            toast.dismiss()
            toast.error(error.message || 'Failed to send message.')
        } finally {
            setIsUploading(false)
        }

    };

    return (
        <footer className="p-3 border-t border-gray-200 bg-gray-100 w-full">
            {attachment && (
                <div className="relative p-2 mb-2 bg-gray-200 rounded-md w-fit">
                    <button 
                        onClick={() => setAttachment(null)}
                        className="absolute -top-2 -right-2 bg-gray-700 text-white rounded-full p-1"
                    >
                        <X size={12} />
                    </button>

                    {attachment.type === 'image' && attachment.preview ? (
                        <img 
                            src={attachment.preview} 
                            alt="Image Preview" 
                            className="h-20 w-auto rounded" 
                            onLoad={() => URL.revokeObjectURL(attachment.preview)}
                        />
                    ) : (
                        <div className="flex items-center gap-2 p-2">
                            <FileIcon size={32} className="text-gray-600 flex-shrink-0" />
                            <p className="text-sm text-gray-800 font-medium truncate">
                                {attachment.file.name}
                            </p>
                        </div>
                    )}
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex items-center gap-3">
                <IconButton Icon={Smile} />
                <IconButton Icon={Paperclip} 
                    onClick={() => fileInputRef.current.click()}
                />

                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange}
                    className="hidden" 
                />

                <input
                    type="text"
                    value={text}
                    onChange={handleTyping}
                    placeholder={attachment? "Add a caption..." : "Type a message"}
                    disabled={isUploading}
                    className="flex-1 rounded-full border-gray-300 px-4 py-2 focus:border-amber-500 focus:ring-amber-500"
                />
                <IconButton 
                    Icon={Send} 
                    type="submit" 
                    className="bg-amber-500 text-white hover:bg-amber-600"
                    title="Send"
                    disabled={isUploading}
                />
            </form>
        </footer>
    );
}

export default MessageInput;