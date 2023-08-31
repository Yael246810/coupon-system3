import { useNavigate, useParams } from "react-router-dom";
import "./DeleteCustomer.css";
import notifyService from "../../../../Services/NotificationService";
import { deletedCustomerAction } from "../../../Redux/CustomerAppState";
import { useDispatch } from "react-redux";
import webApiService from "../../../../Services/CustomerWebApiService";

function DeleteCustomer(): JSX.Element {
    const dispatch = useDispatch();
    const params = useParams();
    const id = +(params.id || 0);

    const navigate = useNavigate();
    
    const yes = () => {
        webApiService.deleteCustomer(id)
        .then(res => {
            notifyService.success(`Deleted customer #${id}`);
            dispatch(deletedCustomerAction(id))
            navigate(-1);
        })
        .catch(err => notifyService.error(err));
    }

    const no = () => {
        navigate(-1);
    }
    
    return (
        <div className="delete-container">
            <h2>Delete Customer</h2>
            <p className="delete-message">Are you sure you want to delete customer #{id}?</p>
            <div className="delete-button-container">
                <button className="delete-button" onClick={yes}>Delete</button>
                <button className="cancel-button" onClick={no}>Cancel</button>
            </div>
        </div>
    );
}

export default DeleteCustomer;
