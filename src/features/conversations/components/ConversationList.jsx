import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConversations } from '../conversationThunk';
import ConversationItem from './ConversationItem';

const ConversationList = ({ onConversationSelect, selectedId }) => {
    const dispatch = useDispatch();
    const { items: conversations, loading } = useSelector(state => state.conversations);

    useEffect(() => {
        if (conversations.length === 0) {
            dispatch(fetchConversations());
        }
    }, [dispatch, conversations.length]);

    if (loading && conversations.length === 0) return <div>Loading conversations...</div>;

    return (
        <div className="flex-1 overflow-y-auto">
            {conversations.map(convo => (
                <ConversationItem
                    key={convo._id}
                    conversation={convo}
                    onSelect={() => onConversationSelect(convo.conversationId)}
                    isSelected={convo.conversationId === selectedId}
                />
            ))}
        </div>
    );
};

export default ConversationList;