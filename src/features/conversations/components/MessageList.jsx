import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';

const dummyMessages = [
    { id: 1, userId: 'rina', text: 'Halo! Lagi apa?', timestamp: '10:30 AM' },
    { id: 2, userId: 'me', text: 'Hey Rina! Lagi ngoding project chat ini hehe.', timestamp: '10:31 AM' },
    { id: 3, userId: 'me', text: 'Kamu sendiri?', timestamp: '10:31 AM' },
    { id: 4, userId: 'rina', text: 'Wih keren! Aku lagi nonton film aja.', timestamp: '10:32 AM' },
    { id: 5, userId: 'rina', text: 'Nanti kalau udah jadi, kabarin ya!', timestamp: '10:32 AM' },
    { id: 6, userId: 'me', text: 'Aku ingin kamu membantu ku', timestamp: '10:34 AM' },
    { id: 7, userId: 'me', text: 'Menyelesaikan beberapa hal, agar lebih cepat selesai', timestamp: '10:35 AM' },
    { id: 8, userId: 'me', text: 'Aku telah menyelesaikan Backend nya, meski mungkin ada ada banyak perbaikan, aku sedang mengarjakan Frontend Web nya, dan setelah berinteraski dari depan, memang sepertinya akan ada perbaikan pada backend nanti', timestamp: '10:36 AM' },
    { id: 9, userId: 'me', text: 'Aku butuh Frontend Mobile, mau kah membantu ku pada hal itu?', timestamp: '10:37 AM' },
    { id: 10, userId: 'rina', text: 'Tentu, brief aku dengan seksama, agar aku bisa mempersiapkan yang diperlukan', timestamp: '10:37 AM' },
];

const currentUserId = 'me';

const MessageList = () => {
    const endOfMessagesRef = useRef(null);

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [dummyMessages]);

    return (
        <main className="flex-1 overflow-y-auto p-4 bg-gray-200 w-full">
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