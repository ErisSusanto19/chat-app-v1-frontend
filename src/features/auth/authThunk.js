import toast from 'react-hot-toast'
import * as auth from './authApi'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const registerUser = createAsyncThunk(
    'auth/register',
    async (data, { rejectWithValue }) => {
        try {
            const response = await auth.register(data)
            return response
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Registration failed.'
            return rejectWithValue(errorMessage)
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/login',
    async (data, { rejectWithValue }) => {
        try {
            const response = await auth.login(data)
            
            return response
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Login failed.'
            return rejectWithValue(errorMessage)
        }
    }
)

// export const handleWelcome = createAsyncThunk(
//     'auth/handleWelcome',
//     async (_, { getState, dispatch }) => {
//         const { auth } = getState();

//         if (auth.welcomeToastStatus === 'pending' && auth.user) {
//             sessionStorage.removeItem('justLoggedIn');

//             dispatch(toastShown());
            
//             toast.success(`Welcome, ${auth.user.name}!`);
//         }
//     }
// )