import React from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatWindow = ({ conversationId, onBack }) => {
    
    if (!conversationId) {
        return (
            <div className="w-full bg-gray-50 flex items-center justify-center">
                <p>Select a chat to start messaging</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full bg-gray-50 h-screen">
            <ChatHeader onBack={onBack}/>
            <MessageList />
            <MessageInput />
        </div>
    );
}
export default ChatWindow;