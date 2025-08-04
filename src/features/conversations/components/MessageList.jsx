import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import { useSelector } from 'react-redux';

const MessageList = ({messages = []}) => {
    const endOfMessagesRef = useRef(null);

    const { user: currentUser } = useSelector(state => state.auth);

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

     if (!messages || messages.length === 0) {
        return (
            <main className="flex-1 overflow-y-auto p-4 bg-gray-200 w-full flex items-center justify-center">
                <p className="text-gray-500">No messages yet. Start the conversation!</p>
            </main>
        );
    }

    return (
        <main className="flex-1 overflow-y-auto p-4 bg-gray-200 w-full">
            {messages.map(msg => (
                <MessageBubble 
                    key={msg._id} 
                    message={msg}
                    isOwnMessage={msg.senderId === currentUser?._id}
                />
            ))}
            <div ref={endOfMessagesRef} />
        </main>
    );
}

export default MessageList;