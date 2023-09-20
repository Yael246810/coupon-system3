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

interface PurchaseCouponProps {
  couponId: string;
  customerId: string;
}

function PurchaseCoupon(props: PurchaseCouponProps): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const purchaseCouponModelSchema = Zod.object({
    couponId: Zod.string(),
    customerId: Zod.string(),
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
    const customerId = Number(data.customerId);

    if (isNaN(couponId)) {
      notifyService.error("Invalid coupon ID. Please enter a valid number.");
    } else if (isNaN(customerId))
      notifyService.error("Invalid customer ID. Please enter a valid number.");
    else {
      customerWebApiService
        .PurchaseCoupon(couponId, customerId)
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
        <input {...register("couponId")} type="text" placeholder="couponId" />
        <input
          {...register("customerId")}
          type="text"
          placeholder="customerId"
        />
        <button>Purchase</button>
      </form>
    </div>
  );
}
export default PurchaseCoupon;
