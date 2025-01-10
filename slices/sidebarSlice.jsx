// features/sidebarSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  isHovered: false,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    setSidebarHovered: (state, action) => {
      state.isHovered = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarHovered } = sidebarSlice.actions;

export default sidebarSlice.reducer;
