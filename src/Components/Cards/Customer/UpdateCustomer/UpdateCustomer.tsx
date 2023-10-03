import { useDispatch } from "react-redux";
import "./UpdateCustomer.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { CustomerModel } from "../../../../Models/Admin";
import store from "../../../Redux/store";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import notifyService from "../../../../Services/NotificationService";
import Zod from "zod";
import webApiService from "../../../../Services/CustomerWebApiService";
import { updatedCustomerAction } from "../../../Redux/CustomerAppState";

function UpdateCustomer(customer: CustomerModel): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const id = +(params.id || 0);
  const [obj] = useState<CustomerModel>(
    store.getState().customers.customers.filter((c) => c.id === id)[0]
  );

  const defaultValuesObj = { ...obj };

  const customersModelUpdateSchema = Zod.object({
    firstName: Zod.string().nonempty("Please enter a valid first name"),
    lastName: Zod.string().nonempty("Please enter a valid last name"),
    email: Zod.string()
      .email()
      .nonempty("Please enter a correct email address"),
    password: Zod.string().min(
      4,
      "Password must contain at least 4 characters"
    ),
  });

  const updateAndValidateId = (newId: number) => {
    if (newId === id) {
      return newId;
    } else {
      console.log("error with the id");
      return id;
    }
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CustomerModel>({
    defaultValues: defaultValuesObj,
    mode: "all",
    resolver: zodResolver(customersModelUpdateSchema),
  });

  const onSubmit: SubmitHandler<CustomerModel> = (data: CustomerModel) => {
    return webApiService
      .updateCustomer(id, data)
      .then((res) => {
        notifyService.success("customer is updated!");
        dispatch(updatedCustomerAction(res.data));
        navigate("/admin/customers", {
          state: { wasCustomersDataUpdated: true },
        });
      })
      .catch((err) => notifyService.error(err));
  };

  return (
    <div className="UpdateCustomer">
      <h1>Update Customer</h1>

      <form onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}>
        <div className="input-container">
          <label htmlFor="id">Id</label>
          <input name="id" type="text" value={obj.id} disabled={true} />
        </div>

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

        <button disabled={!isValid || isSubmitting}>Update</button>
      </form>
    </div>
  );
}

export default UpdateCustomer;
