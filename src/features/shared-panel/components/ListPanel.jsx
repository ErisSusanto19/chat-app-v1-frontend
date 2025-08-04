import React from 'react';
import SearchBar from '@/shared/ui/SearchBar';
import ConversationList from '@/features/conversations/components/ConversationList';
import ContactList from '@/features/contacts/components/ContactList'; 
import { Menu } from 'lucide-react';

const ListPanel = ({ 
    activeMenu, 
    onItemSelected, 
    onShowMenu, 
    title, 
    headerAction, 
    searchPlaceholder, 
    selectedId,
    searchTerm,
    onSearchChange,
    debouncedSearchTerm
}) => {

    return (
        <div className="flex flex-col h-full bg-white border-r border-gray-200">
            <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 flex-shrink-0">
                <button onClick={onShowMenu} className='p-2 ml-2 text-gray-500 md:hidden'>
                    <Menu size={24}/>
                </button>
                <h1 className="text-xl font-bold text-gray-900">{title}</h1>
                <div className="flex items-center space-x-3">
                    {headerAction}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                <div className="p-4 border-b border-gray-200">
                    <SearchBar 
                        placeholder={searchPlaceholder}
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>

                {activeMenu === 'conversations' && (
                    <ConversationList  
                        onConversationSelect={(id) => onItemSelected('conversation', id)}
                        selectedId={selectedId}
                    />
                )}
                {activeMenu === 'contacts' && (
                    <ContactList 
                        onContactSelect={(id) => onItemSelected('contact', id)} 
                        selectedId={selectedId}
                        searchTerm={debouncedSearchTerm}
                    />
                )}
            </div>
        </div>
    );
};

export default ListPanel;