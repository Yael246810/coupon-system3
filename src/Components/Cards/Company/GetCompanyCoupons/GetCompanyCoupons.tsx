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

function GetCompanyCoupons(): JSX.Element {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [fetchedCoupons, setFetchedCoupons] = useState<CouponModel[] | null>(
    null
  );
  const [numericId, setNumericId] = useState<number | null>(null);

  const onSubmit = (data: { id: string }) => {
    const parsedId = parseInt(data.id);

    if (!isNaN(parsedId)) {
      setNumericId(parsedId);
      companyWebApiService
        .getCompanyCoupons(parsedId)
        .then((res) => {
          notifyService.success(`Fetched company #${parsedId}`);
          dispatch(getCompanyCouponsAction(res.data));
          setFetchedCoupons(res.data);
        })
        .catch((err) => notifyService.error(err));
    } else {
      notifyService.error("Please enter a valid company ID");
    }
  };

  return (
    <div className="GetCompanyCoupons">
      <h2>Get Company Coupons</h2>
      <form className="CompanyForm" onSubmit={handleSubmit(onSubmit)}>
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

      {fetchedCoupons && (
        <div className="CouponList">
          <h2>Coupons</h2>
          {fetchedCoupons.length !== 0 ? (
            fetchedCoupons.map((coupon) => (
              <CouponCard
                key={coupon.id}
                coupon={coupon}
                customerId={numericId}
                isCompanyConnected={true}
                companyId={numericId}
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
