import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { injectStore } from '../services/axiosInstance'
import authReducer from '@/features/auth/authSlice'
import contactReducer from '@/features/contacts/contactSlice'
import profileReducer  from '@/features/profile/profileSlice'
import conversationReducer from '@/features/conversations/conversationSlice'

const appReducer = combineReducers({
    auth: authReducer,
    contacts: contactReducer,
    profile: profileReducer,
    conversations: conversationReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'auth/resetState') {
    state = undefined;
  }

  return appReducer(state, action);
};

const store = configureStore({
    reducer: rootReducer
})

injectStore(store)

export default store