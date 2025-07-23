import axios from "axios";

let store 

export const injectStore = (_store) => {
    store = _store
}

const baseUrl = import.meta.env.VITE_BASE_API_URL

const axiosInstance = axios.create({baseURL: baseUrl})

axiosInstance.interceptors.request.use(
    config => {
        if(store){
            const state = store.getState()

            const token = state.auth?.accessToken

            if(token){
                config.headers['Authorization'] = `Bearer ${token}`
            }
        }

        return config
    }, 
    error => {
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    response => response,
    error => Promise.reject(error)
)

export default axiosInstance