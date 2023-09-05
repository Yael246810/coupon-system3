import { useDispatch } from "react-redux";
import "./GetCompanyCouponsByCategory.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { CouponModel } from "../../../../Models/Admin";
import companyWebApiService from "../../../../Services/CompanyWebApiService";
import { getCompanyCouponsByCategoryAction } from "../../../Redux/CompanyAppState";
import notifyService from "../../../../Services/NotificationService";
import { Category } from "../../../../Models/Admin"; 

function GetCompanyCouponsByCategory(): JSX.Element {
    const dispatch = useDispatch();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const [fetchedCoupons, setFetchedCoupons] = useState<CouponModel[] | null>(null);

    const onSubmit = (data: { id: string; category: Category }) => {
        const numericId = parseInt(data.id);

        if (!isNaN(numericId)) {
            companyWebApiService
                .getCompanyCouponsByCategory(numericId, data.category) // Pass the selected category
                .then((res) => {
                    notifyService.success(`Fetched company #${numericId} coupons by category`);
                    dispatch(getCompanyCouponsByCategoryAction(res.data));
                    setFetchedCoupons(res.data);
                })
                .catch((err) => notifyService.error(err));
        } else {
            notifyService.error("Please enter a valid company ID");
        }
    };

    return (
        <div className="GetCompanyCouponsByCategory">
            <h1>Company Coupons by Category</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="id">Company ID</label>
                <input {...register("id")} type="number" placeholder="Company ID" />

                <label htmlFor="category">Category</label>
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
                            <li key={coupon.id}>
                                {coupon.title} - Category: {coupon.category}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default GetCompanyCouponsByCategory;
