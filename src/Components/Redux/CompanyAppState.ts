import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CompaniesModel } from "../../Models/CompaniesModel";
import { CompanyModel, CouponModel } from "../../Models/Admin";

interface CompaniesState {
  companies: CompaniesModel[];
}

const initialState: CompaniesState = {
  companies: [],
};

export enum ActionType {
  GOT_ALL_COMPANIES = "GOT_ALL_COMPANIES",
  GOT_SINGLE_COMPANY = "GOT_SINGLE_COMPANY",
  DELETED_COMPANY = "DELETED_COMPANY",
  REMOVED_COMPANIES = "REMOVED_COMPANIES",
  GET_COMPANY_COUPONS = "GET_COMPANY_COUPONS",
  GET_COMPANY_COUPONS_BY_MAX_PRICE = "GET_COMPANY_COUPONS_BY_MAX_PRICE",
  GET_COMPANY_COUPONS_BY_CATEGORY = "GET_COMPANY_COUPONS_BY_CATEGORY",
  GET_COMPANY_DETAILS_ACTION = "GET_COMPANY_DETAILS_ACTION",
}

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
      state.companies = state.companies.filter(
        (company) => company.id !== action.payload
      );
    },
    getCompanyCouponsAction(state, action: PayloadAction<CouponModel[]>) {
      state.companies = [];

      const company: CompaniesModel = {
        coupons: action.payload
      }

      state.companies.push(company);
    },
    getCompanyCouponsByMaxPriceAction(state,action: PayloadAction<CouponModel[]>) {
      state.companies[0].coupons = action.payload;
    },
    getCompanyCouponsByCategoryAction(state,action: PayloadAction<CouponModel[]>) {
      state.companies[0].coupons = action.payload;
    },
    getCompanyDetailsAction(state, action: PayloadAction<CompaniesModel>) {
      state.companies = [];
      state.companies.push(action.payload);
    },
    removeCompanies(state) {
      state.companies = [];
    },
  },
});

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

export const companiesReducer = companiesSlice.reducer;
