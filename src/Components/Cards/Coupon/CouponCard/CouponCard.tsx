import { Link } from "react-router-dom";
import { CouponModel } from "../../../../Models/Admin";
import "./CouponCard.css";

interface CouponCardProps{
    coupon:CouponModel;
  }
function CouponCard(props:CouponCardProps): JSX.Element {
    return (
        <div className="CouponCard">
			<h3>{props.coupon.id}</h3>
      <p>{props.coupon.id},{props.coupon.title},{props.coupon.description},
      {props.coupon.category},{props.coupon.price},{props.coupon.startDate},
      {props.coupon.endDate},{props.coupon.company},{props.coupon.amount},{props.coupon.image}</p>
      <div className="row2">
      <Link to={`/companies/update/${props.coupon.id}`}>
  <button>Update Company</button>
</Link>
<Link to={`/companies/delete/${props.coupon.id}`}>
  <button>Delete Company</button>
</Link>
      </div>
        </div>
    );
}

export default CouponCard;
