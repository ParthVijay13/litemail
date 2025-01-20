// src/slices/EmailSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  starred: {},      // { [emailId]: true/false }
  archived: {},     // { [emailId]: true/false }
  deleted: {},      // { [emailId]: true/false }
  unread: {},       // { [emailId]: true/false }
  snoozed: {},      // { [emailId]: snoozeTime }
};

const emailSlice = createSlice({
  name: 'emails',
  initialState,
  reducers: {
    toggleStarred: (state, action) => {
      const emailId = action.payload;
      state.starred[emailId] = !state.starred[emailId];
    },
    archiveEmail: (state, action) => {
      const emailId = action.payload;
      state.archived[emailId] = true;
      // Optionally, you can also remove it from starred or other states
      state.starred[emailId] = false;
    },
    deleteEmail: (state, action) => {
      const emailId = action.payload;
      state.deleted[emailId] = true;
      // Optionally, remove from other states
      state.starred[emailId] = false;
      state.archived[emailId] = false;
      state.unread[emailId] = false;
      state.snoozed[emailId] = false;
    },
    markAsUnread: (state, action) => {
      const emailId = action.payload;
      state.unread[emailId] = !state.unread[emailId];
    },
    snoozeEmail: (state, action) => {
      const { emailId, snoozeUntil } = action.payload; // snoozeUntil can be a timestamp
      state.snoozed[emailId] = snoozeUntil;
      // Optionally, you can mark it as archived or remove it from inbox view
      state.archived[emailId] = true;
    },
    // Optionally, add actions to unsnooze or restore emails
  },
});

export const {
  toggleStarred,
  archiveEmail,
  deleteEmail,
  markAsUnread,
  snoozeEmail,
} = emailSlice.actions;

export default emailSlice.reducer;
