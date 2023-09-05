import { useDispatch } from "react-redux";
import "./UpdateCoupon.css";
import { useNavigate, useParams } from "react-router-dom";
import { CouponModel, CouponNoCompanyOrCustomerModel } from "../../../../Models/Admin";
import { useState } from "react";
import store from "../../../Redux/store";
import Zod from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import couponWebApiService from "../../../../Services/CouponsWebApiService";
import notifyService from "../../../../Services/NotificationService";
import { updatedCouponAction } from "../../../Redux/CouponAppState";
import { Category } from "../../../../Models/Admin";

function UpdateCoupon(): JSX.Element {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const id = +(params.id || 0);
    const [obj, setObj] = useState<CouponModel>(store.getState().couponsReducer.coupons.filter(c=>c.id===id)[0])
    console.log("obj: "+obj);
   

  //  const defaultValuesObj = { ...obj, when: moment(obj.when).format("DD/MM/YY hh:mm") }; //Spread Operator
    const defaultValuesObj = { ...obj }; //Spread Operator
    const couponModelSchema = Zod.object({
      category: Zod.enum([
        "FOOD",
        "HEALTH",
        "SPORT",
        "ELECTRONICS",
        "CLOTHING",
        "HOME",
        "MOVIES",
        "TRAVEL",
        "GAMES",
        "VACATION",
      ]),
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
image: Zod.string().nonempty("this field is required"),
});


    
      console.log("11");

      const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } =
        useForm<CouponNoCompanyOrCustomerModel>({ defaultValues: defaultValuesObj, mode: "all", resolver: zodResolver(couponModelSchema) });
        console.log("22");
        console.log("id: "+id);

        const onSubmit: SubmitHandler<CouponNoCompanyOrCustomerModel> = (data: CouponNoCompanyOrCustomerModel) => {
          console.log("id: "+id);
          data.id = id;
          console.log("id: "+id);

          if (data.id === 0) {
            console.log(`Invalid ID ${data.id}`);
            
            return; // Don't proceed with the update
        }
          console.log("33");

            return couponWebApiService.updateCoupon(id, data)
                .then(res => {
                    notifyService.success("coupon is updated!")
                    dispatch(updatedCouponAction(res.data));
                    setObj(res.data)
                    console.log("new obj: "+obj);
                    navigate("/companies/:id/coupons");
                })
                .catch(err => notifyService.error(err))
    
        };

// Is it a problem that I cannot see the coupon's id when I update it??
    return (
        <div className="UpdateCoupon">
			<h1>Updated Coupon</h1>

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

      <button>Update</button>
    </form>
            
        </div>
    );
}

export default UpdateCoupon;
