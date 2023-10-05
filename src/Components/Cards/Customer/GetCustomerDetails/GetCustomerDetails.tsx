import { useDispatch } from "react-redux";
import "./GetCustomerDetails.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { CustomersModel } from "../../../../Models/Customers";
import customerWebApiService from "../../../../Services/CustomerWebApiService";
import notifyService from "../../../../Services/NotificationService";
import { getCustomerDetails } from "../../../Redux/CustomerWithCouponsAppState";

function GetCustomerDetails(): JSX.Element {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [fetchedCustomer, setFetchedCustomer] = useState<CustomersModel | null>(
    null
  );

  const onSubmit = (data: { id: string }) => {
    const numericId = parseInt(data.id);

    if (!isNaN(numericId)) {
      customerWebApiService
        .getCustomerDetails(numericId)
        .then((res) => {
          notifyService.success(`Details about customer #${numericId}`);
          dispatch(getCustomerDetails(res.data));
          setFetchedCustomer(res.data);
        })
        .catch((err) => notifyService.error(err));
    } else {
      notifyService.error("Please enter a valid customer ID");
    }
  };

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
        <p></p> //No customer data available
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="id">Enter Customer ID:</label>
        <input {...register("id")} type="number" placeholder="Customer ID" />
        <button type="submit">Get Details</button>
        {errors?.id && <span>{errors.id.message}</span>}
      </form>
    </div>
  );
}

export default GetCustomerDetails;
