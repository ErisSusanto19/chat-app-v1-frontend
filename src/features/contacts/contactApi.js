import axiosInstance from '@/services/axiosInstance'

export const createContact = async (data) => {
    const response = await axiosInstance.post('/contacts', data)
    return response.data
}

export const getContacts = async () => {
    const response = await axiosInstance.get('/contacts')
    return response.data
}

export const getContactById = async (id) => {
    const response = await axiosInstance.get(`/contacts/${id}`)
    return response.data
}

export const updateContact = async (id, data) => {
    const response = await axiosInstance.put(`/contacts/${id}`, data)
    return response.data
}

export const deleteContact = async (id) => {
    const response = await axiosInstance.delete(`/contacts/${id}`)
    return response.data
}