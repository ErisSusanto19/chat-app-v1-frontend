import axiosInstance from '@/services/axiosInstance'

export const createContact = async (data) => {
    const response = await axiosInstance.post('/contacts', data)
    return response.data
}

export const getContacts = async ({ page = 1, search = '' }) => {
    const response = await axiosInstance.get('/contacts', {
        params: {
            page,
            search
        }
    })
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

export const getAllContactsForSelect = async (searchQuery = '') => {
    const response = await axiosInstance.get('/contacts/select-options', {
        params: {
            search: searchQuery
        }
    })
    return response.data
}