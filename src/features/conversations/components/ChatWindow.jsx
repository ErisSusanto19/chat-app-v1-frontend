import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCurrentConversation } from '../conversationSlice';
import { fetchConversationById } from '../conversationThunk'
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import PageLoader from '@/shared/ui/PageLoader';

const ChatWindow = ({ conversationId, onBack }) => {
    const dispatch = useDispatch();
    const { currentConversation, loading } = useSelector(state => state.conversations);

    useEffect(() => {
        if (conversationId) {
            dispatch(fetchConversationById(conversationId));
        }

        return () => {
            dispatch(clearCurrentConversation());
        };
    }, [conversationId, dispatch]);

    if (loading || !currentConversation) {
        return <PageLoader message="Loading conversation..." />;
    }

    return (
        <div className="flex flex-col w-full bg-gray-50 h-screen">
            <ChatHeader onBack={onBack} conversation={currentConversation} />
            <MessageList messages={currentConversation.messages} />
            <MessageInput conversationId={currentConversation._id}/>
        </div>
    );
};
export default ChatWindow;