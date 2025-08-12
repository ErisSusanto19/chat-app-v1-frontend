import React from 'react';
import Avatar from '@/shared/ui/Avatar';
import clsx from 'clsx';
import { format } from 'date-fns';
import { File as FileIcon, Image as ImageIcon } from 'lucide-react'

const ConversationItem = ({ conversation, onSelect, isSelected }) => {

    const displayName = conversation.name;
    const displayImage = conversation.image;
    
    const lastMessageTimestamp = conversation.lastMessage?.createdAt;
    let displayTime = '';
    if (lastMessageTimestamp) {
        displayTime = format(new Date(lastMessageTimestamp), 'p');
    }

    const renderLastMessage = () => {
        const lastMsg = conversation.lastMessage;

        if (!lastMsg) {
            return <span className="italic text-gray-500">No messages yet.</span>;
        }

        const msgType = lastMsg.content?.type;
        const msgText = lastMsg.content?.message;
        const fileName = lastMsg.content?.metadata?.fileName;

        if (msgType === 'image') {
            return (
                <div className="flex items-center gap-1 text-gray-500">
                    <ImageIcon size={16} />
                    <span>{msgText || 'Image'}</span>
                </div>
            );
        }

        if (msgType === 'file') {
            return (
                <div className="flex items-center gap-1 text-gray-500">
                    <FileIcon size={16} />
                    <span>{fileName || msgText || 'File'}</span>
                </div>
            );
        }
        
        if (msgType === 'notification') {
             return <span className="italic text-gray-500">{msgText}</span>
        }

        return msgText;
    };

    return (
        <div 
            onClick={onSelect} 
            className={clsx(
                "flex items-center p-3 cursor-pointer",
                isSelected ? "bg-amber-100" : "hover:bg-gray-100"
            )}
        >
            <Avatar 
                src={displayImage} 
                fallbackText={displayName?.charAt(0).toUpperCase() || '?'}
            />
            <div className="ml-4 flex-1 border-b border-gray-200 pb-3">
                <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-800 truncate">{displayName}</p>
                    <p className="text-xs text-gray-500 flex-shrink-0 ml-2">{displayTime}</p>
                </div>
                <div className="flex justify-between items-start mt-1">
                    <div className="text-sm text-gray-600 truncate">{renderLastMessage()}</div>
                     {conversation.unreadCount > 0 && (
                        <div 
                            className="bg-green-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0"
                        >
                            {conversation.unreadCount}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConversationItem;