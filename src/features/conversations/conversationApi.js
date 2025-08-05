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

export const editMessage = async ({ conversationId, messageId, data }) => {
    const response = await axiosInstance.put(`/conversations/${conversationId}/messages/${messageId}`, data);
    return response.data;
};

export const deleteMessageForMe = async ({ conversationId, messageId }) => {
    const response = await axiosInstance.patch(`/conversations/${conversationId}/messages/${messageId}/delete-for-me`);
    return response.data;
};

export const deleteMessageForAll = async ({ conversationId, messageId }) => {
    const response = await axiosInstance.patch(`/conversations/${conversationId}/messages/${messageId}/delete-for-all`);
    return response.data;
};