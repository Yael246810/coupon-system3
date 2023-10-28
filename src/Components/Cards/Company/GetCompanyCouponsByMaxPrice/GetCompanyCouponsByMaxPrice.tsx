import { useDispatch } from "react-redux";
import "./GetCompanyCouponsByMaxPrice.css"; 
import companyWebApiService from "../../../../Services/CompanyWebApiService";
import notifyService from "../../../../Services/NotificationService";
import { useForm } from "react-hook-form";
import { CouponModel } from "../../../../Models/Admin"; 
import { useState } from "react";
import { getCompanyCouponsByMaxPriceAction } from "../../../Redux/CompanyAppState";
import store from "../../../Redux/store";
import CouponCard from "../../Coupon/CouponCard/CouponCard";

function GetCompanyCouponsByMaxPrice(): JSX.Element {
    const dispatch = useDispatch();
    const companyId = store.getState().user.id;

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const [fetchedCoupons, setFetchedCoupons] = useState<CouponModel[] | null>(null);

    const onSubmit = (data: { id: string; maxPrice: string }) => {
        const numericMaxPrice = parseFloat(data.maxPrice);

        if (!isNaN(numericMaxPrice)) {
            companyWebApiService
                .getCompanyCouponsByMaxPrice(companyId, numericMaxPrice)
                .then((res) => {
                    notifyService.success(`Fetched coupons for company #${companyId} with max price ${numericMaxPrice}`);
                    console.log("$$$$ " + res.data);
                    dispatch(getCompanyCouponsByMaxPriceAction(res.data));
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

export default GetCompanyCouponsByMaxPrice;


