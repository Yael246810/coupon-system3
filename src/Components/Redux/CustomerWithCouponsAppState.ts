import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CustomersModel } from "../../Models/Customers";
import { CouponModel } from "../../Models/Admin";

interface CustomersState {
  customers: CustomersModel[];
}

const initialState: CustomersState = {
  customers: [],
};

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

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    purchaseCouponAction(
      state,
      action: PayloadAction<{ customerId: number; couponId: number }>
    ) {
      const { customerId, couponId } = action.payload;
      const customer = state.customers.find((c) => c.id === customerId);

      if (customer) {
        const currentDate = new Date();

        customer.coupons.push({
          id: couponId,
          customer: [],
          category: "",
          title: "",
          description: "",
          startDate: currentDate,
          endDate: currentDate,
          amount: 0,
          price: 0,
          image: "",
        });
      }
    },

    gotSingleCustomerAction(state, action: PayloadAction<CustomersModel>) {
      state.customers.push(action.payload);
    },

    getCustomerCouponsAction(state, action: PayloadAction<CouponModel[]>) {
      state.customers = state.customers.filter(
        (customer) => customer.coupons && customer.coupons.length > 0
      );
    },
    getCustomerCouponsByMaxPriceAction(state, action: PayloadAction<number>) {
      const numericMaxPrice = action.payload;
      state.customers.forEach((customer) => {
        if (customer.coupons) {
          customer.coupons = customer.coupons.filter(
            (coupon) => coupon.price <= numericMaxPrice
          );
        }
      });
    },

    getCustomerCouponsByCategoryAction(state, action: PayloadAction<string>) {
      const selectedCategory = action.payload;
      state.customers.forEach((customer) => {
        if (customer.coupons) {
          customer.coupons = customer.coupons.filter(
            (coupon) => coupon.category === selectedCategory
          );
        }
      });
    },

    deletedPurchasedCouponAction(
      state,
      action: PayloadAction<{ customerId: number; couponId: number }>
    ) {
      const { customerId, couponId } = action.payload;
      const customerIndex = state.customers.findIndex(
        (customer) => customer.id === customerId
      );

      if (customerIndex !== -1) {
        const couponIndex = state.customers[customerIndex].coupons.findIndex(
          (coupon) => coupon.id === couponId
        );

        if (couponIndex !== -1) {
          state.customers[customerIndex].coupons.splice(couponIndex, 1);
        }
      }
    },
    getCustomerDetails(state, action: PayloadAction<CustomersModel>) {
      state.customers.push(action.payload);
    },

    removeCustomers(state) {
      state.customers = [];
    },
  },
});

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

export const customersWithCouponsReducer = customersSlice.reducer;
