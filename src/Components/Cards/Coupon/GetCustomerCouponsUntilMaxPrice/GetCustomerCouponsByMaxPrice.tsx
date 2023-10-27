import { useDispatch } from "react-redux";
import "./GetCustomerCouponsByMaxPrice.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { CouponModel } from "../../../../Models/Admin";
import notifyService from "../../../../Services/NotificationService";
import customerWebApiService from "../../../../Services/CustomerWebApiService";
import { getCustomerCouponsByMaxPriceAction } from "../../../Redux/CustomerWithCouponsAppState";
import store from "../../../Redux/store";
import CouponCard from "../CouponCard/CouponCard";

function GetCustomerCouponsByMaxPrice(): JSX.Element {
  const dispatch = useDispatch();
  const customerId = store.getState().user.id;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [fetchedCoupons, setFetchedCoupons] = useState<CouponModel[] | null>(
    null
  );

  const onSubmit = (data: { id: string; maxPrice: string }) => {
    const numericMaxPrice = parseFloat(data.maxPrice);

    if (!isNaN(numericMaxPrice)) {
      customerWebApiService
        .getCustomerCouponsByMaxPrice(customerId, numericMaxPrice)
        .then((res) => {
          notifyService.success(
            `Fetched coupons for customer #${customerId} with max price ${numericMaxPrice}`
          );

          dispatch(getCustomerCouponsByMaxPriceAction(numericMaxPrice));
          setFetchedCoupons(res.data);
        })
        .catch((err: any) => notifyService.error(err));
    } else {
      notifyService.error("Please enter valid customer ID and max price");
    }
  };

  return (
    <div className="GetCustomerCouponsByMaxPrice">
      <h2>Customer Coupons by Price</h2>
      <form className="CustomerForm" onSubmit={handleSubmit(onSubmit)}>
        {errors?.id ? (
          <span>{errors.id.message}</span>
        ) : (
          <>
            <label htmlFor="maxPrice">Max Price</label>
            <input {...register("maxPrice")} type="number" placeholder="Max Price"/>
          </>
        )}
        <button>Get</button>
      </form>

      {fetchedCoupons && (
        <div className="CouponList">
          <h2>Coupons</h2>
          <ul>
            {fetchedCoupons.map((coupon) => (
              <CouponCard
              key={coupon.id}
              coupon={coupon}
              customerId={customerId}
              isCompanyConnected={false}
              companyId={customerId}
            />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default GetCustomerCouponsByMaxPrice;
