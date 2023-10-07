import { useDispatch } from "react-redux";
import "./GetCompanyCoupons.css";
import companyWebApiService from "../../../../Services/CompanyWebApiService";
import notifyService from "../../../../Services/NotificationService";
import { getCompanyCouponsAction } from "../../../Redux/CompanyAppState";
import { useForm } from "react-hook-form";
import { CouponModel } from "../../../../Models/Admin";
import { useState } from "react";
import CouponCard from "../../Coupon/CouponCard/CouponCard";
import EmptyView from "../../../Pages/EmptyView/EmptyView";
import store from "../../../Redux/store";

function GetCompanyCoupons(): JSX.Element {
  const dispatch = useDispatch();
  const companyId = store.getState().user.id;

  const {
    formState: { errors },
  } = useForm();

  const [fetchedCoupons, setFetchedCoupons] = useState<CouponModel[] | null>(
    null
  );

if(!fetchedCoupons) {
  companyWebApiService
  .getCompanyCoupons(companyId)
  .then((res) => {
    notifyService.success(`Fetched company #${companyId}`);
    dispatch(getCompanyCouponsAction(res.data));
    setFetchedCoupons(res.data);
  })
  .catch((err) => {
    notifyService.error(err);
  });
}

  return (
    <div className="GetCompanyCoupons">
      <h2>Get Company Coupons</h2>
      {fetchedCoupons && (
        <div className="CouponList">
          <h2>Coupons</h2>
          {fetchedCoupons.length !== 0 ? (
            fetchedCoupons.map((coupon) => (
              <CouponCard
                key={coupon.id}
                coupon={coupon}
                customerId={companyId}
                isCompanyConnected={true}
                companyId={companyId}
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

export default GetCompanyCoupons;
