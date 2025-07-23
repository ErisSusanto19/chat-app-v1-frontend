import React from 'react';
import ConversationList from './ConversationList';
import SidebarHeader from './SidebarHeader';
import SearchBar from '@/shared/ui/SearchBar';

function Sidebar() {
    return (
        <div className="flex flex-col w-1/3 bg-gray-100 border-r border-gray-200">
            <SidebarHeader />
            <SearchBar placeholder="Search or start new chat" />
            <ConversationList />
        </div>
    );
}
export default Sidebar;