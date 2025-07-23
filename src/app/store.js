import { configureStore } from '@reduxjs/toolkit'
import { injectStore } from '../services/axiosInstance'
import authReducer from '@/features/auth/authSlice'

const store = configureStore({
    reducer: {
        auth: authReducer
    }
})

injectStore(store)

export default store