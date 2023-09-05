import { guardReducer } from './GuardAppState';
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './UserAppState';
import { companiesReducer } from './CompanyAppState';
import { couponsReducer } from './CouponAppState';
import { customersReducer } from './CustomerAppState';
import { companiesNoCouponsReducer } from './CompanyNoCouponsAppState';


// This is rootReducer
const rootReducer = {
    customers: customersReducer, // Use actual customersReducer function
    user: userReducer,
    companies: companiesReducer,
    companiesNoCoupons: companiesNoCouponsReducer,
    guardReducer: guardReducer,
    couponsReducer: couponsReducer,
};

// This is store object
const store = configureStore({
    reducer: rootReducer,
});

// Export root Application State
export type RootState = ReturnType<typeof store.getState>;

// Export store object
export default store;
