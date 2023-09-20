import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CustomerModel } from "../../Models/Admin";

interface CustomersState {
  customers: CustomerModel[];
}

const initialState: CustomersState = {
  customers: [],
};

export enum ActionType {
  GOT_ALL_CUSTOMERS = "GOT_ALL_CUSTOMERS",
  ADDED_CUSTOMER = "ADDED_CUSTOMER",
  UPDATED_CUSTOMER = "UPDATED_CUSTOMER",
  DELETED_CUSTOMER = "DELETED_CUSTOMER",
  REMOVED_CUSTOMERS = "REMOVED_CUSTOMERS",
}

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    gotAllCustomersAction(state, action: PayloadAction<CustomerModel[]>) {
      state.customers = action.payload;
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
      state.customers = state.customers.filter(
        (customer) => customer.id !== action.payload
      );
    },

    removeCustomers(state) {
      state.customers = [];
    },
  },
});

export const {
  gotAllCustomersAction,
  addedCustomerAction,
  updatedCustomerAction,
  deletedCustomerAction,
  removeCustomers,
} = customersSlice.actions;

export const customersReducer = customersSlice.reducer;
