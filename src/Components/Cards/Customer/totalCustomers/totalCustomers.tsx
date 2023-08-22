import "./totalCustomers.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";

function TotalCustomers(): JSX.Element {
   
    const total = useSelector((state:RootState)=>state.customersReducer.customers.length);
    
    return (
        <div className="totalCustomers2">
			(total) ?<p>Total Customers: {total}</p> :<p> No Customers</p>
        </div>
    );
}

export default TotalCustomers;
