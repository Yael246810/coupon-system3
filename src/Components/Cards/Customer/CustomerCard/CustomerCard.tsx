import { Link } from "react-router-dom";
import { customerModel } from "../../../../Models/Admin";
import "./CustomerCard.css";

interface CustomerCardProps {
  customer: customerModel;
}
function CustomerCard(props: CustomerCardProps): JSX.Element {
  return (
    <div className="CustomerCard">
      <h3>{props.customer.id}</h3>
      <p>
        {props.customer.firstName} {props.customer.lastName},
        {props.customer.email},{props.customer.password}
      </p>
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
