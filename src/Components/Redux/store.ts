import { guardReducer } from "./GuardAppState";
import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./UserAppState";
import { companiesReducer } from "./CompanyAppState";
import { couponsReducer } from "./CouponAppState";
import { customersReducer } from "./CustomerAppState";
import { companiesNoCouponsReducer } from "./CompanyNoCouponsAppState";

const rootReducer = {
  customers: customersReducer,
  user: userReducer,
  companies: companiesReducer,
  companiesNoCoupons: companiesNoCouponsReducer,
  guardReducer: guardReducer,
  couponsReducer: couponsReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
