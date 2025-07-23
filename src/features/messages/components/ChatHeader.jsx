import React from 'react';
import Avatar from '@/shared/ui/Avatar';
import IconButton from '@/shared/ui/IconButton';
import { Search, EllipsisVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const dummyContact = {
    name: 'Rina',
    avatarUrl: 'https://i.pravatar.cc/150?u=rina',
    lastSeen: 'online'
};

function ChatHeader() {
    // const { activeConversation } = useSelector(state => state.conversations);
    const contact = dummyContact;

    return (
        <header className="flex items-center justify-between p-3 border-b border-gray-200 bg-gray-100">
            <div className="flex items-center gap-4">
                <Avatar src={contact.avatarUrl} isOnline={contact.lastSeen === 'online'} />
                <div className="flex flex-col">
                    <span className="font-semibold text-gray-800">{contact.name}</span>
                    <span className="text-xs text-gray-500">{contact.lastSeen}</span>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <IconButton Icon={Search} title="Search in conversation" />
                <IconButton Icon={EllipsisVertical} title="More options" />
            </div>
        </header>
    );
}

export default ChatHeader;