// draftsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const draftsSlice = createSlice({
  name: "drafts",
  initialState: [],
  reducers: {
    addDraft: (state, action) => {
      state.push(action.payload); // Add a new draft
    },
    updateDraft: (state, action) => {
      const index = state.findIndex((draft) => draft._id === action.payload._id);
      if (index !== -1) {
        state[index] = action.payload; // Update existing draft
      }
    },
    removeDraft: (state, action) => {
      return state.filter((draft) => draft._id !== action.payload); // Remove draft by ID
    },
    setDrafts: (state, action) => {
      return action.payload; // Set all drafts
    },
  },
});

export const { addDraft, updateDraft, removeDraft, setDrafts } = draftsSlice.actions;

export default draftsSlice.reducer;
