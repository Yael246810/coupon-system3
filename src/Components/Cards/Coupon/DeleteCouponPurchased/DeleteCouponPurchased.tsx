import { useDispatch } from "react-redux";
import "./DeleteCouponPurchased.css";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams
import customerWebApiService from "../../../../Services/CustomerWebApiService";
import notifyService from "../../../../Services/NotificationService";
import { deletedPurchasedCouponAction } from "../../../Redux/CustomerWithCouponsAppState";


function DeleteCouponPurchased(): JSX.Element {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Use useParams to extract customerId and couponId from the route
    const { customerId, couponId } = useParams();
const parsedCustomerId = parseInt(customerId, 10);
const parsedCouponId = parseInt(couponId, 10);

    const yes = () => {
        customerWebApiService.deletePurchasedCoupon(parsedCouponId, parsedCustomerId)
            .then((res) => {
                notifyService.success(`Deleted purchased coupon #${parsedCouponId} from customer ${parsedCustomerId}`);
                console.log(` couponId: ${parsedCouponId}, customerId: ${parsedCustomerId}`)
                dispatch(deletedPurchasedCouponAction(parsedCouponId));
                navigate(-1);
            })
            .catch((err) => notifyService.error(err));
    }

    const no = () => {
        navigate(-1);
    }
    return (
        <div className="DeleteCouponPurchased">
          <h2>Delete Coupon</h2>
          <p className="delete-message">Are you sure you want to delete coupon #{parsedCouponId}?</p>
          <div className="delete-button-container">
            <button className="delete-button" onClick={yes}>Delete</button>
            <button className="cancel-button" onClick={no}>Cancel</button>
          </div>
        </div>
      );      
}

export default DeleteCouponPurchased;