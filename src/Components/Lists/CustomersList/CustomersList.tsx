import { useEffect } from "react";
import "./CustomersList.css";
import CustomerCard from "../../Cards/Customer/CustomerCard/CustomerCard";
import notifyService from "../../../Services/NotificationService";
import EmptyView from "../../Pages/EmptyView/EmptyView";
import TotalCustomers2 from "../../Cards/Customer/totalCustomers/totalCustomers";
import { RootState } from "../../Redux/store";
import { gotAllCustomersAction } from "../../Redux/customerAppState";
import { useDispatch, useSelector } from "react-redux";
import webApiService from "../../../Services/WebApiService";

function CustomersList(): JSX.Element {
    const customers = useSelector((state: RootState) => state.customers.customers); 
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch customers only if the array is empty
        if (customers.length === 0) {
            webApiService.getAllCustomersAuth()
                .then(res => {
                    dispatch(gotAllCustomersAction(res.data));
                    notifyService.success('Succeeded to upload the customers list');
                })
                .catch(err => {
                    console.log(err);
                    notifyService.error('Failed to upload the customers list: ' + err);
                });
        }
    }, [customers, dispatch]);

    return (
        <div className="CustomersList">
            <TotalCustomers2/>
            <h1>Customers List</h1>
            {
                customers.length !== 0 ?
                customers.map((c, idx) => <CustomerCard key={`customer-card-${idx}`} customer={c} />) :
                <EmptyView msg="There are no customers available at the moment"/>
            }
        </div>
    );
}

export default CustomersList;
