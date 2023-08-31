import { useSelector } from "react-redux";
import "./TotalCompanies.css";
import { RootState } from "../../../Redux/store";

function TotalCompanies(): JSX.Element {

    const total = useSelector((state: RootState) => state.companies.companies.length);

    return (
        <div className="Total">
            {
                (total) ? <p>Total : {total}</p> : <p>No Companies</p>
            }
        </div>
    );
    
}

export default TotalCompanies;
