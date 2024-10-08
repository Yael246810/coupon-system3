import { useDispatch } from "react-redux";
import "./UpdateCompany.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import store from "../../../Redux/store";
import Zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import notifyService from "../../../../Services/NotificationService";
import companyWebApiService from "../../../../Services/CompanyWebApiService";
import { updatedCompanyAction } from "../../../Redux/CompanyNoCouponsAppState";
import { CompanyReq } from "../../../../Models/CompanyReq";
import { CompanyModel } from "../../../../Models/Admin";
import { CompaniesModel } from "../../../../Models/CompaniesModel";

function UpdateCompany(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const id = +(params.id || 0);
  const [obj] = useState<CompaniesModel>(
    store.getState().companies.companies.filter((c) => c.id === id)[0]
  );

  const defaultValuesObj = { ...obj };

  const companiesModelUpdateSchema = Zod.object({
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
    defaultValues: defaultValuesObj,
    mode: "all",
    resolver: zodResolver(companiesModelUpdateSchema),
  });

  const onSubmit: SubmitHandler<CompanyModel> = (data: CompanyModel) => {
    data.id = id;

    if (data.id === 0) {
      console.log(`Invalid ID ${data.id}`);

      return;
    }

    return companyWebApiService
      .updateCompany(data)
      .then((res) => {
        notifyService.success("company is updated!");
        dispatch(updatedCompanyAction(res.data));
        navigate("/admin/companies", {
          state: { wasCompaniesDataUpdated: true },
        });
      })
      .catch((err) => notifyService.error(err));
  };
  return (
    <div className="UpdateCompany">
      <h1>Update Company</h1>
      <form onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}>
        {obj && (
          <div>
            <label htmlFor="id">Id</label>
            <input name="id" type="number" value={obj.id} disabled={true} />
          </div>
        )}

<div className="input-container">
  <label htmlFor="name">Name</label>
  <input {...register("name")} type="text" placeholder="name" />
  {errors?.name && (
    <div className="error-message">{errors.name.message}</div>
  )}
</div>

<div className="input-container">
  <label htmlFor="email">Email</label>
  <input {...register("email")} type="text" placeholder="Email" />
  {errors?.email && (
    <div className="error-message">{errors.email.message}</div>
  )}
</div>

<div className="input-container">
  <label htmlFor="password">Password</label>
  <input {...register("password")} type="password" placeholder="Password" />
  {errors?.password && (
    <div className="error-message">{errors.password.message}</div>
  )}
</div>


        <button disabled={!isValid || isSubmitting}>Update</button>
      </form>
    </div>
  );
}

export default UpdateCompany;
