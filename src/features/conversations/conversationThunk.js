import { createAsyncThunk } from '@reduxjs/toolkit';
import * as conversationApi from './conversationApi';
import axiosInstance from '@/services/axiosInstance'

export const fetchConversations = createAsyncThunk(
    'conversations/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const [conversationsResponse, onlineContactsResponse] = await Promise.all([
                conversationApi.getConversations(),
                axiosInstance.get('/users/online-contacts')
            ])

            const conversations = conversationsResponse
            const onlineContactIds = new Set(onlineContactsResponse.data)

            const conversationsWithOnlineStatus = conversations.map(convo => {
                if(convo.partner?._id && onlineContactIds.has(convo.partner._id)){
                    return {...convo, partner: { ...convo.partner, isOnline: true}}
                }

                return convo
            })

            console.log(conversationsWithOnlineStatus, "cek list converations from thunk");
            
       
            return conversationsWithOnlineStatus;
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

export const sendMessage = createAsyncThunk(
    'conversations/sendMessage',
    async ({ conversationId, messageData }, { rejectWithValue }) => {
        try {
            const response = await conversationApi.sendMessage({ conversationId, messageData });
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