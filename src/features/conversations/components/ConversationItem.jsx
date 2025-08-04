import React from 'react';
import Avatar from '@/shared/ui/Avatar';
import clsx from 'clsx';
import { format } from 'date-fns';

const ConversationItem = ({ conversation, onSelect, isSelected }) => {
    const displayName = conversation.name;
    const displayImage = conversation.image;
    const lastMessageText = conversation.lastMessage?.content?.message || 'No messages yet.';
    
    const lastMessageTimestamp = conversation.lastMessage?.createdAt;
    let displayTime = '';
    if (lastMessageTimestamp) {
        displayTime = format(new Date(lastMessageTimestamp), 'p');
    }

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
                <p className="text-sm text-gray-600 truncate">{lastMessageText}</p>
            </div>
        </div>
    );
};

export default ConversationItem;