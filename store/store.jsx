import { configureStore } from '@reduxjs/toolkit';
import starredReducer from '../slices/Starredslice';
import sidebarReducer from '../slices/sidebarSlice';
// Load the starred state from local storage
const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('starred');
        if (serializedState === null) return {};
        return JSON.parse(serializedState);
    } catch (e) {
        console.warn("Failed to load state", e);
        return undefined;
    }
};

// Save the starred state to local storage
const saveToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('starred', serializedState);
    } catch (e) {
        console.warn("Failed to save state", e);
    }
};

const preloadedState = {
    starred: loadFromLocalStorage(),
};

const store = configureStore({
    reducer: {
        starred: starredReducer,
        sidebar: sidebarReducer,
    },
    preloadedState,
});

// Subscribe to store changes to save updates to local storage
store.subscribe(() => {
    saveToLocalStorage(store.getState().starred);
});

export default store;
