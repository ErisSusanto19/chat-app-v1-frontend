import React from 'react';
import Avatar from '@/shared/ui/Avatar';
import { ArrowLeft, MessageSquare, Phone, Edit, Trash2 } from 'lucide-react';
import DropdownMenu, { DropdownMenuItem } from '@/shared/ui/DropdownMenu'

const ContactDetail = ({ contact, onBack, onEdit, onDelete }) => {    

    if (!contact) {
        return (
            <div className="flex h-full items-center justify-center text-gray-500">
                <p>Contact not found.</p>
            </div>
        );
    }
    
    const displayName = contact.name || contact.detail?.name;
    const displayImage = contact.detail?.image;

    return (
        <div className="flex flex-col h-full w-full bg-white">
            <header className="flex h-16 items-center justify-between px-4 border-b border-gray-200 flex-shrink-0">
                <div className="flex items-center gap-2">
                    <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-200 md:hidden">
                        <ArrowLeft size={20} />
                    </button>
                    <h2 className="text-lg font-semibold text-gray-800">Contact Info</h2>
                </div>
                <DropdownMenu>
                    <DropdownMenuItem onClick={onEdit}>
                        <Edit size={16} />
                        <span>Edit Contact</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onDelete} className="text-red-600">
                        <Trash2 size={16} />
                        <span>Delete Contact</span>
                    </DropdownMenuItem>
                </DropdownMenu>
            </header>

            <main className="flex-1 overflow-y-auto p-6 text-center">
                <div className="flex justify-center mb-4">
                    <Avatar 
                        src={displayImage} 
                        fallbackText={displayName.charAt(0)} 
                        size="xl"
                        className="w-32 h-32 text-5xl"
                    />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">{displayName}</h1>
                <p className="text-md text-gray-500 mt-1">{contact.email}</p>

                <div className="flex justify-center gap-4 mt-6">
                    <button className="p-3 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200">
                        <MessageSquare size={22} />
                    </button>
                    <button className="p-3 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200">
                        <Phone size={22} />
                    </button>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 text-left">
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="text-md text-gray-800">{contact.email}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Status</p>
                            <p className="text-md text-gray-800">{contact.status}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Name</p>
                            <p className="text-md text-gray-800">{contact.detail?.name || '-'}</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ContactDetail;