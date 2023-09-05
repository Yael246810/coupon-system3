import { useNavigate } from "react-router-dom";
import "./AddCoupon.css";
import { useDispatch } from "react-redux";
import Zod, { number, string } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Category, CouponModel } from "../../../../Models/Admin";
import { zodResolver } from "@hookform/resolvers/zod";
import couponWebApiService from "../../../../Services/CouponsWebApiService";
import notifyService from "../../../../Services/NotificationService";
import { addedCouponAction } from "../../../Redux/CouponAppState";
import { CompaniesModel } from "../../../../Models/CompaniesModel";
import { CouponCompany } from "../../../../Models/CouponCompany";

interface AddCouponProps{
    couponCompany: CouponCompany;
  }

function AddCoupon(props:CouponCompany): JSX.Element {

    const navigate = useNavigate();

    const dispatch = useDispatch();

// the data needs to be coupon and a company

    const couponCompanyModelSchema = Zod.object({
        category: Zod.enum(Object.values(Category)),
        title: Zod.string().nonempty("Please enter a valid title"),
        description: Zod.string().nonempty("Please enter a valid description"),
        startDate: Zod.string().transform((dateString, ctx) => {
          const date = new Date(dateString);
          if (!Zod.date().safeParse(date).success) {
              ctx.addIssue({
                  code: Zod.ZodIssueCode.invalid_date,
              })
          }
          return date;
      }),
      endDate: Zod.string().transform((dateString, ctx) => {
        const date = new Date(dateString);
        if (!Zod.date().safeParse(date).success) {
            ctx.addIssue({
                code: Zod.ZodIssueCode.invalid_date,
            })
        }
        return date;
    }),
    amount: Zod.string().transform((amountString, ctx) => {
      const numericAmount = parseFloat(amountString);
      if (isNaN(numericAmount)) {
          ctx.addIssue({
              code: Zod.ZodIssueCode.invalid_arguments,
              argumentsError: "Amount is not a valid number",
          });
      }
      console.log("I am adding a coupon");
      return numericAmount;
  }),
  
  price: Zod.string().transform((priceString, ctx) => {
    const numericPrice = parseFloat(priceString);
    if (isNaN(numericPrice)) {
        ctx.addIssue({
            code: Zod.ZodIssueCode.invalid_arguments,
            argumentsError: "Amount is not a valid number",
        });
    }
    console.log("I am adding a coupon 1");
    return numericPrice;
}),

name: Zod.string().nonempty("Please enter a valid name"),
    email: Zod.string().email().nonempty("Please enter a correct email address"),
    password: Zod.string().min(4,"Password must contain at least 4 characters"),
      
      });


      const { register, handleSubmit, formState: { errors, isValid, isSubmitting } }
= useForm<CouponCompany>({ mode: "all", resolver: zodResolver(couponCompanyModelSchema) });

console.log("I am adding a coupon 2");

const onSubmit: SubmitHandler<CouponCompany> = (data: CouponCompany) => {
console.log('button click');
console.log(data);
     couponWebApiService.addCoupon(data)
        .then(res => {
            notifyService.success('the coupon is added');
            console.log("I am adding a coupon 3");
            dispatch(addedCouponAction(res.data));
            navigate("/companies/:id/coupons");
            console.log("I am adding a coupon 4");
        })
        .catch(err => notifyService.error(err))

};
console.log(`category: ${Category}`)
    return (
        <div className="AddCoupon">
			<form onSubmit={handleSubmit(onSubmit)}>
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

      {errors?.title ? <span>{errors.title.message}</span> : <label htmlFor="title">Title</label>}
      <input {...register("title")} type="text" placeholder="Title" />

      {errors?.description ? <span>{errors.description.message}</span> : <label htmlFor="description">Description</label>}
      <input {...register("description")} type="text" placeholder="Description" />

      {errors?.startDate ? <span>{errors.startDate.message}</span> : <label htmlFor="startDate">Start Date</label>}
      <input {...register("startDate")} type="datetime-local" />

      {errors?.endDate ? <span>{errors.endDate.message}</span> : <label htmlFor="endDate">End Date</label>}
      <input {...register("endDate")} type="datetime-local" />

      {errors?.amount ? <span>{errors.amount.message}</span> : <label htmlFor="amount">Amount</label>}
      <input {...register("amount")} type="number" placeholder="Amount" />

      {errors?.price ? <span>{errors.price.message}</span> : <label htmlFor="price">Price</label>}
      <input {...register("price")} type="number" placeholder="Price" />

      {errors?.image ? <span>{errors.image.message}</span> : <label htmlFor="image">Image</label>}
      <input {...register("image")} type="text" placeholder="Image URL" />

      

      <button>ADD</button>
    </form>
        </div>
    );
}

export default AddCoupon;
