import React, { useEffect, useRef, useState } from 'react';
import MessageBubble from './MessageBubble';
import { useSelector, useDispatch } from 'react-redux';
import { deleteMessageForMe, deleteMessageForAll, editMessage } from '../conversationThunk';
import ConfirmationModal from '@/shared/ui/ConfirmationModal'

const MessageList = ({messages = [], editingMessageId, setEditingMessageId}) => {
    const dispatch = useDispatch()
    const endOfMessagesRef = useRef(null);
    const { user: currentUser } = useSelector(state => state.auth);
    const { currentConversation } = useSelector(state => state.conversations)

    const [deleteTarget, setDeleteTarget] = useState(null);

    const visibleMessages = messages.filter(
        msg => !msg.disappearFor.includes(currentUser?._id)
    );

    const handleDeleteForMe = (messageId) => {
        setDeleteTarget({ messageId, type: 'me' });
    };

    const handleDeleteForAll = (messageId) => {
        setDeleteTarget({ messageId, type: 'all' });
    };

    const handleConfirmDelete = () => {
        if (!deleteTarget) return;

        const thunkToDispatch = deleteTarget.type === 'me' 
            ? deleteMessageForMe 
            : deleteMessageForAll;

        dispatch(thunkToDispatch({ 
            conversationId: currentConversation._id, 
            messageId: deleteTarget.messageId 
        }));
        setDeleteTarget(null);
    };

    const handleSaveEdit = (messageId, newText) => {
        const originalMessage = messages.find(m => m._id === messageId);
        if (!originalMessage) return;

        const data = {
            content: { ...originalMessage.content, message: newText }
        };
        
        dispatch(editMessage({
            conversationId: currentConversation._id,
            messageId,
            data
        }));
    };

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [visibleMessages]);

     if (!visibleMessages || visibleMessages.length === 0) {
        return (
            <main className="flex-1 overflow-y-auto p-4 bg-gray-200 w-full flex items-center justify-center">
                <p className="text-gray-500">No messages yet. Start the conversation!</p>
            </main>
        );
    }

    return (
        <>
            <main className="flex-1 overflow-y-auto p-4 bg-gray-200 w-full">
                {visibleMessages.map(msg => (
                    <MessageBubble 
                        key={msg._id} 
                        message={msg}
                        isOwnMessage={msg.senderId === currentUser?._id}
                        onEdit={handleSaveEdit}
                        isEditing={msg._id === editingMessageId}
                        onStartEdit={() => setEditingMessageId(msg._id)}
                        onCancelEdit={() => setEditingMessageId(null)}
                        onDeleteForMe={handleDeleteForMe}
                        onDeleteForAll={handleDeleteForAll}
                    />
                ))}
                <div ref={endOfMessagesRef} />
            </main>

            <ConfirmationModal
                isOpen={!!deleteTarget}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleConfirmDelete}
                title="Delete Message"
                message={
                    deleteTarget?.type === 'me'
                        ? 'Delete this message for you? Other chat members will still see it.'
                        : 'Delete this message for everyone? This action cannot be undone.'
                }
            />
        </>
    );
}

export default MessageList;