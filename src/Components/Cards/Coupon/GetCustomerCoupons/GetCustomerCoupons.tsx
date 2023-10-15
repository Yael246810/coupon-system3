import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { CouponModel } from "../../../../Models/Admin";
import customerWebApiService from "../../../../Services/CustomerWebApiService";
import notifyService from "../../../../Services/NotificationService";
import EmptyView from "../../../Pages/EmptyView/EmptyView";
import { useLocation, useNavigate } from "react-router-dom";
import store from "../../../Redux/store";

function GetCustomerCoupons(): JSX.Element {
  const customerId = store.getState().user.id;
  const navigate = useNavigate();

  const deleteCoupon = (customerId: number, couponId: number) => {
    navigate(`/customers/${customerId}/coupons/${couponId}/delete`);
  };

  const {
    formState: { errors },
  } = useForm();

  const [fetchedCoupons, setFetchedCoupons] = useState<CouponModel[]>(
    store.getState().couponsReducer.coupons
  );

  const location = useLocation();
  const wasCouponsDataUpdated = useRef(location.state?.wasCouponsDataUpdated);

  if (fetchedCoupons.length === 0 || wasCouponsDataUpdated.current) {
    wasCouponsDataUpdated.current = false;
    customerWebApiService
      .getCustomerCoupons(customerId)
      .then((res) => {
        notifyService.success(`Fetched customer #${customerId}`);
        setFetchedCoupons(res.data);
      })
      .catch((err) => {
        notifyService.error(err);
        setFetchedCoupons([]);
      });
  }

  return (
    <div className="GetCustomerCoupons">
      <h2>Get Customer Coupons</h2>

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
