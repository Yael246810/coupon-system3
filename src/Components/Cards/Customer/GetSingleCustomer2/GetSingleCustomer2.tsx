import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import customerWebApiService from "../../../../Services/CustomerWebApiService";
import notifyService from "../../../../Services/NotificationService";
import { CustomersModel } from "../../../../Models/Customers";
import "./GetSingleCustomer2.css"; // Import your CSS file here
import { CouponModel } from "../../../../Models/Admin";
import { gotSingleCustomerAction } from "../../../Redux/CustomerWithCouponsAppState";

function GetSingleCustomer2(): JSX.Element {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [fetchedCustomer, setFetchedCustomer] = useState<CustomersModel | null>(null);

  const onSubmit = (data: { id: string }) => {
    const numericId = parseInt(data.id);

    if (!isNaN(numericId)) {
      customerWebApiService
        .getSingleCustomer(numericId)
        .then((res) => {
          notifyService.success(`Fetched customer #${numericId}`);
          dispatch(gotSingleCustomerAction(res.data));
          setFetchedCustomer(res.data);
        })
        .catch((err) => notifyService.error(err));
    } else {
      notifyService.error("Please enter a valid customer ID");
    }
  };

  return (
    <div className="GetSingleCustomer2">
      <h2>Get Customer</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors?.id ? (
          <span>{errors.id.message}</span>
        ) : (
          <>
            <label htmlFor="id">Id</label>
            <input {...register("id")} type="number" placeholder="Id" />
            <button>Get</button>
          </>
        )}
      </form>
      {fetchedCustomer && (
  <div className="CustomerCard">
    <h2>Single Customer:</h2>
    <p>ID: {fetchedCustomer.id}</p>
    <p>First Name: {fetchedCustomer.firstName}</p>
    <p>Last Name: {fetchedCustomer.lastName}</p>
    <p>Email: {fetchedCustomer.email}</p>
    <p>Password: {fetchedCustomer.password}</p>

    <h2>Coupons:</h2>
    <ul className="CouponList">
      {fetchedCustomer.coupons?.map((coupon: CouponModel) => (
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
)}

    </div>
  );
}

export default GetSingleCustomer2;
