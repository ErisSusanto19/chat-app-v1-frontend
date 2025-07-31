import * as profile from './profileApi'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchProfile = createAsyncThunk(
    'profile/fetch',
    async (_, { rejectWithValue }) => {
        try {
            const response = await profile.getProfile()
            return response
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Fetch profile faield.'
            return rejectWithValue(errorMessage)
        }
    }
)

export const editProfile = createAsyncThunk(
    'profile/edit',
    async(data, { rejectWithValue }) => {
        try {
            const response = await profile.updateProfile(data)
            return response
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Update profile faield.'
            return rejectWithValue(errorMessage)
        }
    }
)