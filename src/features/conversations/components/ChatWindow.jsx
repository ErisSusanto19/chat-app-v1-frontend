import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCurrentConversation, receiveNewMessage } from '../conversationSlice';
import { fetchConversationById, fetchMessages } from '../conversationThunk'
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import PageLoader from '@/shared/ui/PageLoader';
import { socket } from '@/lib/socket';

const ChatWindow = ({ conversationId, onBack }) => {
    const dispatch = useDispatch();
    const { currentConversation, loading } = useSelector(state => state.conversations);
    const { user: currentUser } = useSelector(state => state.auth);
    const messages = useSelector(state => state.conversations.messages[conversationId] || [])

    const [typingUsers, setTypingUsers] = useState([]);
    const [editingMessageId, setEditingMessageId] = useState(null);

    useEffect(() => {
        if (conversationId) {
            dispatch(fetchConversationById(conversationId));
            dispatch(fetchMessages({ conversationId }));
        }

        return () => {
            dispatch(clearCurrentConversation());
        };
    }, [conversationId, dispatch]);

    useEffect(() => {
        if (conversationId) {
            console.log(`[EMITTING] Trying to join room: ${conversationId}`);
            socket.emit('join_conversation', conversationId);

            return () => {
                socket.emit('leave_conversation', conversationId);
            };
        }
    }, [conversationId]);

    useEffect(() => {
        if (currentConversation && currentUser) {
            const hasUnreadMessages = messages.some(
                msg => msg.status !== 'read' && msg.senderId !== currentUser._id
            );

            if (hasUnreadMessages) {
                socket.emit('mark_messages_as_read', { conversationId });
            }
        }
    }, [currentConversation, currentUser, conversationId]);

     useEffect(() => {
        const handleUserIsTyping = ({ conversationId: incomingConvId, user }) => {
            if (conversationId === incomingConvId) {
                setTypingUsers(prev => prev.find(u => u.id === user.id) ? prev : [...prev, user]);
            }
        };

        const handleUserStoppedTyping = ({ conversationId: incomingConvId, user }) => {
            if (conversationId === incomingConvId) {
                setTypingUsers(prev => prev.filter(u => u.id !== user.id));
            }
        };

        socket.on('user_is_typing', handleUserIsTyping);
        socket.on('user_stopped_typing', handleUserStoppedTyping);

        return () => {
            socket.off('user_is_typing', handleUserIsTyping);
            socket.off('user_stopped_typing', handleUserStoppedTyping);
        };
    }, [conversationId]);

    if (loading || !currentConversation) {
        return <PageLoader message="Loading conversation..." />;
    }

    return (
        <div className="flex flex-col w-full bg-gray-50 h-screen">
            <ChatHeader 
                onBack={onBack} 
                conversation={currentConversation}
                typingUsers={typingUsers}
            />
            <MessageList 
                messages={messages}
                editingMessageId={editingMessageId}
                setEditingMessageId={setEditingMessageId}
            />
            {!editingMessageId && (
                <MessageInput conversationId={currentConversation.conversationId} />
            )}
        </div>
    );
};
export default ChatWindow;