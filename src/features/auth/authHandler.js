export const handleRegisterUser = (builder, { registerUser }) => {
    builder
        .addCase(registerUser.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            const { access_token, ...user } = action.payload

            localStorage.setItem('accessToken', access_token)
            localStorage.setItem('user', JSON.stringify(user))

            state.user = user
            state.accessToken = access_token
            state.isAuthenticated = true
            state.loading = false
            state.loading = null
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload || 'Registration failed'
        })
}

export const handleLoginUser = (builder, { loginUser }) => {
    builder
        .addCase(loginUser.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            const { access_token, ...user } = action.payload

            localStorage.setItem('accessToken', access_token)
            localStorage.setItem('user', JSON.stringify(user))

            state.user = user
            state.accessToken = access_token
            state.isAuthenticated = true
            state.loading = false
            state.error = null
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload || 'Login failed.'
        })
}