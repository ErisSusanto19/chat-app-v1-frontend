import React from 'react';
import { Menu, MessageSquareText, Users, Settings } from 'lucide-react';

function IconSidebar({ activeMenu, onMenuSelect, isExpanded, onToggle }) {
    const menuItems = [
        { id: 'conversations', text: 'Percakapan', icon: <MessageSquareText size={24} />, notificationCount: 93 },
        { id: 'contacts', text: 'Kontak', icon: <Users size={24} />, notificationCount: 0 },
        { id: 'settings', text: 'Pengaturan', icon: <Settings size={24} />, notificationCount: 1 },
    ];
    
    const iconContainerWidth = "w-16"; 

    return (
        <div
            className={`
                absolute top-0 left-0 h-full bg-gray-50/80 backdrop-blur-sm border-r border-gray-200
                flex flex-col z-50 transition-all duration-300 ease-in-out
                ${isExpanded ? 'w-64' : 'w-20'}
            `}
        >
            <div className="flex h-16 items-center border-b border-gray-200 flex-shrink-0 px-2 py-2">
                <div 
                    onClick={onToggle}
                    className="flex w-full h-full items-center cursor-pointer group rounded-lg text-gray-500 hover:bg-gray-200 hover:text-gray-700"
                >
                    <div className={`flex justify-center items-center h-full ${iconContainerWidth} flex-shrink-0`}>
                        <Menu size={24} />
                    </div>
                    {isExpanded && <span className="ml-1 text-sm font-semibold whitespace-nowrap">Menu</span>}
                </div>
            </div>

            <nav className="flex flex-col space-y-1 w-full p-2">
                {menuItems.map(item => {
                    const isActive = activeMenu === item.id;
                    const activeClasses = 'bg-amber-100 text-amber-700 font-semibold';
                    const inactiveClasses = 'text-gray-500 hover:bg-gray-200 hover:text-gray-700';

                    return (
                        <div 
                            key={item.id} 
                            onClick={() => onMenuSelect(item.id)} 
                            className={`flex items-center cursor-pointer rounded-lg h-12 transition-colors duration-200
                                       ${isActive ? activeClasses : inactiveClasses}`}
                        >
                            <div className={`w-1 h-8 rounded-r-full transition-colors ${isActive ? 'bg-amber-500' : 'bg-transparent'}`}></div>

                            <div className={`relative flex justify-center items-center ${iconContainerWidth} h-full flex-shrink-0`}>
                                {item.icon}
                                {item.notificationCount > 0 && (
                                    <div className="absolute top-3 right-3 flex items-center justify-center 
                                                   bg-green-500 text-white text-[10px] font-bold 
                                                   rounded-full min-w-[20px] h-5 px-1">
                                        {item.notificationCount}
                                    </div>
                                )}
                            </div>

                            {isExpanded && (
                                <span className="ml-1 text-sm whitespace-nowrap">
                                    {item.text}
                                </span>
                            )}
                        </div>
                    );
                })}
            </nav>
        </div>
    );
}

export default IconSidebar;