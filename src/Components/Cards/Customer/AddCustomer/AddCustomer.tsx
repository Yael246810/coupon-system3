import "./AddCustomer.css";
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import notifyService from "../../../../Services/NotificationService";
import { addedCustomerAction } from "../../../Redux/CustomerAppState";
import { useDispatch } from "react-redux";
import webApiService from "../../../../Services/CustomerWebApiService";
import { CustomerReq } from "../../../../Models/CustomerReq";

function AddCustomer() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const customersModelSchema = zod.object({
    firstName: zod.string().nonempty("Please enter a valid first name"),
    lastName: zod.string().nonempty("Please enter a valid last name"),
    email: zod
      .string()
      .email()
      .nonempty("Please enter a correct email address"),
    password: zod
      .string()
      .min(4, "Password must contain at least 4 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CustomerReq>({
    mode: "all",
    resolver: zodResolver(customersModelSchema),
  });

  const onSubmit: SubmitHandler<CustomerReq> = (data: CustomerReq) => {
    webApiService
      .addCustomer(data)
      .then((res) => {
        notifyService.success("the customer is added");
        dispatch(addedCustomerAction(res.data));
        navigate("/admin/customers", {
          state: { wasCustomersDataUpdated: true },
        });
      })
      .catch((err) => notifyService.error(err));
  };

  return (
    <div className="AddCustomer">
      <h1>Add a new customer</h1>

      <form onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}>
        <div className="input-container">
          {errors?.firstName ? (
            <div className="error-message">{errors.firstName.message}</div>
          ) : (
            <label htmlFor="firstName">First Name</label>
          )}
          <input
            {...register("firstName")}
            type="text"
            placeholder="FirstName"
          />
        </div>

        <div className="input-container">
          {errors?.lastName ? (
            <div className="error-message">{errors.lastName.message}</div>
          ) : (
            <label htmlFor="lastName">Last Name</label>
          )}
          <input {...register("lastName")} type="text" placeholder="LastName" />
        </div>

        <div className="input-container">
          {errors?.email ? (
            <div className="error-message">{errors.email.message}</div>
          ) : (
            <label htmlFor="email">Email</label>
          )}
          <input {...register("email")} type="text" placeholder="Email" />
        </div>

        <div className="input-container">
          {errors?.password ? (
            <div className="error-message">{errors.password.message}</div>
          ) : (
            <label htmlFor="password">Password</label>
          )}
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
          />
        </div>

        <button>ADD</button>
      </form>
    </div>
  );
}

export default AddCustomer;
