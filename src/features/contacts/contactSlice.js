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
    loading: false,
    error: null
}

const contactSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        clearCurrentContact: (state) => {
            state.currentContact = null
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

export const { clearCurrentContact } = contactSlice.actions

export default contactSlice.reducer