import { useDispatch } from "react-redux";
import "./UpdateCoupon.css";
import { useNavigate, useParams } from "react-router-dom";
import { CouponModel, customerModel } from "../../../../Models/Admin";
import { useState } from "react";
import store from "../../../Redux/store";
import Zod from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import couponWebApiService from "../../../../Services/CouponsWebApiService";
import notifyService from "../../../../Services/NotificationService";
import { updatedCouponAction } from "../../../Redux/CouponAppState";

function UpdateCoupon(): JSX.Element {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const id = +(params.id || 0);
    const [obj] = useState<CouponModel>(store.getState().couponsReducer.coupons.filter(c=>c.id===id)[0])
    console.log(obj);
   

  //  const defaultValuesObj = { ...obj, when: moment(obj.when).format("DD/MM/YY hh:mm") }; //Spread Operator
    const defaultValuesObj = { ...obj }; //Spread Operator
    const couponModelSchema = Zod.object({
    category: Zod.string().nonempty("Please enter a valid category"),
        title: Zod.string().nonempty("Please enter a valid title"),
        description: Zod.string().nonempty("Please enter a valid description"),
        startDate: Zod.date(),
        endDate: Zod.date(),
        amount: Zod.number().min(0, "Amount must be non-negative"),
        price: Zod.number().min(0, "Price must be non-negative"),
        image: Zod.string().nonempty("Please enter a valid image URL"),
        company: Zod.object({
          id: Zod.number(),
          name: Zod.string().nonempty("Please enter a valid company name"),
          email: Zod.string().email().nonempty("Please enter a correct email address for the company"),
        }),
        customers: Zod.array(
          Zod.object({
            id: Zod.number(),
            firstName: Zod.string().nonempty("Please enter a valid first name for the customer"),
            lastName: Zod.string().nonempty("Please enter a valid last name for the customer"),
            email: Zod.string().email().nonempty("Please enter a correct email address for the customer"),
          })
        ),
      });

      const { register, handleSubmit, control, formState: { errors, isValid, isSubmitting } } =
        useForm<CouponModel>({ defaultValues: defaultValuesObj, mode: "all", resolver: zodResolver(couponModelSchema) });

        const onSubmit: SubmitHandler<CouponModel> = (data: CouponModel) => {

            return couponWebApiService.updateCoupon(id, data)
                .then(res => {
                    notifyService.success("customer is updated!")
                    dispatch(updatedCouponAction(res.data));
                    navigate("/coupons");
                })
                .catch(err => notifyService.error(err))
    
        };


    return (
        <div className="UpdateCoupon">
			<h1>Updated Coupon</h1>

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

      {/* Add fields for company and customers here - to understand what I do with them */}

      <button>ADD</button>
    </form>
            
        </div>
    );
}

export default UpdateCoupon;
