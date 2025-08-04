import { configureStore } from '@reduxjs/toolkit'
import { injectStore } from '../services/axiosInstance'
import authReducer from '@/features/auth/authSlice'
import contactReducer from '@/features/contacts/contactSlice'
import profileReducer  from '@/features/profile/profileSlice'
import conversationReducer from '@/features/conversations/conversationSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        contacts: contactReducer,
        profile: profileReducer,
        conversations: conversationReducer
    }
})

injectStore(store)

export default store