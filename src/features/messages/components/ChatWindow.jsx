import React from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

function ChatWindow({ conversationId }) {
    if (!conversationId) {
        return (
            <div className="w-2/3 bg-gray-50 flex items-center justify-center">
                <p>Select a chat to start messaging</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-2/3 bg-gray-50">
            <ChatHeader />
            <MessageList />
            <MessageInput />
        </div>
    );
}
export default ChatWindow;