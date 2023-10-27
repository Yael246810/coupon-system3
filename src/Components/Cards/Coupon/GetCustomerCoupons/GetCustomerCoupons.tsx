import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { CouponModel } from "../../../../Models/Admin";
import customerWebApiService from "../../../../Services/CustomerWebApiService";
import notifyService from "../../../../Services/NotificationService";
import EmptyView from "../../../Pages/EmptyView/EmptyView";
import { useLocation, useNavigate } from "react-router-dom";
import store from "../../../Redux/store";
import CouponCard from "../CouponCard/CouponCard";

function GetCustomerCoupons(): JSX.Element {
  const customerId = store.getState().user.id;
  // const navigate = useNavigate();

  // const deleteCoupon = (customerId: number, couponId: number) => {
  //   navigate(`/customers/${customerId}/coupons/${couponId}/delete`);
  // };

  const {
    formState: { errors },
  } = useForm();

  const [fetchedCoupons, setFetchedCoupons] = useState<CouponModel[]>(
    store.getState().couponsReducer.coupons
  );

  const location = useLocation();
  const fetchedData = useRef(location.state?.fetchedData);

  if (!fetchedData.current) {
    console.log("%%% get cust")
    fetchedData.current = true;
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
              <CouponCard
                key={coupon.id}
                coupon={coupon}
                customerId={customerId}
                isCompanyConnected={false}
                companyId={customerId}
              />
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
