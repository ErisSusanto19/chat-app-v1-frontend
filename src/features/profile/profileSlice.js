import { createSlice } from "@reduxjs/toolkit";

import { fetchProfile, editProfile } from "./profileThunk";
import { handleFetchProfile, handleEditProfile } from "./profileHandler";

const initialState = {
    data: null,
    loading: false,
    error: null
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        handleFetchProfile(builder, { fetchProfile })
        handleEditProfile(builder, { editProfile })
    }
})

export default profileSlice.reducer