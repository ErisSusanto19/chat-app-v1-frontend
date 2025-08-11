import React, { useEffect, useMemo, useState } from 'react';
import IconSidebar from '../features/navigation/components/IconSidebar';
import ListPanel from '../features/shared-panel/components/ListPanel';
import MainContent from '../features/shared-panel/components/MainContent';
import ContactFormModal from '../features/contacts/components/ContactFormModal';
import ProfileModal from '../features/profile/components/ProfileModal';
import NewConversationModal from '../features/conversations/components/NewConversationModal';
import { SquarePen, ListFilter, UserPlus } from 'lucide-react';
import useDebounce from '@/hooks/useDebounce';
import { socket } from '../lib/socket';
import { useDispatch, useSelector } from 'react-redux';
import { 
    receiveNewMessage, 
    updateConversationInList, 
    addNewConversationToList,
    updateMessagesStatus,
    updateAllMessagesToRead
} from '../features/conversations/conversationSlice';

const MENU_CONFIG = {
    conversations: {
        title: 'Chats',
        searchPlaceholder: "Search or start new chat",
        actions: ['newChat', 'filterChats'],
    },
    contacts: {
        title: 'Contacts',
        searchPlaceholder: "Search contacts by name or email",
        actions: ['addContact'],
    },
};

const HomePage = () => {
    const dispatch = useDispatch()
    const { user, isAuthenticated } = useSelector(state => state.auth)

    useEffect(() => {
        if (!isAuthenticated || !user) {
            return;
        }

        socket.auth = { userId: user._id, userName: user.name };
        socket.connect();

        const handleConnect = () => {
            console.log('Socket Terhubung! ID:', socket.id);
        };

        const handleDisconnect = () => {
            console.log('Socket Terputus!');
        };

        const handleReceiveMessage = (newMessage) => {
            dispatch(receiveNewMessage(newMessage));
        };

        const handleConversationUpdate = (updateData) => {
            console.log("HomePage received a conversation update:", updateData);
            dispatch(updateConversationInList(updateData));
        };
        
        const handleNewConversation = (newConversationData) => {
            console.log("Received a new conversation!", newConversationData);
            dispatch(addNewConversationToList(newConversationData));
        };

        const handleMessagesDelivered = ({ updates }) => {
            console.log("Payload 'messages_delivered' diterima:", updates);
            if (updates) {
                for (const conversationId in updates) {
                    const messageIds = updates[conversationId];
                    if (messageIds && messageIds.length > 0) {
                        dispatch(updateMessagesStatus({
                            conversationId,
                            messageIds,
                            status: 'delivered'
                        }));
                    }
                }
            }
        };

        const handleMessagesRead = ({ conversationId }) => {
            dispatch(updateAllMessagesToRead({ conversationId }));
        };

        socket.on('connect', handleConnect);
        socket.on('disconnect', handleDisconnect);
        socket.on('receive_message', handleReceiveMessage);
        socket.on('conversation_updated', handleConversationUpdate);
        socket.on('new_conversation_received', handleNewConversation);
        socket.on('messages_delivered', handleMessagesDelivered);
        socket.on('messages_read', handleMessagesRead);
        
        return () => {
            socket.off('connect', handleConnect);
            socket.off('disconnect', handleDisconnect);
            socket.off('receive_message', handleReceiveMessage);
            socket.off('conversation_updated', handleConversationUpdate);
            socket.off('new_conversation_received', handleNewConversation);
            socket.off('messages_delivered', handleMessagesDelivered);
            socket.off('messages_read', handleMessagesRead);
            
            socket.disconnect();
        };
        
    }, [isAuthenticated, user, dispatch]);

    const [isExpanded, setIsExpanded] = useState(false);
    const [activeMenu, setActiveMenu] = useState('conversations');
    const [selectedId, setSelectedId] = useState(null);
    const [isMobileMode, setIsMobileMode] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    
    const [activeModal, setActiveModal] = useState(null);
    const closeModal = () => setActiveModal(null);

    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const handleToggleSidebar = () => setIsExpanded(prev => !prev);
    const handleToggleMobileMode = () => setIsMobileMode(prev => !prev);

    const handleContactAddedSuccess = () => {
        setSearchTerm('');
    };

    const handleConversationCreated = (newConversationId) => {
        setActiveMenu('conversations');
        setSelectedId(newConversationId);
        closeModal();
    };

    const headerActions = useMemo(() => {
        const config = MENU_CONFIG[activeMenu];
        if (!config || !config.actions) return null;

        return (
            <>
                {config.actions.includes('newChat') && (
                    <button onClick={() => setActiveModal('newConversation')} className="p-1 ..." title="New Chat">
                        <SquarePen size={20} />
                    </button>
                )}
                {config.actions.includes('filterChats') && (
                    <button className="p-1 text-gray-500 hover:text-gray-800" title="Filter Chats">
                        <ListFilter size={20} />
                    </button>
                )}
                {config.actions.includes('addContact') && (
                    <button onClick={() => setActiveModal('addContact')} className="p-1 text-gray-500 hover:text-gray-800" title="Add Contact">
                        <UserPlus size={20} />
                    </button>
                )}
            </>
        );
    }, [activeMenu]);

    const currentConfig = MENU_CONFIG[activeMenu];

    return (
        <div className="relative flex h-screen w-screen overflow-hidden bg-white">
            <div className={`${isMobileMode ? 'block' : 'hidden'} md:block`}>
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
                    onProfileClick={() => setIsProfileModalOpen(true)}
                />
            </div>
            {isMobileMode && (
                <div
                    onClick={handleToggleMobileMode}
                    className='fixed inset-0 bg-black/30 z-40 md:hidden'
                ></div>
            )}
            <main className={`flex flex-1 transition-all duration-300 ease-in-out md:w-auto ${isExpanded ? 'md:pl-16' : 'md:pl-20'}`}>
                <div className={`w-full flex-shrink-0 md:w-[360px] md:block ${selectedId ? 'hidden' : 'block'}`}>
                    {currentConfig && (
                        <ListPanel 
                            activeMenu={activeMenu} 
                            onItemSelected={(type, id) => setSelectedId(id)}
                            selectedId={selectedId}
                            onShowMenu={handleToggleMobileMode}
                            title={currentConfig.title}
                            headerAction={headerActions}
                            searchPlaceholder={currentConfig.searchPlaceholder}
                            searchTerm={searchTerm}
                            onSearchChange={setSearchTerm}
                            debouncedSearchTerm={debouncedSearchTerm}
                        />
                    )}
                </div>
                <div className={`w-full md:flex-1 md:block ${selectedId ? 'block' : 'hidden'}`}>
                    <MainContent
                        activeMenu={activeMenu}
                        selectedId={selectedId}
                        onBack={() => setSelectedId(null)}
                        onShowMenu={handleToggleMobileMode}
                    />
                </div>
            </main>

            {activeModal === 'addContact' && (
                <ContactFormModal 
                    isOpen={true}
                    onClose={closeModal} 
                    onSuccess={handleContactAddedSuccess}
                />
            )}

            {activeModal === 'newConversation' && (
                <NewConversationModal 
                    isOpen={true}
                    onClose={closeModal}
                    onConversationCreated={handleConversationCreated}
                />
            )}

            {isProfileModalOpen && (
                <ProfileModal 
                    isOpen={isProfileModalOpen} 
                    onClose={() => setIsProfileModalOpen(false)} 
                />
            )}
        </div>
    );
};

export default HomePage;