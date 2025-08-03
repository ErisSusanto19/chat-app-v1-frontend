import { createAsyncThunk } from '@reduxjs/toolkit';
import * as conversationApi from './conversationApi';

export const fetchConversations = createAsyncThunk(
    'conversations/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await conversationApi.getConversations();
            return response;
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