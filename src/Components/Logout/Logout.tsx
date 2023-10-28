import React, { useEffect } from "react";
import "./Logout.css";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOutAction } from "../Redux/UserAppState";
import { removeCustomers } from "../Redux/CustomerAppState";
import { removeAll } from "../Redux/GuardAppState";
import { useNavigate } from "react-router-dom";
import { RootState } from "../Redux/store";
import { removeCompanies } from "../Redux/CompanyAppState";
import { removeCoupons } from "../Redux/CouponAppState";

function Logout(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userType = useSelector((state: RootState) => state.user.type);

  useEffect(() => {
    dispatch(removeCustomers());
    dispatch(removeCompanies());
    dispatch(removeCoupons());
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
