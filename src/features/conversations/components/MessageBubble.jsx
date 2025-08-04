import React from 'react';
import clsx from 'clsx';
import { format } from 'date-fns'

const MessageBubble = ({ message, isOwnMessage }) => {
    
    const bubbleClasses = clsx(
        'rounded-xl px-4 py-2 max-w-sm md:max-w-md',
        isOwnMessage 
            ? 'bg-amber-500 text-white'
            : 'bg-white text-gray-800 shadow-sm'
    );

    const containerClasses = clsx(
        'flex mb-3',
        isOwnMessage && 'justify-end'
    );

    const messageText = message.content?.message || '';
    const timestamp = message.createdAt;

    let displayTime = '';
    if (timestamp) {
        displayTime = format(new Date(timestamp), 'p');
    }

    return (
        <div className={containerClasses}>
            <div className={bubbleClasses}>
                <p className="text-sm">{messageText}</p>
                <p className={clsx(
                    "text-xs mt-1 text-right",
                    isOwnMessage ? 'text-amber-200' : 'text-gray-400'
                )}>
                    {displayTime}
                </p>
            </div>
        </div>
    );
}

export default MessageBubble;