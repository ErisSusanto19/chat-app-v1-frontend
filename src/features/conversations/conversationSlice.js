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

export const { clearCurrentConversation, receiveNewMessage } = conversationSlice.actions;

export default conversationSlice.reducer;