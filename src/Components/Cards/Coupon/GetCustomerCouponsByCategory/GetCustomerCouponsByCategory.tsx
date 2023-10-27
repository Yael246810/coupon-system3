import { useDispatch } from "react-redux";
import "./GetCustomerCouponsByCategory.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Category, CouponModel } from "../../../../Models/Admin";
import customerWebApiService from "../../../../Services/CustomerWebApiService";
import notifyService from "../../../../Services/NotificationService";
import { getCustomerCouponsByCategoryAction } from "../../../Redux/CustomerWithCouponsAppState";
import store from "../../../Redux/store";
import CouponCard from "../CouponCard/CouponCard";

function GetCustomerCouponsByCategory(): JSX.Element {
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

  const onSubmit = (data: { id: string; category: Category }) => {
    customerWebApiService
    .getCustomerCouponsByCategory(customerId, data.category)
    .then((res) => {
      notifyService.success(
        `Fetched customer #${customerId} coupons by category`
      );
      dispatch(getCustomerCouponsByCategoryAction(res.data));
      setFetchedCoupons(res.data);
    })
    .catch((err) => notifyService.error(err));
  };

  return (
    <div className="GetCustomerCouponsByCategory">
      <h1>Customer Coupons by Category</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="category">Category </label>
        <select {...register("category")}>
          <option value={Category.FOOD}>Food</option>
          <option value={Category.ELECTRONICS}>Electronics</option>
          <option value={Category.CLOTHING}>Clothing</option>
          <option value={Category.GAMES}>Games</option>
          <option value={Category.HEALTH}>Health</option>
          <option value={Category.HOME}>Home</option>
          <option value={Category.MOVIES}>Movies</option>
          <option value={Category.SPORT}>Sport</option>
          <option value={Category.TRAVEL}>Travel</option>
          <option value={Category.VACATION}>Vacation</option>
        </select>

        <button type="submit">Fetch Coupons</button>
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

export default GetCustomerCouponsByCategory;
