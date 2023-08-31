import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import companyWebApiService from "../../../../Services/CompanyWebApiService";
import notifyService from "../../../../Services/NotificationService";
import { gotSingleCompanyAction } from "../../../Redux/CompanyAppState";
import { CompaniesModel, CouponModel } from "../../../../Models/Admin";
import "./GetSingleCompany.css"; // Import your CSS file here

function GetSingleCompany(): JSX.Element {
  const dispatch = useDispatch(); // Get the dispatch function

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [fetchedCompany, setFetchedCompany] = useState<CompaniesModel | null>(null);

  const onSubmit = (data: { id: string }) => {
    const numericId = parseInt(data.id);

    if (!isNaN(numericId)) {
      companyWebApiService
        .getSingleCompany(numericId)
        .then((res) => {
          notifyService.success(`Fetched company #${numericId}`);
          dispatch(gotSingleCompanyAction(res.data));
          setFetchedCompany(res.data); // Store the fetched company in state
        })
        .catch((err) => notifyService.error(err));
    } else {
      notifyService.error("Please enter a valid company ID");
    }
  };

  return (
    <div className="GetSingleCompany">
      <h1>Get a single Company</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors?.id ? (
          <span>{errors.id.message}</span>
        ) : (
          <>
            <label htmlFor="id">Id</label>
            <input {...register("id")} type="number" placeholder="Id" />
          </>
        )}
        <button>Get</button>
      </form>
      {fetchedCompany && (
        <div className="CompanyCard">
          <h2>Single Company:</h2>
          <p>ID: {fetchedCompany.id}</p>
          <p>Name: {fetchedCompany.name}</p>
          <p>Email: {fetchedCompany.email}</p>
          <p>Password: {fetchedCompany.password}</p>
        
          <h2>Coupons:</h2>
          <ul className="CouponList">
            {fetchedCompany.coupons.map((coupon: CouponModel) => (
              <li key={coupon.id} className="CouponItem">
                <p>Category: {coupon.category}</p>
                <p>Title: {coupon.title}</p>
                <p>Description: {coupon.description}</p>
                <p>Start Date: {coupon.startDate}</p>
                <p>End Date: {coupon.endDate}</p>
                <p>Amount: {coupon.amount}</p>
                <p>Price: {coupon.price}</p>
                <p>Image: {coupon.image}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default GetSingleCompany;
