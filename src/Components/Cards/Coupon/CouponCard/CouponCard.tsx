import React from "react";
import { Link } from "react-router-dom";
import { CouponModel, Category } from "../../../../Models/Admin";
import "./CouponCard.css";
import moment from "moment";

interface CouponCardProps {
  coupon: CouponModel;
  isCompanyConnected: boolean;
  customerId: number;
  companyId: number;
}

function CouponCard(props: CouponCardProps): JSX.Element {
  return (
    <div className="CouponCard">
      <img
        src={props.coupon.image}
        alt={props.coupon.title}
        className="coupon-image"
      />
      <div className="coupon-details">
        <h3 className="coupon-title">{props.coupon.title}</h3>
        <p className="coupon-description">{props.coupon.description}</p>
        <div className="coupon-info">
          <p className="coupon-info-item">
            Category: {Category[props.coupon.category]}
          </p>
          <p className="coupon-info-item">Price: ${props.coupon.price}</p>
          <p className="coupon-info-item">
            Start Date: {moment(props.coupon.startDate).format("DD/MM/YY")}
          </p>
          <p className="coupon-info-item">
            End Date: {moment(props.coupon.endDate).format("DD/MM/YY")}
          </p>
          <p className="coupon-info-item">Amount: {props.coupon.amount}</p>
          <p className="coupon-info-item">ID: {props.coupon.id}</p>
        </div>
        <div className="coupon-buttons">
          {props.isCompanyConnected ? (
            <>
              <Link
                to={`/companies/${props.companyId}/update/${props.coupon.id}`}
              >
                <button className="coupon-button">Update Coupon</button>
              </Link>
              <Link to={`/companies/delete/${props.coupon.id}`}>
                <button className="coupon-button">Delete Coupon</button>
              </Link>
            </>
          ) : (
            <>
              <Link
                to={`/customers/${props.customerId}/coupons/${props.coupon.id}/delete`}
              >
                <button className="coupon-button">
                  Delete Purchased Coupon
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CouponCard;
