import { useEffect, useRef, useState } from "react";
import "./CustomersList.css";
import CustomerCard from "../../Cards/Customer/CustomerCard/CustomerCard";
import notifyService from "../../../Services/NotificationService";
import EmptyView from "../../Pages/EmptyView/EmptyView";
import TotalCustomers2 from "../../Cards/Customer/totalCustomers/totalCustomers";
import store, { RootState } from "../../Redux/store";
import { gotAllCustomersAction } from "../../Redux/CustomerAppState";
import { useDispatch, useSelector } from "react-redux";
import webApiService from "../../../Services/CustomerWebApiService";
import { CustomerModel } from "../../../Models/Admin";
import { useLocation } from "react-router-dom";

function CustomersList(): JSX.Element {
  const [customers, setCustomers] = useState<CustomerModel[]>(
    store.getState().customers.customers
  );
  const dispatch = useDispatch();

  const location = useLocation();
  const wasCustomersDataUpdated = useRef(
    location.state?.wasCustomersDataUpdated
  );

  const fetchedInitialData = useRef(
    location.state?.fetchedInitialData
  );

  useEffect(() => {
    if (!fetchedInitialData.current || wasCustomersDataUpdated.current) {
      wasCustomersDataUpdated.current = false;
      fetchedInitialData.current = true;
      webApiService
        .getAllCustomers()
        .then((res) => {
          dispatch(gotAllCustomersAction(res.data));
          setCustomers(res.data);
          notifyService.success("Succeeded to upload the customers list");
        })
        .catch((err) => {
          console.log(err);
          notifyService.error("Failed to upload the customers list: " + err);
        });
    }
  }, [customers, dispatch]);

  return (
    <div className="CustomersList">
      <h1>Customers List</h1>
      <TotalCustomers2 />
      {customers.length !== 0 ? (
        customers.map((c, idx) => (
          <CustomerCard key={`customer-card-${idx}`} customer={c} />
        ))
      ) : (
        <EmptyView msg="There are no customers available at the moment" />
      )}
    </div>
  );
}

export default CustomersList;
