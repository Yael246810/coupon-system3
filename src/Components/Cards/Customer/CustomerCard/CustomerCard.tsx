import { Link } from "react-router-dom";
import { CustomerModel } from "../../../../Models/Admin";
import "./CustomerCard.css";

interface CustomerCardProps{
  customer:CustomerModel;
}
function CustomerCard(props:CustomerCardProps): JSX.Element {
    return (
        <div className="CustomerCard">
			<h3>{props.customer.id}</h3>
      <p>{props.customer.firstName} {props.customer.lastName},{props.customer.email},{props.customer.password}</p>
      <div className="row">
        <Link to="/src/Components/Cards/Customer/UpdateCustomer"><button>Update Customer</button></Link>
        <Link to={`/src/Components/Cards/Customer/DeleteCustomer/${props.customer.id}`}>
    <button>Delete Customer</button>
</Link>
      </div>
        </div>
    );
}

export default CustomerCard;


