import "./UpdateCoupon.css";
import { useNavigate, useParams } from "react-router-dom";
import Zod from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import couponWebApiService from "../../../../Services/CouponsWebApiService";
import notifyService from "../../../../Services/NotificationService";
import { CouponCompany } from "../../../../Models/CouponCompany";
import store from "../../../Redux/store";
import { Category } from "../../../../Models/Admin";

function UpdateCoupon(): JSX.Element {
  const navigate = useNavigate();
  const params = useParams();
  const id = +(params.id || 0);
  const companyId = +(params.companyId || 0);
  const coupon = store
    .getState()
    .companies.companies[0].coupons?.find((c) => c.id === id);

  const company: CouponCompany = {
    coupon: coupon,
  };

  const couponCompanyModelSchema = Zod.object({
    coupon: Zod.object({
      title: Zod.string().nonempty("Please enter a valid title").max(20),
      category: Zod.enum([
        "FOOD",
        "ELECTRONICS",
        "CLOTHING",
        "GAMES",
        "HEALTH",
        "HOME",
        "MOVIES",
        "SPORT",
        "TRAVEL",
        "VACATION",
      ]),
      description: Zod.string().nonempty("Please enter a valid description").max(40),
      startDate: Zod.string().transform((startDateString, ctx) => {
        const date = new Date(startDateString);
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
     
      amount: Zod.union([
        Zod.string()
          .nonempty("must enter an amount")
          .transform((amount) => parseInt(amount, 10))
          .refine((value) => !isNaN(value) && value > 0, {
            message: "amount must be a positive number",
          }),
        Zod.number()
          .refine((value) => value > 0, {
            message: "amount must be a positive number",
          }),
      ]),

      price: Zod.union([
        Zod.string()
          .nonempty("this field is required")
          .transform((price) => parseFloat(price))
          .refine((value) => !isNaN(value) && value > 0, {
            message: "price must be a positive number",
          }),
        Zod.number()
          .refine((value) => value > 0, {
            message: "price must be a positive number",
          }),
      ]),

      image: Zod.string().nonempty("this field is required"),
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CouponCompany>({
    mode: "all",
    defaultValues: company,
    resolver: zodResolver(couponCompanyModelSchema),
  });

  const onSubmit: SubmitHandler<CouponCompany> = (data: CouponCompany) => {
    data.company = {
      id: companyId,
    };

    data.coupon.id = id;

    return couponWebApiService
      .updateCoupon(data)
      .then((res) => {
        notifyService.success("coupon is updated!");
        navigate("/companies/coupons");
      })
      .catch((err) => notifyService.error(err));
  };

  return (
    <div className="UpdateCoupon">
      <h1>Updated Coupon</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="category">Category</label>
        <select {...register("coupon.category")}>
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

        {errors?.coupon?.title ? (
          <span className="error-message">{errors.coupon.title.message}</span>
        ) : (
          <label htmlFor="title">Title</label>
        )}
        <input {...register("coupon.title")} type="text" placeholder="Title" />

        {errors?.coupon?.description ? (
          <span className="error-message">{errors.coupon.description.message}</span>
        ) : (
          <label htmlFor="description">Description</label>
        )}
        <input
          {...register("coupon.description")}
          type="text"
          placeholder="Description"
        />

        {errors?.coupon?.startDate ? (
          <span className="error-message">{errors.coupon.startDate.message}</span>
        ) : (
          <label htmlFor="startDate">Start Date</label>
        )}
        <input {...register("coupon.startDate")} type="date" />

        {errors?.coupon?.endDate ? (
          <span className="error-message">{errors.coupon.endDate.message}</span>
        ) : (
          <label htmlFor="endDate">End Date</label>
        )}
        <input {...register("coupon.endDate")} type="date" />

        {errors?.coupon?.amount ? (
          <span className="error-message">{errors.coupon.amount.message}</span>
        ) : (
          <label htmlFor="amount">Amount</label>
        )}
        <input
          {...register("coupon.amount")}
          type="number"
          placeholder="Amount"
        />

        {errors?.coupon?.price ? (
          <span className="error-message">{errors.coupon.price.message}</span>
        ) : (
          <label htmlFor="price">Price</label>
        )}
        <input
          {...register("coupon.price")}
          type="number"
          placeholder="Price"
        />

        {errors?.coupon?.image ? (
          <span className="error-message">{errors.coupon.image.message}</span>
        ) : (
          <label htmlFor="image">Image</label>
        )}
        <input
          {...register("coupon.image")}
          type="text"
          placeholder="Image URL"
        />

        <button>Update</button>
        {/* <button disabled={!isValid || isSubmitting}>Update</button> */}
      </form>
    </div>
  );
}

export default UpdateCoupon;