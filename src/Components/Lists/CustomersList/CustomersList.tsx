import { useEffect, useState } from "react";
import "./CustomersList.css";
import { CustomersModel } from "../../../Models/Customers";
import CustomerCard from "../../Cards/Customer/CustomerCard/CustomerCard";
import notifyService from "../../../Services/NotificationService";
import EmptyView from "../../Pages/EmptyView/EmptyView";
import TotalCustomers2 from "../../Cards/Customer/totalCustomers/totalCustomers";
import store from "../../Redux/store";
import { gotAllCustomersAction } from "../../Redux/customerAppState";
import { useDispatch } from "react-redux";
import webApiService from "../../../Services/WebApiService";

function CustomersList(): JSX.Element {
    const [customers, setCustomers] = useState<CustomersModel[]>(store.getState().customersReducer.customers); // there is a problem with coupon property
    const dispatch = useDispatch();

    useEffect(() => {
        if(customers.length>0){
            return;
        }
        // webApiService.getAllCustomers()
        webApiService.getAllCustomersAuth()
            .then(res => {
                // console.log(res.data);
                setCustomers(res.data);
                notifyService.success('Succeeded to upload the customers list');
                // store.dispatch(gotAllCustomersAction(res.data));
                dispatch(gotAllCustomersAction(res.data));
            })
            .catch(err => {
                console.log(err);
                notifyService.error('Failed to upload the customers list: ' + err);
            });
    }, []);

    return (
        <div className="CustomersList">
            <TotalCustomers2/>
            <h1>Customers List</h1>
            {
            (customers.length!==0) ?

            customers.map((c, idx) => <CustomerCard key={`customer-card-${idx}`} customer={c} />) :
            <EmptyView msg="there are no customers available at the moment"/>
            }
        </div>
    );
}

export default CustomersList;
