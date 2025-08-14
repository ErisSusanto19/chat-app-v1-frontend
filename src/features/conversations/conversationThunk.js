import { createAsyncThunk } from '@reduxjs/toolkit';
import * as conversationApi from './conversationApi';

export const fetchConversations = createAsyncThunk(
    'conversations/fetchAll',
    async (searchQuery = '', { rejectWithValue }) => {
        try {
            
            const conversations = await conversationApi.getConversations(searchQuery)
            console.log(`[FETCH-CONVERSATION]: `, conversations)
            return conversations;

        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return rejectWithValue(message);
        }
    }
);

export const fetchConversationById = createAsyncThunk(
    'conversations/fetchById',
    async (conversationId, { rejectWithValue }) => {
        try {
            const response = await conversationApi.getConversationById(conversationId);
            return response;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return rejectWithValue(message);
        }
    }
);

export const addConversation = createAsyncThunk(
    'conversations/add',
    async (data, { rejectWithValue }) => {
        try {
            const response = await conversationApi.createConversation(data);
            console.log(`[ADD-CONVERSATION]: `, response);
            
            return response;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return rejectWithValue(message);
        }
    }
);

export const updateConversation = createAsyncThunk(
    'conversations/update',
    async ({ conversationId, data }, { rejectWithValue }) => {
        try {
            const response = await conversationApi.updateConversation({ conversationId, data });
            return response;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return rejectWithValue(message);
        }
    }
);

export const deleteConversation = createAsyncThunk(
    'conversations/delete',
    async (conversationId, { rejectWithValue }) => {
        try {
            const response = await conversationApi.deleteConversation(conversationId);
            return { ...response, _id: conversationId };
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return rejectWithValue(message);
        }
    }
);

export const addParticipantsToGroup = createAsyncThunk(
    'conversations/addParticipants',
    async ({ conversationId, data }, { rejectWithValue }) => {
        try {
            const response = await conversationApi.addParticipants({ conversationId, data });
            return response;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return rejectWithValue(message);
        }
    }
);

export const sendMessage = createAsyncThunk(
    'conversations/sendMessage',
    async ({ conversationId, messageData }, { rejectWithValue }) => {
        try {
            const response = await conversationApi.sendMessage({ conversationId, messageData });
            console.log(`[ADD-MESSAGE]: `, response);
            
            return response;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return rejectWithValue(message);
        }
    }
);

export const editMessage = createAsyncThunk(
    'conversations/editMessage',
    async ({ conversationId, messageId, data }, { rejectWithValue }) => {
        try {
            const response = await conversationApi.editMessage({ conversationId, messageId, data });
            return response;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return rejectWithValue(message);
        }
    }
);

export const deleteMessageForMe = createAsyncThunk(
    'conversations/deleteMessageForMe',
    async ({ conversationId, messageId }, { rejectWithValue }) => {
        try {
            const response = await conversationApi.deleteMessageForMe({ conversationId, messageId });
            return response;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return rejectWithValue(message);
        }
    }
);

export const deleteMessageForAll = createAsyncThunk(
    'conversations/deleteMessageForAll',
    async ({ conversationId, messageId }, { rejectWithValue }) => {
        try {
            const response = await conversationApi.deleteMessageForAll({ conversationId, messageId });
            return response;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return rejectWithValue(message);
        }
    }
);

export const fetchMessages = createAsyncThunk(
    'conversations/fetchMessages',
    async ({conversationId, page = 1}, { rejectWithValue }) => {
        try {
            const response = await conversationApi.getMessages(conversationId, page)
            return {conversationId, messages: response}
        } catch (error) {
            const message = error.response?.data?.message || error.message
            return rejectWithValue(message)
        }
    }
)