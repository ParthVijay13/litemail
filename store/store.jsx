// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import draftsReducer from '../slices/draftsSlice';
import starredReducer from '../slices/Starredslice';
import sidebarReducer from '../slices/sidebarSlice';
// Function to load state from local storage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('emailDrafts');
    if (serializedState === null) return undefined;
    return { drafts: JSON.parse(serializedState) };
  } catch (e) {
    console.warn("Could not load drafts from local storage:", e);
    return undefined;
  }
};

// Function to save state to local storage
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state.drafts);
    localStorage.setItem('emailDrafts', serializedState);
  } catch (e) {
    console.warn("Could not save drafts to local storage:", e);
  }
};

const store = configureStore({
  reducer: {
    drafts: draftsReducer,
    starred: starredReducer,
    sidebar: sidebarReducer,
    // Add other reducers here
  },
  preloadedState: loadFromLocalStorage(),
});

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export default store;
