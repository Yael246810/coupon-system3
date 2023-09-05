//This is CustomerAppState.ts file
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomersModel } from '../../Models/Customers';
import { CouponModel } from '../../Models/Admin';

// This is the Contract
interface CustomersState {
  customers: CustomersModel[];
}

// This is the initialized Task Application State - initialize with an empty array
const initialState: CustomersState = {
  customers: [],
};

// These are all possible actions
export enum ActionType {
  PURCHASE_COUPON = "PURCHASE_COUPON",
  GOT_SINGLE_CUSTOMER = "GOT_SINGLE_CUSTOMER",
  GET_CUSTOMER_COUPONS = "GET_CUSTOMER_COUPONS",
  GET_CUSTOMER_COUPONS_BY_MAX_PRICE = "GET_CUSTOMER_COUPONS_BY_MAX_PRICE",
  GET_CUSTOMER_COUPONS_BY_CATEGORY = "GET_CUSTOMER_COUPONS_BY_CATEGORY",
  DELETE_COUPON_PURCHASED = "DELETE_COUPON_PURCHASED",
  GET_CUSTOMER_DETAILS = "GET_CUSTOMER_DETAILS",
  REMOVED_CUSTOMERS = "REMOVED_CUSTOMERS",
}

// This is tasksSlice
const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    // Update the action creator in CustomerAppState.ts
// Inside your reducer
purchaseCouponAction(
  state,
  action: PayloadAction<{ customerId: number; couponId: number }>
) {
  const { customerId, couponId } = action.payload;
  // Find the customer in the state based on customerId (assuming you have the structure for CustomersModel)
  const customer = state.customers.find((c) => c.id === customerId);

  if (customer) {
    // Create a valid Date object representing the current date and time
    const currentDate = new Date();

    // Add the purchased coupon to the customer's coupons list
    customer.coupons.push({
      id: couponId,
      customer: [],
      category: '',
      title: '',
      description: '',
      startDate: currentDate, // Use the created Date object
      endDate: currentDate,   // Use the created Date object
      amount: 0,
      price: 0,
      image: ''
    });
  }
},

    gotSingleCustomerAction(state, action: PayloadAction<CustomersModel>) {
      state.customers.push(action.payload);
    },

    getCustomerCouponsAction(state,action:PayloadAction<CouponModel[]>) {
      state.customers = state.customers.filter(customer => customer.coupons && customer.coupons.length > 0);
    },
    getCustomerCouponsByMaxPriceAction( state, action: PayloadAction<number> ) {
      const numericMaxPrice = action.payload; // Assuming action.payload contains the maximum price
      state.customers.forEach((customer) => {
        if (customer.coupons) {
          customer.coupons = customer.coupons.filter(
            (coupon) => coupon.price <= numericMaxPrice
          );
        }
      });
    },

    
    getCustomerCouponsByCategoryAction(state, action: PayloadAction<string>) {
      const selectedCategory = action.payload; // Assuming action.payload contains the selected category
      state.customers.forEach((customer) => {
        if (customer.coupons) {
          customer.coupons = customer.coupons.filter((coupon) => coupon.category === selectedCategory);
        }
      });
    },
    
    deletedPurchasedCouponAction(state, action: PayloadAction<{ customerId: number; couponId: number }>) {
      const { customerId, couponId } = action.payload;
      const customerIndex = state.customers.findIndex((customer) => customer.id === customerId);
    
      if (customerIndex !== -1) {
        // Find the index of the coupon in the customer's coupons array
        const couponIndex = state.customers[customerIndex].coupons.findIndex((coupon) => coupon.id === couponId);
    
        if (couponIndex !== -1) {
          // Remove the coupon from the customer's coupons array
          state.customers[customerIndex].coupons.splice(couponIndex, 1);
        }
      }
    },
    getCustomerDetails(state,action:PayloadAction<CustomersModel>){
      state.customers.push(action.payload);
    },
    
    removeCustomers(state) {
      state.customers = [];
    },
  },
});

// This is the exported tasks
export const {
  gotSingleCustomerAction,
  purchaseCouponAction,
  getCustomerCouponsAction,
  getCustomerCouponsByMaxPriceAction,
  getCustomerCouponsByCategoryAction,
  deletedPurchasedCouponAction,
  getCustomerDetails,
  removeCustomers,
} = customersSlice.actions;

// Export the reducer
export const customersWithCouponsReducer = customersSlice.reducer;
