import { configureStore } from '@reduxjs/toolkit'
import { injectStore } from '../services/axiosInstance'
import authReducer from '@/features/auth/authSlice'
import contactReducer from '@/features/contacts/contactSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        contacts: contactReducer
    }
})

injectStore(store)

export default store