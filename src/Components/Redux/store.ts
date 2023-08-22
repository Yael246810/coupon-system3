// This is store.ts file
import { configureStore } from '@reduxjs/toolkit';
import { customersReducer } from './customerAppState';
import { useReducer } from 'react';

// This is rootReducer
const rootReducer = {
    customersReducer: customersReducer,
    userReducer: useReducer,
    // add more reducers here if needed (couponReducer and more...)
};

// This is store object
const store = configureStore({
    reducer: rootReducer,
});

// Export root Application State
export type RootState = ReturnType<typeof store.getState>;

// Export store object
export default store;