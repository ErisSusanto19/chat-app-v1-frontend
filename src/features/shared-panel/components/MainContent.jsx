import React from 'react';
import ChatWindow from '@/features/messages/components/ChatWindow';
import ContactDetail from '@/features/contacts/components/ContactDetail'; 

const MainContent = ({ activeMenu, selectedId, onBack, onShowMenu }) => {
  
    const WelcomeScreen = () => (
        <div className="w-full h-full bg-gray-50 flex items-center justify-center">
            <p>Select an item from the list to view details.</p>
        </div>
    );

    if (!selectedId) {
        return <WelcomeScreen />;
    }

    return (
        <div className="flex flex-1 bg-white">
            {activeMenu === 'conversations' && <ChatWindow conversationId={selectedId} onBack={onBack}/>}
            {activeMenu === 'contacts' && <ContactDetail contactId={selectedId} />}
        </div>
    );
}

export default MainContent;