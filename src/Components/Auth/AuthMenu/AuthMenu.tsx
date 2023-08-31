import { Link } from "react-router-dom";
import "./AuthMenu.css";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

function AuthMenu(): JSX.Element {
    const token = "12345";
    const email = "yael624@walla.com";
    const user = useSelector((state:RootState)=>state.user) 
    return (
        <div className="AuthMenu">
			{
                (user.token)
                ?
                <>
                <p>connected as {user.email} <Link to="logout">Logout</Link></p>
                </> 
                : 
                <>
                <p>Hello guest <Link to="login">Login</Link></p>
                </>
            }
        </div>
    );
}

export default AuthMenu;
