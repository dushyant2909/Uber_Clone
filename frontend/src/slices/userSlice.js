import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userDetails: null, // Stores user registration or profile data
    isLoggedIn: false, // Tracks user's login status
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        registerUser: (state, action) => {
            state.userDetails = action.payload;
        },
        loginUser: (state) => {
            state.isLoggedIn = true;
        },
        logoutUser: (state) => {
            state.userDetails = null;
            state.isLoggedIn = false;
        },
    },
});

export const { registerUser, loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
