import React, { useState } from 'react';
import IconSidebar from '../features/navigation/components/IconSidebar';
import ListPanel from '../features/shared-panel/components/ListPanel';
import MainContent from '../features/shared-panel/components/MainContent';

function HomePage() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeMenu, setActiveMenu] = useState('conversations');
    const [selectedId, setSelectedId] = useState(null);

    const handleToggleSidebar = () => {
        setIsExpanded(prev => !prev);
    };

    return (
        <div className="relative flex h-screen w-screen overflow-hidden bg-white">
            <IconSidebar 
                activeMenu={activeMenu} 
                isExpanded={isExpanded}
                onMenuSelect={(menu) => {
                    setActiveMenu(menu);
                    setSelectedId(null);
                }}
                onToggle={handleToggleSidebar}
            />
            <div className="flex flex-1 ml-20">
                <ListPanel 
                    activeMenu={activeMenu} 
                    onItemSelected={(type, id) => setSelectedId(id)}
                />

                <MainContent
                    activeMenu={activeMenu}
                    selectedId={selectedId}
                />
            </div>
        </div>
    );
}

export default HomePage;