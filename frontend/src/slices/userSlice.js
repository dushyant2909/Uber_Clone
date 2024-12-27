import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userDetails: null,
    isLoggedIn: false,
    isLoading: true, // Tracks whether session verification is in progress
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
            state.isLoading = false; // Set loading to false after login
        },
        logoutUser: (state) => {
            state.userDetails = null;
            state.isLoggedIn = false;
            state.isLoading = false; // Set loading to false after logout
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

export const { registerUser, loginUser, logoutUser, setLoading } = userSlice.actions;
export default userSlice.reducer;
