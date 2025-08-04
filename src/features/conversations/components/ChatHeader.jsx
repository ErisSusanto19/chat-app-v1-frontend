import React from 'react';
import Avatar from '@/shared/ui/Avatar';
import IconButton from '@/shared/ui/IconButton';
import { Search, EllipsisVertical, ArrowLeft } from 'lucide-react';

const ChatHeader = ({ onBack, conversation }) => {

    const displayName = conversation.name;
    const displayImage = conversation.partnerDetails?.image;

    const lastSeen = 'online';

    return (
        <header className="flex h-16 items-center w-full justify-between px-4 border-b border-gray-200 bg-gray-100">
            <div className="flex items-center gap-4">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-200 lg:hidden">
                    <ArrowLeft size={20} />
                </button>
                <Avatar 
                    src={displayImage} 
                    fallbackText={displayName?.charAt(0).toUpperCase() || '?'} 
                    isOnline={lastSeen === 'online'} 
                />
                <div className="flex flex-col">
                    <span className="font-semibold text-gray-800">{displayName}</span>
                    <span className="text-xs text-gray-500">{lastSeen}</span>
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