import React from 'react';
import SearchBar from '@/shared/ui/SearchBar';
import ConversationList from '@/features/conversations/components/ConversationList';
import ContactList from '@/features/contacts/components/ContactList'; 
import { SquarePen, ListFilter } from 'lucide-react';

function ListPanel({ activeMenu, onItemSelected }) {
    return (
        <div className="flex flex-col w-[360px] bg-white border-r border-gray-200 flex-shrink-0">
            <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 flex-shrink-0">
                <h1 className="text-xl font-bold text-gray-900">Chats</h1>
                <div className="flex items-center space-x-3">
                    <button className="p-1 text-gray-500 hover:text-gray-800">
                        <SquarePen size={20} />
                    </button>
                    <button className="p-1 text-gray-500 hover:text-gray-800">
                        <ListFilter size={20} />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                <div className="p-4 border-b border-gray-200">
                    <SearchBar placeholder="Search or start new chat" />
                </div>

                {activeMenu === 'conversations' && (
                    <ConversationList onConversationSelect={(id) => onItemSelected('conversation', id)} />
                )}
                {activeMenu === 'contacts' && (
                    <ContactList onContactSelect={(id) => onItemSelected('contact', id)} />
                )}
            </div>
        </div>
    );
}

export default ListPanel;