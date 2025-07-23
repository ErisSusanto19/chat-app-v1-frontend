import axiosInstance from '@/services/axiosInstance'

export const register = async (data) => {
    const response = await axiosInstance.post('/register', data)
    return response.data
}

export const login = async (data) => {
    const response = await axiosInstance.post('/login', data)
    return response.data
}