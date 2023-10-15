import { useNavigate } from "react-router-dom";
import "./PurchaseCoupon.css";
import { useDispatch } from "react-redux";
import Zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { PurchaseCouponReq } from "../../../../Models/PurchaseCouponReq";
import customerWebApiService from "../../../../Services/CustomerWebApiService";
import notifyService from "../../../../Services/NotificationService";
import { purchaseCouponAction } from "../../../Redux/CustomerWithCouponsAppState";
import store from "../../../Redux/store";

interface PurchaseCouponProps {
  couponId: string;
  customerId: string;
}

function PurchaseCoupon(props: PurchaseCouponProps): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const customerId = store.getState().user.id;

  const purchaseCouponModelSchema = Zod.object({
    couponId: Zod.string()
      .refine((id) => id.trim() !== '', {
        message: "Coupon ID is required.",
      })
      .transform((id) => parseInt(id))
      .refine((value) => Number.isInteger(value) && value > 0, {
        message: "Coupon ID must be a positive integer.",
      })
  });
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PurchaseCouponReq>({
    mode: "all",
    resolver: zodResolver(purchaseCouponModelSchema),
  });

  const onSubmit: SubmitHandler<PurchaseCouponReq> = (
    data: PurchaseCouponReq
  ) => {
    const couponId = Number(data.couponId);

    if (isNaN(couponId)) {
      notifyService.error("Invalid coupon ID. Please enter a valid number.");
    }
    else {
      customerWebApiService
        .PurchaseCoupon(customerId, couponId)
        .then((res) => {
          notifyService.success("The coupon is added for the customer");
          dispatch(purchaseCouponAction(res.data));
          navigate("/customers/:id/coupons", {
            state: { wasCustomersDataUpdated: true },
          });
        })
        .catch((err) => notifyService.error(err));
    }
  };

  return (
    <div className="PurchaseCoupon">
      <h1>Purchase Coupon</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("couponId")}
          type="text"
          placeholder="couponId"
        />
        <button>Purchase</button>
      </form>
    </div>
  );
}
export default PurchaseCoupon;
