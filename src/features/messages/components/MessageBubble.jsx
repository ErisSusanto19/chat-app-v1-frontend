import React from 'react';
import clsx from 'clsx';

function MessageBubble({ message, isOwnMessage }) {
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

    return (
        <div className={containerClasses}>
            <div className={bubbleClasses}>
                <p className="text-sm">{message.text}</p>
                <p className={clsx(
                    "text-xs mt-1 text-right",
                    isOwnMessage ? 'text-amber-200' : 'text-gray-400'
                )}>
                    {message.timestamp}
                </p>
            </div>
        </div>
    );
}

export default MessageBubble;