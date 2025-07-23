import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';

const dummyMessages = [
    { id: 1, userId: 'rina', text: 'Halo! Lagi apa?', timestamp: '10:30 AM' },
    { id: 2, userId: 'me', text: 'Hey Rina! Lagi ngoding project chat ini hehe.', timestamp: '10:31 AM' },
    { id: 3, userId: 'me', text: 'Kamu sendiri?', timestamp: '10:31 AM' },
    { id: 4, userId: 'rina', text: 'Wih keren! Aku lagi nonton film aja.', timestamp: '10:32 AM' },
    { id: 5, userId: 'rina', text: 'Nanti kalau udah jadi, kabarin ya!', timestamp: '10:32 AM' },
];

const currentUserId = 'me';

function MessageList() {
    const endOfMessagesRef = useRef(null);

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [dummyMessages]);

    return (
        <main className="flex-1 overflow-y-auto p-4 bg-gray-200">
            {dummyMessages.map(msg => (
                <MessageBubble 
                    key={msg.id} 
                    message={msg}
                    isOwnMessage={msg.userId === currentUserId}
                />
            ))}
            <div ref={endOfMessagesRef} />
        </main>
    );
}

export default MessageList;