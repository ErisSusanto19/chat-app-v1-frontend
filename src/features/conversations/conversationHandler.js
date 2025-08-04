export const handleFetchConversations = (builder, { fetchConversations }) => {
    builder
        .addCase(fetchConversations.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchConversations.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
        })
        .addCase(fetchConversations.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
};

export const handleFetchConversationById = (builder, { fetchConversationById }) => {
    builder
        .addCase(fetchConversationById.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchConversationById.fulfilled, (state, action) => {
            state.loading = false;
            state.currentConversation = action.payload;
        })
        .addCase(fetchConversationById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
};

export const handleAddConversation = (builder, { addConversation }) => {
    builder
        .addCase(addConversation.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addConversation.fulfilled, (state, action) => {
            state.loading = false;
            // const newConversation = action.payload.data;
            
            // const existingIndex = state.items.findIndex(item => item._id === newConversation._id);
            // if (existingIndex === -1) {
            //     state.items.unshift(newConversation);
            // }
        })
        .addCase(addConversation.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
};

export const handleUpdateConversation = (builder, { updateConversation }) => {
    builder
        .addCase(updateConversation.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateConversation.fulfilled, (state, action) => {
            state.loading = false;
            const updatedConversation = action.payload.data;

            state.items = state.items.map(item =>
                item._id === updatedConversation._id ? { ...item, ...updatedConversation } : item
            );

            if (state.currentConversation && state.currentConversation._id === updatedConversation._id) {
                state.currentConversation = { ...state.currentConversation, ...updatedConversation };
            }
        })
        .addCase(updateConversation.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
};

export const handleDeleteConversation = (builder, { deleteConversation }) => {
    builder
        .addCase(deleteConversation.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteConversation.fulfilled, (state, action) => {
            state.loading = false;
            const deletedConversationId = action.payload._id;

            state.items = state.items.filter(item => item._id !== deletedConversationId);

            if (state.currentConversation && state.currentConversation._id === deletedConversationId) {
                state.currentConversation = null;
            }
        })
        .addCase(deleteConversation.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
};
