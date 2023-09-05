//This is CustomerAppState.ts file
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CompanyModel } from '../../Models/Admin';

//This is the Contract
interface CompaniesState {
			companies: CompanyModel[];
}

//This is the initialized Task Application State - initialize within empty array
const initialState: CompaniesState = {
  companies: [],
};

//These are all possible actions
export enum ActionType {
            ADDED_COMPANY = "ADDED_COMPANY",
            UPDATED_COMPANY = "UPDATED_COMPANY",
            REMOVED_COMPANIES = "REMOVED_COMPANIES",
}

//This is tasksSlice
const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    
    
    addedCompanyAction(state, action: PayloadAction<CompanyModel>) {
      console.log("push company: " + action.payload);
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


//This is the exported tasks
export const {
  addedCompanyAction,
  updatedCompanyAction,
  removeCompanies,
} = companiesSlice.actions;


//Export the reducer
export const companiesNoCouponsReducer = companiesSlice.reducer;
