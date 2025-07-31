import React, { useState, useEffect, useRef } from 'react';
import { MoreVertical } from 'lucide-react';

const DropdownMenu = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setIsOpen(prev => !prev)}
                className="p-2 rounded-full hover:bg-gray-200"
            >
                <MoreVertical size={20} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                    <div className="py-1">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};

export const DropdownMenuItem = ({ children, onClick, className = '' }) => {

    const handleClick = () => {
        if(onClick){
            onClick()
        }
    }

    return (
        <button
            onClick={handleClick}
            className={`w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3 ${className}`}
        >
            {children}
        </button>
    );
};

export default DropdownMenu;