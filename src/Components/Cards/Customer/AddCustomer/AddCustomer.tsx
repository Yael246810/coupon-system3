import "./AddCustomer.css";
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { CustomerModel } from "../../../../Models/Admin";
import notifyService from "../../../../Services/NotificationService";
import { addedCustomerAction } from "../../../Redux/customerAppState";
import { useDispatch } from "react-redux";
import webApiService from "../../../../Services/WebApiService";

function AddCustomer() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

const couponSchema = zod.object({
    // id: zod.number(),
    category: zod.string(),
    title: zod.string(),
    description: zod.string(),
    startDate: zod.date(),
    endDate: zod.date(),
    amount: zod.number(),
    price: zod.number(),
    image: zod.string(),
});

const customersModelSchema = zod.object({
    // id: zod.number(),
    firstName: zod.string().nonempty("Please enter a valid first name"),
    lastName: zod.string().nonempty("Please enter a valid last name"),
    email: zod.string().email().nonempty("Please enter a correct email address"),
    password: zod.string().min(4,"Password must contain at least 4 characters"),
    coupons: zod.array(couponSchema).refine((coupons) => {
        return coupons.every(coupon => coupon.amount >= 0);
    }, { message: "Coupon amount must be non-negative for all coupons" }),
});


const { register, handleSubmit, formState: { errors, isValid, isSubmitting } }
= useForm<CustomerModel>({ mode: "all", resolver: zodResolver(customersModelSchema) });


const onSubmit: SubmitHandler<CustomerModel> = (data: CustomerModel) => {

    return webApiService.addCustomer(data)
        .then(res => {
            notifyService.success('the customer is added');
            dispatch(addedCustomerAction(res.data));
            navigate("/customers");
        })
        .catch(err => notifyService.error(err))

};

    return (
        <div className="AddCustomer">
            <h1>Add a new customer</h1>

            <form onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}>

                {errors?.firstName ? <span>{errors.firstName.message}</span> : <label htmlFor="firstName">First Name</label>}
                <input {...register("firstName")} type="text" placeholder="FirstName" />
                
                {errors?.lastName ? <span>{errors.lastName.message}</span> : <label htmlFor="lastName">Last Name</label>}
                <input {...register("lastName")} type="text" placeholder="LastName" />
                
                {errors?.email ? <span>{errors.email.message}</span> : <label htmlFor="email">Email</label>}
                <input {...register("email")} type="text" placeholder="Email" />
                
                {errors?.password ? <span>{errors.password.message}</span> : <label htmlFor="password">Password</label>}
                <input {...register("password")} type="password" placeholder="Password" />
                
                <input
                    {...register("coupons", {
                        validate: {
                            positive: validatePositive,
                            zod: (value) => zod.number().positive().safeParse(parseInt(value)).success,
                        },
                    })}
                    type="number"
                    placeholder="coupons"
                />
                {errors.coupons?.type === "positive" && <p>{errors.coupons.message}</p>}
                {errors.coupons?.type === "zod" && <p>Value must be positive</p>}
                /*I should find a way to use it */
                {/* <button disabled={isSubmitting || !isValid}>ADD</button> */} 
                <button>ADD</button>
            </form>
        </div>
    );
}

export default AddCustomer;

function validatePositive(value: any, formValues: FieldValues): ValidateResult | Promise<ValidateResult> {
    const parsedValue = parseInt(value);
    if (parsedValue < 0) {
        return "Value must be non-negative";
    }
    return true;
}
