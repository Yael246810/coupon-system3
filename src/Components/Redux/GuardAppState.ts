import { createSlice } from '@reduxjs/toolkit';


//This is the Contract
interface GuardState {
    isAdmin: boolean;
    isCompany: boolean;
    isCustomer: boolean;
}


//This is the initialized Task Application State - initialize within empty array
const initialState: GuardState = {
    isAdmin: false,
    isCompany: false,
    isCustomer: false,
};

//These are all possible actions
export enum ActionType {
    LOGGED_IN_AS_ADMIN = "LOGGED_IN_AS_ADMIN",
    LOGGED_IN_AS_COMPANY = "LOGGED_IN_AS_COMPANY",
    LOGGED_IN_AS_CUSTOMER = "LOGGED_IN_AS_CUSTOMER",
    CLEAR_DATA = "CLEAR_DATA"
}

//This is tasksSlice
const guardSlice = createSlice({
    name: "guard",
    initialState,
    reducers: {
        loggedInAsAdmin(state) {
            state.isAdmin = true;
            state.isCompany = false;
            state.isCustomer = false;
        },
        loggedInAsCompany(state) {
            state.isAdmin = false;
            state.isCompany = true;
            state.isCustomer = false;
        },
        loggedInAsCustomer(state) {
            state.isAdmin = false;
            state.isCompany = false;
            state.isCustomer = true;
        },
        removeAll(state) {
            state.isCustomer = initialState.isCustomer;
            state.isCompany = initialState.isCompany;
            state.isAdmin = initialState.isAdmin;
            console.log("removeAll: " + state.isCustomer);
        },
    },
});


//This is the exported tasks
export const {
    loggedInAsAdmin,
    loggedInAsCompany,
    loggedInAsCustomer,
    removeAll,
} = guardSlice.actions;

//Export the reducer
export const guardReducer = guardSlice.reducer;