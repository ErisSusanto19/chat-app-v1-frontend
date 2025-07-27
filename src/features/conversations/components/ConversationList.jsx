import React from 'react';
import ConversationItem from './ConversationItem';

const ConversationList = () => {
    // const { conversations } = useSelector(state => state.conversations);
    const conversations = [/* data dummy */]; // Ganti dengan data dari Redux/API

    return (
        <div className="flex-1 overflow-y-auto">
            {conversations.map(convo => (
                <ConversationItem key={convo.id} data={convo} />
            ))}
        </div>
    );
}
export default ConversationList;