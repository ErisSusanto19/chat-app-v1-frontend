import { createSlice } from '@reduxjs/toolkit'
import { 
    addContact, 
    fetchContacts, 
    fetchContactById, 
    editContact, 
    removeContact 
} from './contactThunk'
import { 
    handleAddContact, 
    handleFetchContacts, 
    handleFetchContactById, 
    handleEditContact, 
    handleRemoveContact 
} from './contactHandler'

const initialState = {
    items: [],
    currentContact: null,
    currentPage: 1,
    totalPages: 1,
    loading: false,
    error: null
}

const contactSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        clearCurrentContact: (state) => {
            state.currentContact = null
        },
        resetContactList: (state) => {
            state.items = [];
            state.currentPage = 1;
            state.totalPages = 1;
        }
    },
    extraReducers: (builder) => {
        handleAddContact(builder, { addContact })
        handleFetchContacts(builder, { fetchContacts })
        handleFetchContactById(builder, { fetchContactById })
        handleEditContact(builder, { editContact })
        handleRemoveContact(builder, { removeContact })
    }
})

export const { clearCurrentContact, resetContactList } = contactSlice.actions

export default contactSlice.reducer