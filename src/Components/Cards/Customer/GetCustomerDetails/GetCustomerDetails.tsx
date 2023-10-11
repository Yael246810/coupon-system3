import { useDispatch } from "react-redux";
import "./GetCustomerDetails.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { CustomersModel } from "../../../../Models/Customers";
import customerWebApiService from "../../../../Services/CustomerWebApiService";
import notifyService from "../../../../Services/NotificationService";
import { getCustomerDetails } from "../../../Redux/CustomerWithCouponsAppState";
import store from "../../../Redux/store";

function GetCustomerDetails(): JSX.Element {
  const dispatch = useDispatch();
  const customerId = store.getState().user.id;

  const {
    formState: { errors },
  } = useForm();

  const [fetchedCustomer, setFetchedCustomer] = useState<CustomersModel | null>(null);

  if(!fetchedCustomer) {
    customerWebApiService
        .getCustomerDetails(customerId)
        .then((res) => {
          notifyService.success(`Details about customer #${customerId}`);
          dispatch(getCustomerDetails(res.data));
          setFetchedCustomer(res.data);
        })
        .catch((err) => notifyService.error(err));
  }

  return (
    <div className="GetCustomerDetails">
      <h1>Customer Details</h1>
      {fetchedCustomer ? (
        <div>
          <p>ID: {fetchedCustomer.id}</p>
          <p>First Name: {fetchedCustomer.firstName}</p>
          <p>Last Name: {fetchedCustomer.lastName}</p>
          <p>Email: {fetchedCustomer.email}</p>
          <p>Password: {fetchedCustomer.password}</p>

          <h2>Coupons:</h2>
          <ul className="CouponList">
            {fetchedCustomer?.coupons?.map((coupon: any) => (
              <li key={coupon.id} className="CouponItem">
                <p>Category: {coupon.category}</p>
                <p>Title: {coupon.title}</p>
                <p>Description: {coupon.description}</p>
                <p>Start Date: {coupon.startDate}</p>
                <p>End Date: {coupon.endDate}</p>
                <p>Amount: {coupon.amount}</p>
                <p>Price: {coupon.price}</p>
                <p>Image: {coupon.image}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p></p> 
      )}

    </div>
  );
}

export default GetCustomerDetails;
