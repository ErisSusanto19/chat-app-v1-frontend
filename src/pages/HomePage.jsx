import React, { useState } from 'react';
import IconSidebar from '../features/navigation/components/IconSidebar';
import ListPanel from '../features/shared-panel/components/ListPanel';
import MainContent from '../features/shared-panel/components/MainContent';
import {SquarePen, ListFilter, UserPlus} from 'lucide-react'

const MENU_CONFIG = {
    conversations: {
        title: 'Chats',
        searchPlaceholder: "Search or start new chat",
        headerActions: (
            <>
                <button className="p-1 text-gray-500 hover:text-gray-800" title="New Chat">
                    <SquarePen size={20} />
                </button>
                <button className="p-1 text-gray-500 hover:text-gray-800" title="Filter Chats">
                    <ListFilter size={20} />
                </button>
            </>
        ),
    },
    contacts: {
        title: 'Contacts',
        searchPlaceholder: "Search contacts by name or email",
        headerActions: (
            <button className="p-1 text-gray-500 hover:text-gray-800" title="Add Contact">
                <UserPlus size={20} />
            </button>
        ),
    },
    settings: {
        title: 'Settings',
        headerActions: null,
    },
    
};

const HomePage = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeMenu, setActiveMenu] = useState('conversations');
    const [selectedId, setSelectedId] = useState(null);

    const [isMobileMode, setIsMobileMode] = useState(false)

    const handleToggleSidebar = () => {
        setIsExpanded(prev => !prev);
    };

    const handleToggleMobileMode = () => {
        setIsMobileMode(prev => !prev);
    };

    const currentConfig = MENU_CONFIG[activeMenu];

    return (
        <div className="relative flex h-screen w-screen overflow-hidden bg-white">
            <div className={`${isMobileMode? 'block' : 'hidden'} md:block`}>
                <IconSidebar 
                    activeMenu={activeMenu} 
                    isExpanded={isExpanded}
                    onToggle={handleToggleSidebar}
                    onCloseMobile={handleToggleMobileMode}
                    onMenuSelect={(menu) => {
                        setActiveMenu(menu);
                        setSelectedId(null);
                        setIsMobileMode(false);
                    }}
                />
            </div>
            {isMobileMode && (
                <div
                    onClick={handleToggleMobileMode}
                    className='fixed inset-0 bg:black/30 z-40 md:hidden'
                >

                </div>
            )}
            <main className={`flex flex-1 transition-all duration-300 ease-in-out md:w-auto ${isExpanded? 'md:pl-16' : 'md:pl-20'}`}>
                <div className={`w-full flex-shrink-0 md:w-[360px] md:block ${selectedId? 'hidden' : 'block'}`}>
                    {currentConfig && (
                        <ListPanel 
                            activeMenu={activeMenu} 
                            onItemSelected={(type, id) => setSelectedId(id)}
                            onShowMenu={handleToggleMobileMode}
                            title={currentConfig.title}
                            headerAction={currentConfig.headerActions}
                            searchPlaceholder={currentConfig.searchPlaceholder}
                        />
                    )}
                </div>
                <div className={`w-full md:flex-1 md:block ${selectedId? 'block' : 'hidden'}`}>
                    <MainContent
                        activeMenu={activeMenu}
                        selectedId={selectedId}
                        onBack={() => setSelectedId(null)}
                        onShowMenu={handleToggleMobileMode}
                    />
                </div>

            </main>
        </div>
    );
}

export default HomePage;