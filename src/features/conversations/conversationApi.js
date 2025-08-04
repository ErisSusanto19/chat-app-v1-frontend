import axiosInstance from '@/services/axiosInstance';

export const getConversations = async () => {
    const response = await axiosInstance.get('/user-conversations');
    return response.data;
};

export const getConversationById = async (conversationId) => {
    const response = await axiosInstance.get(`/conversations/${conversationId}`);
    return response.data;
};

export const createConversation = async (data) => {
    const response = await axiosInstance.post('/conversations', data);
    return response.data;
};

export const updateConversation = async ({ conversationId, data }) => {
    const response = await axiosInstance.put(`/conversations/${conversationId}`, data);
    return response.data;
};

export const deleteConversation = async (conversationId) => {
    const response = await axiosInstance.delete(`/conversations/${conversationId}`);
    return response.data;
};

export const addParticipants = async ({ conversationId, data }) => {
    const response = await axiosInstance.post(`/user-conversations/${conversationId}/participants`, data);
    return response.data;
};

export const sendMessage = async ({ conversationId, messageData }) => {
    const response = await axiosInstance.post(`/conversations/${conversationId}/messages`, messageData);
    return response.data;
};