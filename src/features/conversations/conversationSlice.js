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
                state.currentConversation.messages.push(newMessage);
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

export const { clearCurrentConversation, receiveNewMessage, updateConversationInList, addNewConversationToList } = conversationSlice.actions;

export default conversationSlice.reducer;