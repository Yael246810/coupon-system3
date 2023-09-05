import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { CouponModel } from "../../../../Models/Admin";
import customerWebApiService from "../../../../Services/CustomerWebApiService";
import notifyService from "../../../../Services/NotificationService";
import EmptyView from "../../../Pages/EmptyView/EmptyView";
import { useNavigate } from "react-router-dom";

function GetCustomerCoupons(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteCoupon = (customerId: number, couponId: number) => {
    navigate(`/customers/${customerId}/coupons/${couponId}/delete`);
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [fetchedCoupons, setFetchedCoupons] = useState<CouponModel[] | null>(null);

  const onSubmit = (data: { id: string }) => {
    const numericId = parseInt(data.id);

    if (!isNaN(numericId)) {
      customerWebApiService
        .getCustomerCoupons(numericId)
        .then((res) => {
          notifyService.success(`Fetched customer #${numericId}`);
          setFetchedCoupons(res.data); // Set the fetched coupons here
        })
        .catch((err) => {
          notifyService.error(err);
          setFetchedCoupons([]); // Set an empty array in case of an error
        });
    } else {
      notifyService.error("Please enter a valid customer ID");
      setFetchedCoupons([]); // Set an empty array if the ID is invalid
    }
  };

  return (
    <div className="GetCustomerCoupons">
      <h2>Get Customer Coupons</h2>
      <form className="CustomerForm" onSubmit={handleSubmit(onSubmit)}>
        {errors?.id ? (
          <span>{errors.id.message}</span>
        ) : (
          <>
            <label htmlFor="id">Id</label>
            <input {...register("id")} type="number" placeholder="Id" />
          </>
        )}
        <button>Get</button>
      </form>

      {fetchedCoupons !== null && (
        <div className="CouponList">
          <h2>Coupons</h2>
          {fetchedCoupons.length !== 0 ? (
            fetchedCoupons.map((coupon) => (
              <div key={coupon.id} className="CouponCard">
                <p>Coupon ID: {coupon.id}</p>
                <p>Coupon Category: {coupon.category}</p>
                <p>Coupon Title: {coupon.title}</p>
                <p>Coupon Description: {coupon.description}</p>
                <p>Coupon Start Date: {coupon.startDate}</p>
                <p>Coupon End Date: {coupon.endDate}</p>
                <p>Coupon Amount: {coupon.amount}</p>
                <p>Coupon Price: {coupon.price}</p>
                <p>Coupon Image: {coupon.image}</p>
                <button
                  onClick={() => deleteCoupon(2, coupon.id)} // Pass the correct customerId (e.g., 2)
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <EmptyView msg="There are no coupons available at the moment" />
          )}
        </div>
      )}
    </div>
  );
}

export default GetCustomerCoupons;
