import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, headerActions }) => {
    if (!isOpen) {
        return null;
    }

    const handleContentClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div 
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        >
            <div
                onClick={handleContentClick}
                className="bg-white rounded-lg shadow-xl w-full max-w-md flex flex-col"
            >
                <div className="flex items-center justify-start p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800 flex-grow">{title}</h2>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                        {headerActions}
                        <button 
                            onClick={onClose} 
                            className="text-gray-400 hover:text-gray-600 p-1 rounded-full"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;