import React, { useState, useEffect } from 'react';
import companyWebApiService from '../../../../Services/CompanyWebApiService';
import notifyService from '../../../../Services/NotificationService';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { CompaniesModel } from '../../../../Models/CompaniesModel';
import { getCompanyDetailsAction } from '../../../Redux/CompanyAppState';
import store from '../../../Redux/store';

function CompanyDetails() {
  const dispatch = useDispatch();
  const companyId = store.getState().user.id;

  const {
    formState: { errors },
  } = useForm();

  const [fetchedCompany, setFetchedCompany] = useState<CompaniesModel | null>(null);

if(!fetchedCompany) {
  companyWebApiService
      .getCompanyDetails(companyId)
      .then((res) => {
        notifyService.success(`Details about company #${companyId}`);
        dispatch(getCompanyDetailsAction(res.data));
        setFetchedCompany(res.data);
      })
      .catch((err) => notifyService.error(err));
}

  return (
    <div className="CompanyDetails">
      <h2>Company Details:</h2>
      {fetchedCompany ? (
  <div>
    <p>ID: {fetchedCompany.id}</p>
    <p>Name: {fetchedCompany.name}</p>
    <p>Email: {fetchedCompany.email}</p>
    <p>Password: {fetchedCompany.password}</p>

    <h2>Coupons:</h2>
    <ul className="CouponList">
      {fetchedCompany?.coupons?.map((coupon: any) => (
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
) : (
  <p></p>
)}

    </div>
  );
}

export default CompanyDetails;

