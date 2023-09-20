import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CompanyModel } from "../../Models/Admin";

interface CompaniesState {
  companies: CompanyModel[];
}

const initialState: CompaniesState = {
  companies: [],
};

export enum ActionType {
  ADDED_COMPANY = "ADDED_COMPANY",
  UPDATED_COMPANY = "UPDATED_COMPANY",
  REMOVED_COMPANIES = "REMOVED_COMPANIES",
}

const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    addedCompanyAction(state, action: PayloadAction<CompanyModel>) {
      state.companies.push(action.payload);
    },
    updatedCompanyAction(state, action: PayloadAction<CompanyModel>) {
      const idx = state.companies.findIndex(
        (company) => company.id === action.payload.id
      );
      state.companies[idx] = action.payload;
    },
    removeCompanies(state) {
      state.companies = [];
    },
  },
});

export const { addedCompanyAction, updatedCompanyAction, removeCompanies } =
  companiesSlice.actions;

export const companiesNoCouponsReducer = companiesSlice.reducer;
