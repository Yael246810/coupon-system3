import { useNavigate } from "react-router-dom";
import "./AddCoupon.css";
import { useDispatch, useSelector } from "react-redux";
import Zod, { number, string } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Category, CouponModel } from "../../../../Models/Admin";
import { zodResolver } from "@hookform/resolvers/zod";
import couponWebApiService from "../../../../Services/CouponsWebApiService";
import notifyService from "../../../../Services/NotificationService";
import { addedCouponAction, couponsReducer } from "../../../Redux/CouponAppState";
import { CouponCompany } from "../../../../Models/CouponCompany";

interface AddCouponProps{
    couponCompany: CouponCompany;
  }

function AddCoupon(): JSX.Element {

    const navigate = useNavigate();
  const dispatch = useDispatch();


  const couponCompanyModelSchema = Zod.object({


    coupon: Zod.object({

      title: Zod.string().nonempty("Please enter a valid title").max(40),
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

  price: Zod
    .string()
    .nonempty("this field is required")
    .transform((price) => parseFloat(price))
    .refine((value) => value > 0, {
      message: "price must be positive",
    }),

image: Zod.string().nonempty("this field is required")
}),

    company: Zod.object({
      name: Zod.string().nonempty("Please enter a valid name"),
    email: Zod.string().email().nonempty("Please enter a correct email address"),
    password: Zod.string().min(4,"Password must contain at least 4 characters"),
    id: Zod.string()
  .nonempty("must enter an id")
  .transform((id) => parseInt(id))
  .refine((value) => Number.isInteger(value) && value > 0, {
    message: "id must be positive",
  }),
      })

      });


      const { register, handleSubmit, formState: { errors, isValid, isSubmitting } }
= useForm<CouponCompany>({ mode: "all", resolver: zodResolver(couponCompanyModelSchema) });

const onSubmit: SubmitHandler<CouponCompany> = (data: CouponCompany) => {
  console.log('Submitted Data:', data); // Check the entire data object

  couponWebApiService.addCoupon(data)
      .then(res => {
          notifyService.success('the coupon is added');
          console.log("I am adding a coupon 3");
          dispatch(addedCouponAction(res.data));
          
          // navigate("/companies/:id/coupons");
          navigate(`/companies/${props.couponCompany.company.id}/coupons`);
          console.log("I am adding a coupon 4");
      })
      .catch(err => notifyService.error(err));
};

    return (
        <div className="AddCoupon">
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

     {errors?.coupon?.title ? <span>{errors.coupon.title.message}</span> : <label htmlFor="title">Title</label>}
      <input {...register("coupon.title")} type="text" placeholder="Title" />

      {errors?.coupon?.description ? <span>{errors.coupon.description.message}</span> : <label htmlFor="description">Description</label>}
      <input {...register("coupon.description")} type="text" placeholder="Description" />

      {errors?.coupon?.startDate ? <span>{errors.coupon.startDate.message}</span> : <label htmlFor="startDate">Start Date</label>}
      <input {...register("coupon.startDate")} type="datetime-local" />

      {errors?.coupon?.endDate ? <span>{errors.coupon.endDate.message}</span> : <label htmlFor="endDate">End Date</label>}
      <input {...register("coupon.endDate")} type="datetime-local" />

      {errors?.coupon?.amount ? <span>{errors.coupon.amount.message}</span> : <label htmlFor="amount">Amount</label>}
      <input {...register("coupon.amount")} type="number" placeholder="Amount" />

      {errors?.coupon?.price ? <span>{errors.coupon.price.message}</span> : <label htmlFor="price">Price</label>}
      <input {...register("coupon.price")} type="number" placeholder="Price" />

      {errors?.coupon?.image ? <span>{errors.coupon?.image.message}</span> : <label htmlFor="image">Image</label>}
      <input {...register("coupon.image")} type="text" placeholder="Image URL" />

      {errors?.company?.id ? <span>{errors.company?.id.message}</span> : <label htmlFor="id">Id</label>}
      <input {...register("company.id")} type="number" placeholder="Id" />

      {errors?.company?.name ? <span>{errors.company?.name.message}</span> : <label htmlFor="name">Name</label>}
      <input {...register("company.name")} type="text" placeholder="Name" />

      {errors?.company?.email ? <span>{errors.company?.email.message}</span> : <label htmlFor="email">Email</label>}
      <input {...register("company.email")} type="text" placeholder="Email" />

      {errors?.company?.password ? <span>{errors.company?.password.message}</span> : <label htmlFor="password">Password</label>}
      <input {...register("company.password")} type="text" placeholder="Password" />      

      <button type="submit">ADD</button>
    </form>
        </div>
    );
}

export default AddCoupon;
