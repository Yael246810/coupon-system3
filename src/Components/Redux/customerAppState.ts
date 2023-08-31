//This is CustomerAppState.ts file
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomerModel } from '../../Models/Admin';
import { CustomersModel } from '../../Models/Customers';

//This is the Contract
interface CustomersState {
			customers: CustomerModel[];
}

//This is the initialized Task Application State - initialize within empty array
const initialState: CustomersState = {
			customers: [],
};

//These are all possible actions
export enum ActionType {
			GOT_ALL_CUSTOMERS = "GOT_ALL_CUSTOMERS",
			GOT_SINGLE_CUSTOMER = "GOT_SINGLE_CUSTOMER",
            ADDED_CUSTOMER = "ADDED_CUSTOMER",
            UPDATED_CUSTOMER = "UPDATED_CUSTOMER",
            DELETED_CUSTOMER = "DELETED_CUSTOMER",
            REMOVED_CUSTOMERS = "REMOVED_CUSTOMERS",
}

//This is tasksSlice
const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    gotAllCustomersAction(state, action: PayloadAction<CustomerModel[]>) {
      state.customers = action.payload;
    },
    gotSingleCustomerAction(state, action: PayloadAction<CustomersModel>) {
       state.customers.push(action.payload);
     },
     
    addedCustomerAction(state, action: PayloadAction<CustomerModel>) {
      state.customers.push(action.payload);
    },
    
    updatedCustomerAction(state, action: PayloadAction<CustomerModel>) {
      const updatedCustomer = action.payload;
      const idx = state.customers.findIndex(
        (customer) => customer.id === updatedCustomer.id
      );

      if (idx !== -1) {
        state.customers[idx] = updatedCustomer;
      }
    },

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
  gotSingleCustomerAction,
  addedCustomerAction,
  updatedCustomerAction,
  deletedCustomerAction,
  removeCustomers,
} = customersSlice.actions;


//Export the reducer
export const customersReducer = customersSlice.reducer;
