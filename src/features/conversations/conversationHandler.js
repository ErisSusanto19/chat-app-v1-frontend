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

export const handleSendMessage = (builder, { sendMessage }) => {
    builder
        .addCase(sendMessage.pending, (state, action) => {
            // const { conversationId, messageData } = action.meta.arg;
            
            // if (state.currentConversation && state.currentConversation._id === conversationId) {
            //     const optimisticMessage = {
            //         _id: `temp_${Date.now()}`,
            //         conversationId: conversationId,
            //         senderId: messageData.senderId,
            //         content: messageData.content,
            //         status: 'sending',
            //         createdAt: new Date().toISOString(),
            //         isOptimistic: true
            //     };
                
            //     state.currentConversation.messages.push(optimisticMessage);
            // }
        })
        .addCase(sendMessage.fulfilled, (state, action) => {
            const finalMessage = action.payload;

            // if (state.currentConversation) {
            //     const optimisticMessageIndex = state.currentConversation.messages.findIndex(
            //         msg => msg.isOptimistic === true
            //     );
                
            //     if (optimisticMessageIndex !== -1) {
            //         state.currentConversation.messages[optimisticMessageIndex] = finalMessage;
            //     } else {
            //         state.currentConversation.messages.push(finalMessage);
            //     }
            // }

            const conversationIndex = state.items.findIndex(item => item.conversationId === finalMessage.conversationId);
            if (conversationIndex !== -1) {
                const newItems = [...state.items];

                const conversationToUpdate = newItems[conversationIndex];

                const updatedConversationItem = {
                    ...conversationToUpdate,

                    lastMessage: {
                        _id: finalMessage._id,
                        content: finalMessage.content,
                        senderId: finalMessage.senderId,
                        createdAt: finalMessage.createdAt,
                        status: finalMessage.status
                    }
                };

                newItems.splice(conversationIndex, 1);

                newItems.unshift(updatedConversationItem);

                state.items = newItems;
            }

        })
        .addCase(sendMessage.rejected, (state, action) => {
            // const { messageData } = action.meta.arg;
            // if (state.currentConversation) {
            //     const optimisticMessageIndex = state.currentConversation.messages.findIndex(
            //         msg => msg.isOptimistic === true && msg.content.message === messageData.content.message
            //     );
            //     if (optimisticMessageIndex !== -1) {
            //         state.currentConversation.messages[optimisticMessageIndex].status = 'failed';
            //         state.currentConversation.messages[optimisticMessageIndex].isOptimistic = false; // Hapus flag optimis
            //     }
            // }
            state.error = action.payload;
        });
};

export const handleEditMessage = (builder, { editMessage }) => {
    builder
        .addCase(editMessage.fulfilled, (state, action) => {
            const updatedMessage = action.payload;

            if (state.currentConversation && state.currentConversation._id === updatedMessage.conversationId) {
                const messageIndex = state.currentConversation.messages.findIndex(m => m._id === updatedMessage._id);
                if (messageIndex !== -1) {
                    state.currentConversation.messages[messageIndex] = updatedMessage;
                }
            }

            const conversationIndex = state.items.findIndex(item => item.conversationId === updatedMessage.conversationId);
            if (conversationIndex !== -1 && state.items[conversationIndex].lastMessage?._id === updatedMessage._id) {
                state.items[conversationIndex].lastMessage.content = updatedMessage.content;
            }
        });
};

export const handleDeleteMessageForMe = (builder, { deleteMessageForMe }) => {
    builder
        .addCase(deleteMessageForMe.fulfilled, (state, action) => {
            const updatedMessage = action.payload;
            
            if (state.currentConversation && state.currentConversation._id === updatedMessage.conversationId) {
                state.currentConversation.messages = state.currentConversation.messages.filter(
                    m => m._id !== updatedMessage._id
                );
            }
        });
};

export const handleDeleteMessageForAll = (builder, { deleteMessageForAll }) => {
    builder
        .addCase(deleteMessageForAll.fulfilled, (state, action) => {
            const updatedMessage = action.payload;

            if (state.currentConversation && state.currentConversation._id === updatedMessage.conversationId) {
                const messageIndex = state.currentConversation.messages.findIndex(m => m._id === updatedMessage._id);
                if (messageIndex !== -1) {
                    state.currentConversation.messages[messageIndex] = updatedMessage;
                }
            }

            const conversationIndex = state.items.findIndex(item => item.conversationId === updatedMessage.conversationId);
            if (conversationIndex !== -1 && state.items[conversationIndex].lastMessage?._id === updatedMessage._id) {
                state.items[conversationIndex].lastMessage.content = updatedMessage.content;
            }
        });
};