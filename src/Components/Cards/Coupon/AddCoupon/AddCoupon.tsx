import { useNavigate } from "react-router-dom";
import "./AddCoupon.css";
import { useDispatch } from "react-redux";
import Zod from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { CouponModel } from "../../../../Models/Admin";
import { zodResolver } from "@hookform/resolvers/zod";
import couponWebApiService from "../../../../Services/CouponsWebApiService";
import notifyService from "../../../../Services/NotificationService";
import { addedCouponAction } from "../../../Redux/CouponAppState";

function AddCoupon(): JSX.Element {

    const navigate = useNavigate();

    const dispatch = useDispatch();

// the data needs to be coupon and a company

    const couponCompanyModelSchema = Zod.object({
        //id: Zod.number(),
        category: Zod.string().nonempty("Please enter a valid category"),
        title: Zod.string().nonempty("Please enter a valid title"),
        description: Zod.string().nonempty("Please enter a valid description"),
        startDate: Zod.date(),
        endDate: Zod.date(),
        amount: Zod.number().min(0, "Amount must be non-negative"),
        price: Zod.number().min(0, "Price must be non-negative"),
        image: Zod.string().nonempty("Please enter a valid image URL"),
        company: Zod.object({ // this is the company details. I can do it automatically, 
          //that it will be added to the company that made login. I need to pass the company to the function 
          id: Zod.number(),
          name: Zod.string().nonempty("Please enter a valid company name"),
          email: Zod.string().email().nonempty("Please enter a correct email address for the company"),
        }),
        // customers: Zod.array(
        //   Zod.object({
        //     id: Zod.number(),
        //     firstName: Zod.string().nonempty("Please enter a valid first name for the customer"),
        //     lastName: Zod.string().nonempty("Please enter a valid last name for the customer"),
        //     email: Zod.string().email().nonempty("Please enter a correct email address for the customer"),
        //   })
        // ),
        companies: Zod.object({
          name: Zod.string().nonempty("Please enter a valid name"),
          email: Zod.string().email().nonempty("Please enter a correct email address"),
          password: Zod.string().min(4,"Password must contain at least 4 characters"),
      })
      });
      const { register, handleSubmit, formState: { errors, isValid, isSubmitting } }
= useForm<CouponModel>({ mode: "all", resolver: zodResolver(couponCompanyModelSchema) });


const onSubmit: SubmitHandler<CouponModel> = (data: CouponModel) => {
console.log('button click');
console.log(data);
     couponWebApiService.addCoupon(data)
        .then(res => {
            notifyService.success('the coupon is added');
            dispatch(addedCouponAction(res.data));
            navigate("/coupons");
        })
        .catch(err => notifyService.error(err))

};

    return (
        <div className="AddCoupon">
			<form onSubmit={handleSubmit(onSubmit)}>
      {errors?.category ? <span>{errors.category.message}</span> : <label htmlFor="category">Category</label>}
      <input {...register("category")} type="text" placeholder="Category" />

      {errors?.title ? <span>{errors.title.message}</span> : <label htmlFor="title">Title</label>}
      <input {...register("title")} type="text" placeholder="Title" />

      {errors?.description ? <span>{errors.description.message}</span> : <label htmlFor="description">Description</label>}
      <input {...register("description")} type="text" placeholder="Description" />

      {errors?.startDate ? <span>{errors.startDate.message}</span> : <label htmlFor="startDate">Start Date</label>}
      <input {...register("startDate")} type="date" />

      {errors?.endDate ? <span>{errors.endDate.message}</span> : <label htmlFor="endDate">End Date</label>}
      <input {...register("endDate")} type="date" />

      {errors?.amount ? <span>{errors.amount.message}</span> : <label htmlFor="amount">Amount</label>}
      <input {...register("amount")} type="number" placeholder="Amount" />

      {errors?.price ? <span>{errors.price.message}</span> : <label htmlFor="price">Price</label>}
      <input {...register("price")} type="number" placeholder="Price" />

      {errors?.image ? <span>{errors.image.message}</span> : <label htmlFor="image">Image</label>}
      <input {...register("image")} type="text" placeholder="Image URL" />

      {errors?.name ? <span>{errors.name.message}</span> : <label htmlFor="name">Name</label>}
    <input {...register("name")} type="text" placeholder="name" />
    
    {errors?.email ? <span>{errors.email.message}</span> : <label htmlFor="email">Email</label>}
    <input {...register("email")} type="text" placeholder="Email" />
    
    {errors?.password ? <span>{errors.password.message}</span> : <label htmlFor="password">Password</label>}
    <input {...register("password")} type="password" placeholder="Password" />

      <button>ADD</button>
    </form>
        </div>
    );
}

export default AddCoupon;
