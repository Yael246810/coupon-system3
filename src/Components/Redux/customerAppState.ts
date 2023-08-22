//This is CustomerAppState.ts file
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomerModel } from '../../Models/Admin';

//This is the Contract
interface CustomersState {
			customers: CustomerModel[];
}

//This is the initialized Task Applicaiton State - initialize within empty array
const initialState: CustomersState = {
			customers: [],
};

//These are all possible actions
export enum ActionType {
			GOT_ALL_TASKS = "GOT_ALL_CUSTOMERS",
			GOT_SINGLE_TASK = "GOT_SINGLE_CUSTOMER",
            ADDED_TASK = "ADDED_CUSTOMER",
            UPDATED_TASK = "UPDATED_CUSTOMER",
            DELETED_TASK = "DELETED_CUSTOMER",
            REMOVED_TASKS = "REMOVED_CUSTOMERS",
}

//This is tasksSlice
const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    gotAllCustomersAction(state, action: PayloadAction<CustomerModel[]>) {
      state.customers = action.payload;
    },
    // gotSingleCustomerAction(state, action: PayloadAction<CustomerModel[]>) {
    //   state.customers.push(action.payload);
    // },
    addedCustomerAction(state, action: PayloadAction<CustomerModel[]>) {
      state.customers.push(action.payload);
    },
    // updatedCustomerACtion(state, action: PayloadAction<CustomerModel[]>) {
    //   const idx = state.customers.findIndex(
    //     (customer) => customer.id === action.payload.id
    //   );
    //   state.customers[idx] = action.payload;
    // },
    deletedCustomerAction(state, action: PayloadAction<number>) {
      state.customers = state.customers.filter((customer) => customer.id !== action.payload);
    },
    removeCustomers(state) {
      state.customers = [];
    },
  },
});


//This is the exported tasks
export const {
  gotAllCustomersAction,
//   gotSingleCustomerAction,
  addedCustomerAction,
//   updatedCustomerAction,
  deletedCustomerAction,
  removeCustomers,
} = customersSlice.actions;


//Export the reducer
export const customersReducer = customersSlice.reducer;
