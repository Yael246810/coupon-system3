import { useDispatch } from "react-redux";
import "./GetCompanyCouponsByCategory.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { CouponModel } from "../../../../Models/Admin";
import companyWebApiService from "../../../../Services/CompanyWebApiService";
import { getCompanyCouponsByCategoryAction } from "../../../Redux/CompanyAppState";
import notifyService from "../../../../Services/NotificationService";
import { Category } from "../../../../Models/Admin";
import store from "../../../Redux/store";
import CouponCard from "../../Coupon/CouponCard/CouponCard";

function GetCompanyCouponsByCategory(): JSX.Element {
  const dispatch = useDispatch();
  const companyId = store.getState().user.id;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [fetchedCoupons, setFetchedCoupons] = useState<CouponModel[] | null>(
    null
  );

  const onSubmit = (data: { id: string; category: Category }) => {
    companyWebApiService
    .getCompanyCouponsByCategory(companyId, data.category)
    .then((res) => {
      notifyService.success(
        `Fetched company #${companyId} coupons by category`
      );
      dispatch(getCompanyCouponsByCategoryAction(res.data));
      setFetchedCoupons(res.data);
    })
    .catch((err) => notifyService.error(err));
  };

  return (
    <div className="GetCompanyCouponsByCategory">
      <h1>Company Coupons by Category</h1>
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
              customerId={companyId}
              isCompanyConnected={true}
              companyId={companyId}
            />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default GetCompanyCouponsByCategory;
