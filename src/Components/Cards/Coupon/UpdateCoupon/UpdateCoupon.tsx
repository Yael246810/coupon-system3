import { useDispatch } from "react-redux";
import "./UpdateCoupon.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import store from "../../../Redux/store";
import Zod from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import couponWebApiService from "../../../../Services/CouponsWebApiService";
import notifyService from "../../../../Services/NotificationService";
import { updatedCouponAction } from "../../../Redux/CouponAppState";
import { Category, CompanyModel, CouponModel } from "../../../../Models/Admin";
import { CouponCompany } from "../../../../Models/CouponCompany";
import { Coupon } from "../../../../Models/CompaniesModel";
import { companiesReducer } from "../../../Redux/CompanyAppState";

function UpdateCoupon(): JSX.Element {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const id = +(params.id || 0);
    console.log("params: " + params);
    // const [obj, setObj] = useState<CouponModel>(store.getState().couponsReducer.coupons.filter(c=>c.id===id)[0])
    // const [obj, setObj] = useState<CompanyModel>(store.getState().companies.companies.filter(c=>c.id===id)[0])
    // console.log("obj: "+obj);
   

  //  const defaultValuesObj = { ...obj, when: moment(obj.when).format("DD/MM/YY hh:mm") }; //Spread Operator
    // const defaultValuesObj = { ...obj }; //Spread Operator
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
  
    //   company: Zod.object({
    //     name: Zod.string().nonempty("Please enter a valid name"),
    //   email: Zod.string().email().nonempty("Please enter a correct email address"),
    //   password: Zod.string().min(4,"Password must contain at least 4 characters"),
    //   id: Zod.string()
    // .nonempty("must enter an id")
    // .transform((id) => parseInt(id))
    // .refine((value) => Number.isInteger(value) && value > 0, {
    //   message: "id must be positive",
    // }),
    //     })
  
  
      // category: Zod.enum([
      //   "FOOD",
      //   "HEALTH",
      //   "SPORT",
      //   "ELECTRONICS",
      //   "CLOTHING",
      //   "HOME",
      //   "MOVIES",
      //   "TRAVEL",
      //   "GAMES",
      //   "VACATION",
      // ]),
      
  
  
        });

    
      console.log("11");

      const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } =
        useForm<CouponCompany>({ mode: "all", resolver: zodResolver(couponCompanyModelSchema) });

        const onSubmit: SubmitHandler<CouponCompany> = (data: CouponCompany) => {

          console.log('Submitted Data:', data); 
          data.coupon.id = id;
          data.coupon.category = Category.ELECTRONICS;
          console.log("id: "+id);

            return couponWebApiService.updateCoupon(data)
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
            {/* <label htmlFor="category">Category</label>
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
                </select> */}

      {errors?.coupon?.title ? <span>{errors?.coupon.title.message}</span> : <label htmlFor="title">Title</label>}
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

      {errors?.coupon?.image ? <span>{errors.coupon.image.message}</span> : <label htmlFor="image">Image</label>}
      <input {...register("coupon.image")} type="text" placeholder="Image URL" />

      <button>Update</button>
    </form>
            
        </div>
    );
}

export default UpdateCoupon;
