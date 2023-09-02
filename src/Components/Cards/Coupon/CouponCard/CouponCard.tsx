import React from "react";
import { Link } from "react-router-dom";
import { CouponModel } from "../../../../Models/Admin";
import "./CouponCard.css";
import moment from "moment";

interface CouponCardProps {
    coupon: CouponModel;
}

function CouponCard(props: CouponCardProps): JSX.Element {
    return (
        <div className="CouponCard">
            <img src={props.coupon.image} alt={props.coupon.title} className="coupon-image" />
            <div className="coupon-details">
                <h3>{props.coupon.title}</h3>
                <p>{props.coupon.description}</p>
                <p>Category: {props.coupon.category}</p>
                <p>Price: ${props.coupon.price}</p>
                <p>Start Date: {moment(props.coupon.startDate).format("DD/MM/YY")}</p>
                <p>End Date: {moment(props.coupon.endDate).format("DD/MM/YY")}</p>
                <p>Amount: {props.coupon.amount}</p>
            </div>
            <div className="row2">
                <Link to={`/companies/update/${props.coupon.id}`}>
                    <button>Update Coupon</button>
                </Link>
                <Link to={`/companies/delete/${props.coupon.id}`}>
                    <button>Delete Coupon</button>
                </Link>
            </div>
        </div>
    );
}

export default CouponCard;
