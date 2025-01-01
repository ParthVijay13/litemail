import { createSlice } from '@reduxjs/toolkit';

const starredSlice = createSlice({
    name: 'starred',
    initialState: {},
    reducers: {
        toggleStarred: (state, action) => {
            const emailId = action.payload;
            // Toggle starred status for the email
            state[emailId] = !state[emailId];
        },
    },
});

export const { toggleStarred } = starredSlice.actions;
export default starredSlice.reducer;


