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
    deleteMessageForAll
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
    handleDeleteMessageForAll
} from './conversationHandler';

const initialState = {
    items: [],
    currentConversation: null,
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
            if (state.currentConversation && state.currentConversation._id === newMessage.conversationId) {
                if (!state.currentConversation.messages.find(m => m._id === newMessage._id)) {
                    state.currentConversation.messages.push(newMessage);
                }
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
                // console.log(`[DEBUG SLICE] Found conversation to update at index ${indexToUpdate}. unreadCount BEFORE: ${state.items[indexToUpdate].unreadCount}`);
                state.items[indexToUpdate] = updatedConversation;
                const item = state.items.splice(indexToUpdate, 1)[0];
                state.items.unshift(item);
                
                state.totalUnreadCount = state.items.reduce((total, convo) => total + (convo.unreadCount || 0), 0);
                // console.log(`[DEBUG SLICE] unreadCount AFTER: ${state.items[0].unreadCount}. New total: ${state.totalUnreadCount}`);
            } else {
                // console.log("[DEBUG SLICE] Did not find conversation to update.");
            }
        },

        updateMessagesStatus: (state, action) => {
            const { conversationId, messageIds, status } = action.payload;
            const messageIdSet = new Set(messageIds)

            if (state.currentConversation && state.currentConversation._id === conversationId) {
                 state.currentConversation.messages = state.currentConversation.messages.map(message => {
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
                const conversationToUpdate = state.items[convoIndex];
                const countToDecrement = conversationToUpdate.unreadCount || 0;
                state.totalUnreadCount -= countToDecrement;

                state.items[convoIndex] = {
                    ...conversationToUpdate,
                    unreadCount: 0,
                    lastMessage: conversationToUpdate.lastMessage ? { ...conversationToUpdate.lastMessage, status: 'read' } : null
                };
            }
            
            if (state.currentConversation && state.currentConversation._id === conversationId) {
                state.currentConversation.messages = state.currentConversation.messages.map(message => 
                    message.status !== 'read' ? { ...message, status: 'read' } : message
                );
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
    }
});

export const { 
    clearCurrentConversation, 
    receiveNewMessage, 
    updateConversationInList, 
    addNewConversationToList,
    updateMessagesStatus,
    updateAllMessagesToRead
} = conversationSlice.actions;

export default conversationSlice.reducer;