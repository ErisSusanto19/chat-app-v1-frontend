import * as contact from './contactApi'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const addContact = createAsyncThunk(
    'contact/add',
    async (data, { rejectWithValue }) => {
        try {
            const response = await contact.createContact(data)
            return response

        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Add contact failed.'
            return rejectWithValue(errorMessage)
        }
    }
)

export const fetchContacts = createAsyncThunk(
    'contacts/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await contact.getContacts()
            return response
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Fetch contact failed.'
            return rejectWithValue(errorMessage)
        }
    }
)

export const fetchContactById = createAsyncThunk(
    'contacts/fetchById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await contact.getContactById(id)
            return response
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Fetch contact by id failed.'
            return rejectWithValue(errorMessage)
        }
    }
)

export const editContact = createAsyncThunk(
    'contacts/edit',
    async (id, data, { rejectWithValue }) => {
        try {
            const response = await contact.updateContact(id, data)
            return response
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Update contact failed.'
            return rejectWithValue(errorMessage) 
        }
    }
)

export const removeContact = createAsyncThunk(
    'contacts/romove',
    async (id, { rejectWithValue }) => {
        try {
            const response = await contact.deleteContact(id)
            return response
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Delete contact failed.'
            return rejectWithValue(errorMessage)
        }
    }
)