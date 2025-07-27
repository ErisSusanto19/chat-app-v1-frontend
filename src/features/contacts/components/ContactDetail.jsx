import React from 'react';
import Avatar from '@/shared/ui/Avatar';
import { ArrowLeft, MessageSquare, Phone, MoreVertical } from 'lucide-react';

const dummyContacts = [
    {
        "_id": "6885d0f52b7d20a4a2460244",
        "userId": "6876f7793bc5cb90ccecd8ad",
        "name": "Old man",
        "email": "raiden@mail.com",
        "status": "Registered",
        "detail": {
            "_id": "67b033af573431b6adb960f8",
            "name": "Lord Raiden",
            "email": "raiden@mail.com",
            "image": 'https://i.pravatar.cc/150?u=raiden'
        }
    },
    {
        "_id": "6885d248ca3ed4cc24f7bbbe",
        "userId": "6876f7793bc5cb90ccecd8ad",
        "name": "Blind Guy",
        "email": "kenshi@mail.com",
        "status": "Registered",
        "detail": {
            "_id": "67e650649b29dccaf9326cec",
            "name": "Kenshi",
            "email": "kenshi@mail.com",
            "image": null
        }
    }
];

const ContactDetail = ({ contactId, onBack }) => {
  console.log(contactId, '<<< cek from contact detail');
  
    const contact = dummyContacts.find(c => c._id === contactId);

    if (!contact) {
        return (
            <div className="flex h-full items-center justify-center text-gray-500">
                <p>Select a contact to see the details.</p>
            </div>
        );
    }
    
    const displayName = contact.detail?.name || contact.name;
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
                <button className="p-2 rounded-full hover:bg-gray-200">
                    <MoreVertical size={20} />
                </button>
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
                            <p className="text-sm text-gray-500">Nickname</p>
                            <p className="text-md text-gray-800">{contact.name}</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ContactDetail;