import { useSelector } from "react-redux";
import "./TotalCoupons.css";
import { RootState } from "../../../Redux/store";

function TotalCoupons(): JSX.Element {

    const total = useSelector((state:RootState)=>state.couponsReducer.coupons.length);

    return (
        <div className="TotalCoupons">
			<p>Total Coupons: {total}</p> :<p> No Coupons</p>
        </div>
    );
}

export default TotalCoupons;
