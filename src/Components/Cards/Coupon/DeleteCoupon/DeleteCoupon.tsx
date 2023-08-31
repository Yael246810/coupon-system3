import { useDispatch } from "react-redux";
import "./DeleteCoupon.css";
import { useNavigate, useParams } from "react-router-dom";
import couponWebApiService from "../../../../Services/CouponsWebApiService";
import notifyService from "../../../../Services/NotificationService";
import { deletedCouponAction } from "../../../Redux/CouponAppState";

function DeleteCoupon(): JSX.Element {

    const dispatch = useDispatch();
    const params = useParams();
    const id = +(params.id || 0);

    const navigate = useNavigate();

    const yes = () => {
        couponWebApiService.deleteCoupon(id)
        .then(res => {
            notifyService.success(`Deleted coupon #${id}`);
            dispatch(deletedCouponAction(id))
            navigate(-1);
        })
        .catch(err => notifyService.error(err));
    }

    const no = () => {
        navigate(-1);
    }
    
    return (
        <div className="DeleteCoupon">
            <h2>Delete Coupon</h2>
            <p className="delete-message">Are you sure you want to delete coupon #{id}?</p>
            <div className="delete-button-container">
                <button className="delete-button" onClick={yes}>Delete</button>
                <button className="cancel-button" onClick={no}>Cancel</button>
            </div>			
        </div>
    );
}

export default DeleteCoupon;
