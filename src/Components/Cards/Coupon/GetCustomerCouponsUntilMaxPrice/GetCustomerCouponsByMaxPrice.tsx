import { useDispatch } from "react-redux";
import "./GetCustomerCouponsByMaxPrice.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { CouponModel } from "../../../../Models/Admin";
import notifyService from "../../../../Services/NotificationService";
import customerWebApiService from "../../../../Services/CustomerWebApiService";
import { getCustomerCouponsByMaxPriceAction } from "../../../Redux/CustomerWithCouponsAppState";

function GetCustomerCouponsByMaxPrice(): JSX.Element {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [fetchedCoupons, setFetchedCoupons] = useState<CouponModel[] | null>(
    null
  );

  const onSubmit = (data: { id: string; maxPrice: string }) => {
    const numericId = parseInt(data.id);
    const numericMaxPrice = parseFloat(data.maxPrice);

    if (!isNaN(numericId) && !isNaN(numericMaxPrice)) {
      customerWebApiService
        .getCustomerCouponsByMaxPrice(numericId, numericMaxPrice)
        .then((res) => {
          notifyService.success(
            `Fetched coupons for customer #${numericId} with max price ${numericMaxPrice}`
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
            <label htmlFor="id">Id</label>
            <input {...register("id")} type="number" placeholder="Id" />

            <label htmlFor="maxPrice">Max Price</label>
            <input
              {...register("maxPrice")}
              type="number"
              placeholder="Max Price"
            />
          </>
        )}
        <button>Get</button>
      </form>

      {fetchedCoupons && (
        <div className="CouponList">
          <h2>Coupons</h2>
          <ul>
            {fetchedCoupons.map((coupon) => (
              <li className="CouponItem" key={coupon.id}>
                {coupon.title} - Price: ${coupon.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default GetCustomerCouponsByMaxPrice;
