import React from 'react';
import ChatWindow from '@/features/conversations/components/ChatWindow';
import ContactDetailContainer from '../../contacts/components/ContactDetailContainer';
import ProfileContainer from '../../profile/components/ProfileContainer';

const MAIN_CONTENT_MAP = {
    contacts: ContactDetailContainer,
    conversations: ChatWindow,
    profile: ProfileContainer
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
        </div>
    );
}

export default MainContent;