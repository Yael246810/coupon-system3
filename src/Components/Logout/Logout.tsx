import React, { useEffect } from "react";
import "./Logout.css";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOutAction } from "../Redux/UserAppState";
import { removeCustomers } from "../Redux/CustomerAppState";
import { removeAdminAccess, removeAll, removeCompanyAccess, removeCustomerAccess } from "../Redux/GuardAppState";
import { useNavigate } from "react-router-dom";
import { ClientType } from "../../Models/User";
import { RootState } from "../Redux/store";

function Logout(): JSX.Element {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Explicitly type the userType
    const userType = useSelector((state: RootState) => state.user.type);

    useEffect(() => {
        dispatch(removeCustomers());
        dispatch(userLoggedOutAction());
        dispatch(removeAll());
        navigate("/login");
    }, [dispatch, navigate, userType]);

    return (
        <div className="Logout">
            <h1>User did logout</h1>
        </div>
    );
}

export default Logout;
