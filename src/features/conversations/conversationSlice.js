import { createSlice } from '@reduxjs/toolkit';
import { 
    fetchConversations, 
    fetchConversationById,
    addConversation,
    updateConversation,
    deleteConversation,
    sendMessage,
    editMessage,
    deleteMessageForMe,
    deleteMessageForAll,
    fetchMessages
} from './conversationThunk';
import { 
    handleFetchConversations,
    handleFetchConversationById,
    handleAddConversation,
    handleUpdateConversation,
    handleDeleteConversation,
    handleSendMessage,
    handleEditMessage,
    handleDeleteMessageForMe,
    handleDeleteMessageForAll,
    handleFetchMessages
} from './conversationHandler';

const initialState = {
    items: [],
    currentConversation: null,
    messages: {},
    totalUnreadCount: 0,
    loading: false,
    error: null,
};

const conversationSlice = createSlice({
    name: 'conversations',
    initialState,
    reducers: {
        clearCurrentConversation: (state) => {
            state.currentConversation = null;
        },

        receiveNewMessage: (state, action) => {
            const newMessage = action.payload;

            const { conversationId } = newMessage;
            if (state.messages[conversationId]) {
                state.messages[conversationId].push(newMessage);
            }
        },

        addNewConversationToList: (state, action) => {
            const newConversation = action.payload;
            const exists = state.items.some(item => item.conversationId === newConversation.conversationId);
            if (!exists) {
                state.items.unshift(newConversation);
                state.totalUnreadCount += newConversation.unreadCount || 0;
            }
        },

        updateConversationInList: (state, action) => {
            const updatedConversation = action.payload;
            const indexToUpdate = state.items.findIndex(item => item.conversationId === updatedConversation.conversationId);

            if (indexToUpdate !== -1) {
                state.items[indexToUpdate] = updatedConversation;
                const item = state.items.splice(indexToUpdate, 1)[0];
                state.items.unshift(item);
                
                state.totalUnreadCount = state.items.reduce((total, convo) => total + (convo.unreadCount || 0), 0);
            }
        },

        updateMessagesStatus: (state, action) => {
            const { conversationId, messageIds, status } = action.payload;
            const messageIdSet = new Set(messageIds)

             if (state.messages[conversationId]) {
                state.messages[conversationId] = state.messages[conversationId].map(message => {
                    if (messageIdSet.has(message._id)) {
                        return { ...message, status: status };
                    }
                    return message;
                });
            }

            const convoIndex = state.items.findIndex(c => c.conversationId === conversationId);
            if (convoIndex !== -1) {
                const conversationToUpdate = state.items[convoIndex];
                if (conversationToUpdate.lastMessage && conversationToUpdate.lastMessage.status === 'sent') {
                    state.items[convoIndex] = {
                        ...conversationToUpdate,
                        lastMessage: {
                            ...conversationToUpdate.lastMessage,
                            status: status
                        }
                    };
                }
            }
        },
        
        updateAllMessagesToRead: (state, action) => {
            const { conversationId } = action.payload;
            const convoIndex = state.items.findIndex(c => c.conversationId === conversationId);

            if (convoIndex !== -1) {
                const countToDecrement = state.items[convoIndex].unreadCount || 0;
                state.totalUnreadCount = Math.max(0, state.totalUnreadCount - countToDecrement);

                state.items[convoIndex] = {
                    ...state.items[convoIndex],
                    unreadCount: 0,

                    lastMessage: state.items[convoIndex].lastMessage 
                        ? { ...state.items[convoIndex].lastMessage, status: 'read' } 
                        : null
                };
            }
            
            if (state.messages[conversationId]) {
                state.messages[conversationId] = state.messages[conversationId].map(message => 
                    message.status !== 'read' ? { ...message, status: 'read' } : message
                );
            }
        },

        setUserOnline: (state, action) => {
            const { userId } = action.payload;
            state.items.forEach(item => {
                if (item.partner?._id === userId) {
                    item.partner.isOnline = true;
                }
            });

            if (state.currentConversation?.partner?._id === userId) {
                state.currentConversation.partner.isOnline = true;
            }
        },

        setUserOffline: (state, action) => {
            const { userId } = action.payload;
            state.items.forEach(item => {
                if (item.partner?._id === userId) {
                    item.partner.isOnline = false;
                }
            });
            if (state.currentConversation?.partner?._id === userId) {
                state.currentConversation.partner.isOnline = false;
            }
        },

        updatePartnerDetails: (state, action) => {
            const { userId, name, image } = action.payload;

            state.items = state.items.map(item => {
                if (item.partner?._id === userId) {
                    return {
                        ...item,
                        name: name,
                        image: image,
                        partner: {
                            ...item.partner,
                            name: name,
                            image: image
                        }
                    };
                }
                return item;
            });

            if (state.currentConversation?.partner?._id === userId) {
                state.currentConversation.name = name;
                state.currentConversation.image = name;
                state.currentConversation.partner.name = name;
                state.currentConversation.partner.image = image;
            }
        }
    },

    extraReducers: (builder) => {
        handleFetchConversations(builder, { fetchConversations });
        handleFetchConversationById(builder, { fetchConversationById });
        handleAddConversation(builder, { addConversation });
        handleUpdateConversation(builder, { updateConversation });
        handleDeleteConversation(builder, { deleteConversation });
        handleSendMessage(builder, { sendMessage });
        handleEditMessage(builder, { editMessage });
        handleDeleteMessageForMe(builder, { deleteMessageForMe });
        handleDeleteMessageForAll(builder, { deleteMessageForAll });
        handleFetchMessages(builder, { fetchMessages })
    }
});

export const { 
    clearCurrentConversation, 
    receiveNewMessage, 
    updateConversationInList, 
    addNewConversationToList,
    updateMessagesStatus,
    updateAllMessagesToRead,
    setUserOnline,
    setUserOffline,
    updatePartnerDetails
} = conversationSlice.actions;

export default conversationSlice.reducer;