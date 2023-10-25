import { useNavigate, useParams } from "react-router-dom";
import "./AddCoupon.css";
import { useDispatch } from "react-redux";
import Zod from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Category } from "../../../../Models/Admin";
import { zodResolver } from "@hookform/resolvers/zod";
import couponWebApiService from "../../../../Services/CouponsWebApiService";
import notifyService from "../../../../Services/NotificationService";
import {
} from "../../../Redux/CouponAppState";
import { CouponCompany } from "../../../../Models/CouponCompany";
import store from "../../../Redux/store";

interface AddCouponProps {
  couponCompany: CouponCompany;
}

function AddCoupon(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const companyId = store.getState().user.id;

  const couponCompanyModelSchema = Zod.object({
    coupon: Zod.object({
      title: Zod.string().nonempty("Please enter a valid title").max(40),
      category: Zod.enum([
        "FOOD",
        "ELECTRICS",
        "CLOTHING",
        "GAMES",
        "HEALTH",
        "HOME",
        "MOVIES",
        "SPORT",
        "TRAVEL",
        "VACATION",
      ]),
      description: Zod.string().nonempty("Please enter a valid description"),
      startDate: Zod.string().transform((dateString, ctx) => {
        const date = new Date(dateString);
        if (!Zod.date().safeParse(date).success) {
          ctx.addIssue({
            code: Zod.ZodIssueCode.invalid_date,
          });
        }
        return date;
      }),
      endDate: Zod.string().transform((dateString, ctx) => {
        const date = new Date(dateString);
        if (!Zod.date().safeParse(date).success) {
          ctx.addIssue({
            code: Zod.ZodIssueCode.invalid_date,
          });
        }
        return date;
      }),
      amount: Zod.string()
        .nonempty("must enter an amount")
        .transform((amount) => parseInt(amount))
        .refine((value) => Number.isInteger(value) && value > 0, {
          message: "amount must be positive",
        }),

      price: Zod.string()
        .nonempty("this field is required")
        .transform((price) => parseFloat(price))
        .refine((value) => value > 0, {
          message: "price must be positive",
        }),

      image: Zod.string().nonempty("this field is required"),
    }),

    company: Zod.object({
      id: Zod.string(),
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CouponCompany>({
    mode: "all",
    resolver: zodResolver(couponCompanyModelSchema),
  });

  const onSubmit: SubmitHandler<CouponCompany> = (data: CouponCompany) => {
    couponWebApiService
      .addCoupon(data)
      .then((res) => {
        notifyService.success("the coupon is added");
        // dispatch(addedCouponAction(res.data));
        navigate(`/companies/coupons`);
      })
      .catch((err) => notifyService.error(err));
  };

  return (
    <div className="AddCoupon">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="category">Category</label>
        <select {...register("coupon.category")}>
          <option value={Category.FOOD}>Food</option>
          <option value={Category.ELECTRICS}>Electronics</option>
          <option value={Category.CLOTHING}>Clothing</option>
          <option value={Category.GAMES}>Games</option>
          <option value={Category.HEALTH}>Health</option>
          <option value={Category.HOME}>Home</option>
          <option value={Category.MOVIES}>Movies</option>
          <option value={Category.SPORT}>Sport</option>
          <option value={Category.TRAVEL}>Travel</option>
          <option value={Category.VACATION}>Vacation</option>
        </select>

        <label htmlFor="title">Title</label>
        <input {...register("coupon.title")} type="text" placeholder="Title" />
        {errors?.coupon?.title && (
          <span className="error-message">{errors.coupon.title.message}</span>
        )}

        <label htmlFor="description">Description</label>
        <input
          {...register("coupon.description")}
          type="text"
          placeholder="Description"
        />
        {errors?.coupon?.description && (
          <span className="error-message">
            {errors.coupon.description.message}
          </span>
        )}

        <label htmlFor="startDate">Start Date</label>
        <input {...register("coupon.startDate")} type="datetime-local" />
        {errors?.coupon?.startDate && (
          <span className="error-message">
            {errors.coupon.startDate.message}
          </span>
        )}

        <label htmlFor="endDate">End Date</label>
        <input {...register("coupon.endDate")} type="datetime-local" />
        {errors?.coupon?.endDate && (
          <span className="error-message">{errors.coupon.endDate.message}</span>
        )}

        <label htmlFor="amount">Amount</label>
        <input
          {...register("coupon.amount")}
          type="number"
          placeholder="Amount"
        />
        {errors?.coupon?.amount && (
          <span className="error-message">{errors.coupon.amount.message}</span>
        )}

        <label htmlFor="price">Price</label>
        <input
          {...register("coupon.price")}
          type="number"
          placeholder="Price"
        />
        {errors?.coupon?.price && (
          <span className="error-message">{errors.coupon.price.message}</span>
        )}

        <label htmlFor="image">Image</label>
        <input
          {...register("coupon.image")}
          type="text"
          placeholder="Image URL"
        />
        {errors?.coupon?.image && (
          <span className="error-message">{errors.coupon.image.message}</span>
        )}

        <input type="hidden" {...register("company.id")} value={companyId} />

        <button type="submit">ADD</button>
      </form>
    </div>
  );
}

export default AddCoupon;
