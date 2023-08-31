import { useDispatch } from "react-redux";
import "./GetCompanyCoupons.css";
import companyWebApiService from "../../../../Services/CompanyWebApiService";
import notifyService from "../../../../Services/NotificationService";
import { getCompanyCouponsAction } from "../../../Redux/CompanyAppState";
import { useForm } from "react-hook-form";
import { CouponModel } from "../../../../Models/Admin"; // Update the import
import { useState } from "react";

function GetCompanyCoupons(): JSX.Element {
    const dispatch = useDispatch(); 

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const [fetchedCoupons, setFetchedCoupons] = useState<CouponModel[] | null>(null);

    const onSubmit = (data: { id: string }) => {
        const numericId = parseInt(data.id);

        if (!isNaN(numericId)) {
            companyWebApiService
                .getCompanyCoupons(numericId)
                .then((res) => {
                    notifyService.success(`Fetched company #${numericId}`);
                    dispatch(getCompanyCouponsAction(res.data));
                    setFetchedCoupons(res.data); // Set the fetched coupons directly
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
            <ul>
                {fetchedCoupons.map((coupon) => (
                    <li className="CouponItem" key={coupon.id}>{coupon.title}</li> 
                    // to think if I want to show other values of the coupon
                ))}
                
            </ul>
        </div>
    )}
</div>
    );
}

export default GetCompanyCoupons;
