import React from 'react';
import Avatar from '@/shared/ui/Avatar';
import IconButton from '@/shared/ui/IconButton';
import { Search, EllipsisVertical, ArrowLeft } from 'lucide-react';

const ChatHeader = ({ onBack, conversation, typingUsers }) => {

    const displayName = conversation.name;
    const displayImage = conversation.isGroup ? conversation.image : conversation.partner?.image;
    
    const isPartnerOnline = !conversation.isGroup && conversation.partner?.isOnline;

    const getTypingText = () => {
        if (typingUsers.length === 0) return conversation.isGroup ? 'Group members' : 'online';
        if (typingUsers.length === 1) return `${typingUsers[0].name} is typing...`;
        return `${typingUsers.length} people are typing...`;
    }

    const SubHeaderText = () => {
        if (typingUsers.length > 0) {
            const typingText = typingUsers.length === 1
                ? `${typingUsers[0].name} is typing...`
                : `${typingUsers.length} people are typing...`;
            return <span className="text-xs text-green-500 animate-pulse">{typingText}</span>;
        }

        if (conversation.isGroup) {
            const participantCount = conversation.participants?.length || 0;
            return <span className="text-xs text-gray-500">{`${participantCount} members`}</span>;
        } else {
            if (isPartnerOnline) {
                return <span className="text-xs text-green-500">online</span>;
            } else {
                return <span className="text-xs text-gray-500">offline</span>;
            }
        }
    };

    return (
        <header className="flex h-16 items-center w-full justify-between px-4 border-b border-gray-200 bg-gray-100">
            <div className="flex items-center gap-4">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-200 lg:hidden">
                    <ArrowLeft size={20} />
                </button>
                <Avatar 
                    src={displayImage} 
                    fallbackText={displayName?.charAt(0).toUpperCase() || '?'} 
                    isOnline={isPartnerOnline} 
                />
                <div className="flex flex-col">
                    <span className="font-semibold text-gray-800">{displayName}</span>
                    <SubHeaderText /> 
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