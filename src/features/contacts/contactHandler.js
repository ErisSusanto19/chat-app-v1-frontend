export const handleAddContact = (builder, { addContact }) => {
    builder
        .addCase(addContact.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(addContact.fulfilled, (state, action) => {
            state.items.push(action.payload)
            state.loading = false
            state.error = null
        })
        .addCase(addContact.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload || 'Add contact failed.'
        })
}

export const handleFetchContacts = (builder, { fetchContacts }) => {
    builder
        .addCase(fetchContacts.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(fetchContacts.fulfilled, (state, action) => {
            state.items = action.payload
            state.loading = false
        })
        .addCase(fetchContacts.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload || 'Fetch contacts failed.'
        })
}

export const handleFetchContactById = (builder, { fetchContactById }) => {
    builder
        .addCase(fetchContactById.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(fetchContactById.fulfilled, (state, action) => {
            state.currentContact = action.payload
            state.loading = false
        })
        .addCase(fetchContactById.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload || 'Fetch contact by id failed.'
        })
}

export const handleEditContact = (builder, { editContact }) => {
    builder
        .addCase(editContact.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(editContact.fulfilled, (state, action) => {
            const index = state.items.findIndex(item => item.id === action.payload.id)
            if (index !== -1) {
                state.items[index] = action.payload
            }
            state.loading = false
        })
        .addCase(editContact.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload || 'Update contact failed.'
        })
}

export const handleRemoveContact = (builder, { removeContact }) => {
    builder
        .addCase(removeContact.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(removeContact.fulfilled, (state, action) => {
            const deletedId = action.meta.arg
            state.items = state.items.filter(item => item.id !== deletedId)
            state.loading = false
        })
        .addCase(removeContact.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload || 'Delete contact failed.'
        })
}