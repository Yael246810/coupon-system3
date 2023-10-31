import { Link } from "react-router-dom";
import { CustomerModel } from "../../../../Models/Admin";
import "./CustomerCard.css";

interface CustomerCardProps {
  customer: CustomerModel;
}
function CustomerCard(props: CustomerCardProps): JSX.Element {
  const couponListLength = props.customer.coupons?.length || 0;
  return (
    <div className="CustomerCard">
      <p className="company-info-item">Id: {props.customer.id}</p>
          <p className="company-info-item">Name: {props.customer.firstName} {props.customer.lastName}</p>
          <p className="company-info-item">Email: {props.customer.email}</p>
          <p className="company-info-item">Coupons: {couponListLength}</p>
    
      <div className="row">
        <Link to={`/admin/update/${props.customer.id}`}>
          <button>Update Customer</button>
        </Link>
        <Link to={`/admin/delete/${props.customer.id}`}>
          <button>Delete Customer</button>
        </Link>
      </div>
    </div>
  );
}

export default CustomerCard;
