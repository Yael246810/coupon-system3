import "./totalCustomers.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";

function TotalCustomers(): JSX.Element {
  const total = useSelector(
    (state: RootState) => state.customers.customers.length
  );

  return (
    <div className="totalCustomers2">
      <p>Total Customers: {total}</p> :<p> No Customers</p>
    </div>
  );
}

export default TotalCustomers;
