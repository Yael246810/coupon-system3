//This is CustomerAppState.ts file
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CompaniesModel } from '../../Models/CompaniesModel';
import { CouponModel } from '../../Models/Admin';

//This is the Contract
interface CompaniesState {
			companies: CompaniesModel[];
}

//This is the initialized Task Application State - initialize within empty array
const initialState: CompaniesState = {
  companies: [],
};

//These are all possible actions
export enum ActionType {
			GOT_ALL_COMPANIES = "GOT_ALL_COMPANIES",
			GOT_SINGLE_COMPANY = "GOT_SINGLE_COMPANY",
            DELETED_COMPANY = "DELETED_COMPANY",
            REMOVED_COMPANIES = "REMOVED_COMPANIES",
            GET_COMPANY_COUPONS = "GET_COMPANY_COUPONS",
            GET_COMPANY_COUPONS_BY_MAX_PRICE = "GET_COMPANY_COUPONS_BY_MAX_PRICE",
            GET_COMPANY_COUPONS_BY_CATEGORY = "GET_COMPANY_COUPONS_BY_CATEGORY",
            GET_COMPANY_DETAILS_ACTION = "GET_COMPANY_DETAILS_ACTION"
}

//This is tasksSlice
const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    gotAllCompaniesAction(state, action: PayloadAction<CompaniesModel[]>) {
      state.companies = action.payload;
    },
    gotSingleCompanyAction(state, action: PayloadAction<CompaniesModel>) {
      state.companies.push(action.payload);
    },
    deletedCompanyAction(state, action: PayloadAction<number>) {
      state.companies = state.companies.filter((company) => company.id !== action.payload);
    },
    getCompanyCouponsAction(state,action:PayloadAction<CouponModel[]>) {
      state.companies = state.companies.filter(company => company.coupons && company.coupons.length > 0);
    },
    getCompanyCouponsByMaxPriceAction(state,action:PayloadAction<CouponModel[]>){
      state.companies = state.companies.filter(company=>company.coupons.price && company.coupons.length>0)
    },
    getCompanyCouponsByCategoryAction(state,action:PayloadAction<CouponModel[]>){
      state.companies = state.companies.filter(company=>company.coupons.category && company.coupons.length>0)
    },
    getCompanyDetailsAction(state,action:PayloadAction<CompaniesModel>){
      state.companies.push(action.payload);
    },
    removeCompanies(state) {
      state.companies = [];
    },
  },
});


//This is the exported tasks
export const {
  gotAllCompaniesAction,
  gotSingleCompanyAction,
  deletedCompanyAction,
  removeCompanies,
  getCompanyCouponsAction,
  getCompanyCouponsByMaxPriceAction,
  getCompanyCouponsByCategoryAction,
  getCompanyDetailsAction,
} = companiesSlice.actions;


//Export the reducer
export const companiesReducer = companiesSlice.reducer;
