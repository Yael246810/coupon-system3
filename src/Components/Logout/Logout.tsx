import React, { useEffect } from "react";
import "./Logout.css";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOutAction } from "../Redux/UserAppState";
import { removeCustomers } from "../Redux/CustomerAppState";
import { removeAdminAccess, removeCompanyAccess, removeCustomerAccess } from "../Redux/GuardAppState";
import { useNavigate } from "react-router-dom";
import { ClientType } from "../../Models/User";
import { RootState } from "../Redux/store";

function Logout(): JSX.Element {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Explicitly type the userType
    const userType = useSelector((state: RootState) => state.user.user?.type);

    useEffect(() => {
        dispatch(removeCustomers());
        dispatch(userLoggedOutAction());

        if (userType === ClientType.ADMIN) {
            dispatch(removeAdminAccess());
        }

        if (userType === ClientType.COMPANY) {
            dispatch(removeCompanyAccess());
        }

        if (userType === ClientType.CUSTOMER) {
            dispatch(removeCustomerAccess());
        }

        navigate("/login");
    }, [dispatch, navigate, userType]);

    return (
        <div className="Logout">
        </div>
    );
}

export default Logout;
