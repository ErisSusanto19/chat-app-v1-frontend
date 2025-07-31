import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser } from './authThunk'
import { handleRegisterUser, handleLoginUser } from './authHandler'

const accessToken = localStorage.getItem('accessToken')
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user || null,
    accessToken: accessToken || null,
    isAuthenticated: !!accessToken,
    loading: false,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetState: (state) => {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('user')

            state.user = null
            state.accessToken = null
            state.isAuthenticated = false
            state.loading = false
            state.error = null
        },
    },
    extraReducers: (builder) => {
        handleRegisterUser(builder, { registerUser })
        handleLoginUser(builder, {loginUser})
    }
})

export const { resetState } = authSlice.actions

export default authSlice.reducer