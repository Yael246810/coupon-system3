import { useNavigate } from "react-router-dom";
import "./AddCompany.css";
import { useDispatch } from "react-redux";
import Zod from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import notifyService from "../../../../Services/NotificationService";
import companyWebApiService from "../../../../Services/CompanyWebApiService";
import { CompanyReq } from "../../../../Models/CompanyReq";
import { addedCompanyAction } from "../../../Redux/CompanyNoCouponsAppState";

function AddCompany(): JSX.Element {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const companiesModelSchema = Zod.object({
    name: Zod.string().nonempty("Please enter a valid name"),
    email: Zod.string()
      .email()
      .nonempty("Please enter a correct email address"),
    password: Zod.string().min(
      4,
      "Password must contain at least 4 characters"
    ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CompanyReq>({
    mode: "all",
    resolver: zodResolver(companiesModelSchema),
  });

  const onSubmit: SubmitHandler<CompanyReq> = (data: CompanyReq) => {
    companyWebApiService
      .addCompany(data)
      .then((res) => {
        notifyService.success("the company is added");
        dispatch(addedCompanyAction(res.data));
        navigate("/admin/companies", {
          state: { wasCompaniesDataUpdated: true },
        });
      })
      .catch((err) => notifyService.error(err));
  };
  return (
    <div className="AddCompany">
      <h1>Add a new company</h1>

      <form onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}>
        <div className="input-container">
          {errors?.name ? (
            <div className="error-message">{errors.name.message}</div>
          ) : (
            <label htmlFor="name">Name</label>
          )}
          <input {...register("name")} type="text" placeholder="name" />
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

export default AddCompany;
