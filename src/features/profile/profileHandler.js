export const handleFetchProfile = (builder, { fetchProfile }) => {
    builder
        .addCase(fetchProfile.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(fetchProfile.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = false
        })
        .addCase(fetchProfile.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload || 'Fetch profile failed.'
        })
}

export const handleEditProfile = (builder, { editProfile }) => {
    builder
        .addCase(editProfile.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(editProfile.fulfilled, (state, action) => {
            state.loading = false
            const updatedProfile = action.payload

            state.data = updatedProfile
        })
        .addCase(editProfile.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload || 'Update profile failed.'
        })
}