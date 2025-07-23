import React from 'react';
import Avatar from '@/shared/ui/Avatar';

function ConversationItem({ data }) {
    // const handleClick = () => { dispatch(setActiveConversation(data.id)) };
    return (
        <div /*onClick={handleClick}*/ className="flex items-center p-3 hover:bg-gray-200 cursor-pointer">
            <Avatar src={data.contactAvatar} />
            <div className="ml-4 flex-1 border-b border-gray-200 pb-3">
                <div className="flex justify-between">
                    <p className="font-semibold">{data.contactName}</p>
                    <p className="text-xs text-gray-500">{data.timestamp}</p>
                </div>
                <p className="text-sm text-gray-600 truncate">{data.lastMessage}</p>
            </div>
        </div>
    );
}
export default ConversationItem;