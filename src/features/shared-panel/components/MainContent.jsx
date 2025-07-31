import React from 'react';
import ChatWindow from '@/features/messages/components/ChatWindow';
import ContactDetailContainer from '../../contacts/components/ContactDetailContainer';

const MAIN_CONTENT_MAP = {
    contacts: ContactDetailContainer,
    conversations: ChatWindow,
};

const MainContent = ({ activeMenu, selectedId, onBack, onShowMenu }) => {
  
    const WelcomeScreen = () => (
        <div className="w-full h-full bg-gray-50 flex items-center justify-center">
            <p>Select an item from the list to view details.</p>
        </div>
    );

    if (!selectedId) {
        return <WelcomeScreen />;
    }

    const ComponentToRender = MAIN_CONTENT_MAP[activeMenu]

    if (!ComponentToRender) {
        return <WelcomeScreen />;
    }

    return (
        <div className="flex flex-1 bg-white">
            <ComponentToRender 
                id={selectedId}
                conversationId={selectedId}
                onBack={onBack}
            />
            {/* {activeMenu === 'conversations' && <ChatWindow conversationId={selectedId} onBack={onBack}/>}
            {activeMenu === 'contacts' && <ContactDetail contactId={selectedId} />} */}
        </div>
    );
}

export default MainContent;