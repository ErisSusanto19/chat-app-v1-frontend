import React, { useState } from 'react';
import IconButton from '@/shared/ui/IconButton';
import { Send, Paperclip, Smile } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../conversationThunk'

const MessageInput = ({ conversationId }) => {
    const [text, setText] = useState('');
    const dispatch = useDispatch()
    const { user: currentUser } = useSelector(state => state.auth)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim() === '' || !currentUser?._id) return;

        const messageData = {
            senderId: currentUser._id,
            content: {
                type: 'text',
                message: text,
                url: null
            }
        };

        dispatch(sendMessage({ conversationId, messageData }));

        setText('');
    };

    return (
        <footer className="p-3 border-t border-gray-200 bg-gray-100 w-full">
            <form onSubmit={handleSubmit} className="flex items-center gap-3">
                <IconButton Icon={Smile} />
                <IconButton Icon={Paperclip} />

                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type a message"
                    className="flex-1 rounded-full border-gray-300 px-4 py-2 focus:border-amber-500 focus:ring-amber-500"
                />
                <IconButton 
                    Icon={Send} 
                    type="submit" 
                    className="bg-amber-500 text-white hover:bg-amber-600"
                    title="Send"
                />
            </form>
        </footer>
    );
}

export default MessageInput;