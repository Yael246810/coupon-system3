import { useEffect } from "react";
import "./Logout.css";
import { useDispatch } from "react-redux";
import { userLoggedOutAction } from "../Redux/UserAppState";
import { useNavigate } from "react-router-dom";
import { removeCustomers } from "../Redux/customerAppState";

function Logout(): JSX.Element {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(userLoggedOutAction());
        dispatch(removeCustomers); //Maybe I need it only for coupons...
        navigate("/login");
    },[]);
    return (
        <div className="Logout">
        </div>
    );
}

export default Logout;
