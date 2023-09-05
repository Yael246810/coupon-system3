import { useNavigate } from "react-router-dom";
import "./PurchaseCoupon.css";
import { useDispatch } from "react-redux";
import { CouponModel } from "../../../../Models/Admin";
import Zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { PurchaseCouponReq } from "../../../../Models/PurchaseCouponReq"; // Fixed typo in import
import customerWebApiService from "../../../../Services/CustomerWebApiService";
import notifyService from "../../../../Services/NotificationService";
import { CustomersModel } from "../../../../Models/Customers";
import { purchaseCouponAction } from "../../../Redux/CustomerWithCouponsAppState";

interface PurchaseCouponProps {
  coupon: CouponModel;
  couponId: number;
  customer: CustomersModel;
  customerId: number;
}

function PurchaseCoupon(props: PurchaseCouponProps): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const purchaseCouponModelSchema = Zod.object({
    couponId: Zod.number(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PurchaseCouponReq>({
    mode: "all",
    resolver: zodResolver(purchaseCouponModelSchema),
  });

  const onSubmit: SubmitHandler<PurchaseCouponReq> = (data: PurchaseCouponReq) => {
    // Convert couponId and customerId to numbers
    const couponId = Number(data.couponId);
    const customerId = props.customerId;
console.log("data.couponId:", data.couponId);
console.log("couponId:", couponId);

    // Check if the conversion to numbers is successful
    if (!isNaN(couponId)) {
      customerWebApiService
        .PurchaseCoupon(couponId, customerId)
        .then((res) => {
          notifyService.success("The coupon is added for the customer");
          dispatch(purchaseCouponAction(res.data));
          navigate("/:id/coupons");
        })
        .catch((err) => notifyService.error(err));
    } else {
      notifyService.error("Invalid coupon ID. Please enter a valid number.");
    }
  };

  return (
    <div className="PurchaseCoupon">
      <h1>Purchase Coupon</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="customerId">Id</label>
        <input name="customerId" type="text" value={props.customerId} disabled={true} />

        {errors?.couponId ? (
          <span>{errors.couponId.message}</span>
        ) : (
          <label htmlFor="couponId">CouponId</label>
        )}
        <input {...register("couponId")} type="number" placeholder="CouponId" />
        

        <button>Purchase</button>
      </form>
    </div>
  );
}

export default PurchaseCoupon;
