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

        updateConversationInList: (state, action) => {
            const { conversationId, lastMessage } = action.payload;

            const indexToUpdate = state.items.findIndex(
                item => item.conversationId.toString() === conversationId.toString()
            );

            if (indexToUpdate !== -1) {
                const itemToUpdate = state.items[indexToUpdate];
                const updatedItem = {
                    ...itemToUpdate,
                    lastMessage: lastMessage
                };
                
                const newItems = state.items.filter(
                    item => item.conversationId.toString() !== conversationId.toString()
                );
                newItems.unshift(updatedItem);
                
                state.items = newItems;
            }
        },

        addNewConversationToList: (state, action) => {
            const newConversation = action.payload;
            const exists = state.items.some(item => item.conversationId === newConversation.conversationId);
            if (!exists) {
                state.items.unshift(newConversation);
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
                if (conversationToUpdate.lastMessage && messageIdSet.has(conversationToUpdate.lastMessage.message_id)) {
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
            const messageIdSet = new Set();

            if (state.currentConversation && state.currentConversation._id === conversationId) {
                state.currentConversation.messages = state.currentConversation.messages.map(message => {
                    if (message.status !== 'read') {
                        messageIdSet.add(message._id);
                        return { ...message, status: 'read' };
                    }
                    return message;
                });
            }

            const convoIndex = state.items.findIndex(c => c.conversationId === conversationId);
            if (convoIndex !== -1 && state.items[convoIndex].lastMessage) {
                 state.items[convoIndex] = {
                    ...state.items[convoIndex],
                    lastMessage: {
                        ...state.items[convoIndex].lastMessage,
                        status: 'read'
                    }
                };
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