// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import draftsReducer from '../slices/draftsSlice';
import starredReducer from '../slices/Starredslice'; // Ensure correct casing
import sidebarReducer from '../slices/sidebarSlice';
import emailReducer from '../slices/EmailSlice';

// Function to load state from local storage
const loadFromLocalStorage = () => {
  try {
    const draftsSerialized = localStorage.getItem('emailDrafts');
    const starredSerialized = localStorage.getItem('starredEmails');
    
    const preloadedState = {
      drafts: draftsSerialized ? JSON.parse(draftsSerialized) : undefined,
      starred: starredSerialized ? JSON.parse(starredSerialized) : undefined,
    };

    console.log("Loaded state from localStorage:", preloadedState);
    return preloadedState;
  } catch (e) {
    console.warn('Could not load state from local storage:', e);
    return undefined;
  }
};

// Function to save state to local storage
const saveToLocalStorage = (state) => {
  try {
    console.log("Saving state:", state);
    console.log("Current 'starred' state:", state.starred);
    if (state.drafts) {
      const draftsSerialized = JSON.stringify(state.drafts);
      localStorage.setItem('emailDrafts', draftsSerialized);
    }
    if (state.starred) {
      const starredSerialized = JSON.stringify(state.starred);
      localStorage.setItem('starredEmails', starredSerialized);
    }
  } catch (e) {
    console.warn('Could not save state to local storage:', e);
  }
};

const store = configureStore({
  reducer: {
    drafts: draftsReducer,
    starred: starredReducer,
    sidebar: sidebarReducer,
    emails: emailReducer,
    // Add other reducers here
  },
  preloadedState: loadFromLocalStorage(),
});

// Subscribe to save drafts and starred emails to local storage
store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export default store;
