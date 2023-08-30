import { configureStore } from '@reduxjs/toolkit';
import { customersReducer } from './customerAppState';
import { userReducer } from './UserAppState';

// This is rootReducer
const rootReducer = {
    customers: customersReducer, // Use actual customersReducer function
    user: userReducer, // Use actual userReducer function
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
