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
            state.loading = false

            const { contacts, totalPages, currentPage } = action.payload;
            const requestedPage = action.meta.arg?.page || 1;

            if (requestedPage === 1) {
                state.items = contacts;
            } else {
                const existingIds = new Set(state.items.map(item => item._id));
                const newUniqueContacts = contacts.filter(item => !existingIds.has(item._id));
                state.items.push(...newUniqueContacts);
            }

            state.totalPages = totalPages;
            state.currentPage = parseInt(currentPage, 10);
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
            state.loading = false
            const updatedContact = action.payload;

            const index = state.items.findIndex(item => item._id === updatedContact._id)
            if (index !== -1) {
                state.items[index] = action.payload
            }
            state.currentContact = updatedContact
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
            state.loading = false
            const deletedId = action.payload._id || action.payload;
            state.items = state.items.filter(item => item._id !== deletedId)
        })
        .addCase(removeContact.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload || 'Delete contact failed.'
        })
}