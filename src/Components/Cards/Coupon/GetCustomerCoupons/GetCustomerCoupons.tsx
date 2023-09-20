import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { CouponModel } from "../../../../Models/Admin";
import customerWebApiService from "../../../../Services/CustomerWebApiService";
import notifyService from "../../../../Services/NotificationService";
import EmptyView from "../../../Pages/EmptyView/EmptyView";
import { useLocation, useNavigate } from "react-router-dom";
import store from "../../../Redux/store";

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

  const [fetchedCoupons, setFetchedCoupons] = useState<CouponModel[]>(
    store.getState().couponsReducer.coupons
  );

  const location = useLocation();
  const wasCouponsDataUpdated = useRef(location.state?.wasCouponsDataUpdated);

  const onSubmit = (data: { id: string }) => {
    const numericId = parseInt(data.id);

    if (fetchedCoupons.length === 0 || wasCouponsDataUpdated.current) {
      if (!isNaN(numericId)) {
        wasCouponsDataUpdated.current = false;
        customerWebApiService
          .getCustomerCoupons(numericId)
          .then((res) => {
            notifyService.success(`Fetched customer #${numericId}`);
            setFetchedCoupons(res.data);
          })
          .catch((err) => {
            notifyService.error(err);
            setFetchedCoupons([]);
          });
      } else {
        notifyService.error("Please enter a valid customer ID");
        setFetchedCoupons([]);
      }
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
                  onClick={() => deleteCoupon(2, coupon.id)}
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
