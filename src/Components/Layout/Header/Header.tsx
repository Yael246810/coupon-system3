import "./Header.css";
import logo from '../../../assets/Images/coupon logo.jpg';
import { Link } from "react-router-dom";
import AuthMenu from "../../Auth/AuthMenu/AuthMenu";
function Header(): JSX.Element {
    return (
        <div className="Header">
            <img src={logo} alt="coupon logo" width={200} height={200}/>
            <h1>Coupon System</h1>
            <AuthMenu/>
            <Link to="/login">
        {/* <button className="LoginButton">Login</button> */}
      </Link>
        </div>
    );
}

export default Header;
