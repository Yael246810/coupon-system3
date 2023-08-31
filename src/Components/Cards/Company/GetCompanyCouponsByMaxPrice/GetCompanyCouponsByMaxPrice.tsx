import { useDispatch } from "react-redux";
import "./GetCompanyCouponsByMaxPrice.css"; // Update the CSS file
import companyWebApiService from "../../../../Services/CompanyWebApiService";
import notifyService from "../../../../Services/NotificationService";
import { useForm } from "react-hook-form";
import { CouponModel } from "../../../../Models/Admin"; // Update the import
import { useState } from "react";
import { getCompanyCouponsByMaxPriceAction } from "../../../Redux/CompanyAppState";

function GetCompanyCouponsByMaxPrice(): JSX.Element {
    const dispatch = useDispatch();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const [fetchedCoupons, setFetchedCoupons] = useState<CouponModel[] | null>(null);

    const onSubmit = (data: { id: string; maxPrice: string }) => {
        const numericId = parseInt(data.id);
        const numericMaxPrice = parseFloat(data.maxPrice);

        if (!isNaN(numericId) && !isNaN(numericMaxPrice)) {
            console.log("Im going to get the company coupons by price")
            companyWebApiService
                .getCompanyCouponsByMaxPrice(numericId, numericMaxPrice)
                .then((res) => {
                    notifyService.success(`Fetched coupons for company #${numericId} with max price ${numericMaxPrice}`);
                    
                    // Dispatch the appropriate action for fetching coupons
                    dispatch(getCompanyCouponsByMaxPriceAction(res.data));
                    console.log("I got the company coupons by price")
                    // Set the fetched coupons in the state
                    setFetchedCoupons(res.data);
                })
                .catch((err: any) => notifyService.error(err));
        } else {
            notifyService.error("Please enter valid company ID and max price");
        }
    };

    return (
        <div className="GetCompanyCouponsByMaxPrice">
            <h2>Get Company Coupons by Max Price</h2>
            <form className="CompanyForm" onSubmit={handleSubmit(onSubmit)}>
            {errors?.id ? (
                    <span>{errors.id.message}</span>
                ) : (
                    <>
                        <label htmlFor="id">Id</label>
                        <input {...register("id")} type="number" placeholder="Id" />

                        <label htmlFor="maxPrice">Max Price</label>
                        <input {...register("maxPrice")} type="number" placeholder="Max Price" />
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

export default GetCompanyCouponsByMaxPrice;


