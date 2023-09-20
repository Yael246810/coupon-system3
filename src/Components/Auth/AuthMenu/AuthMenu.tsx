import { Link } from "react-router-dom";
import "./AuthMenu.css";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

function AuthMenu(): JSX.Element {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className="AuthMenu">
      {user.token !== "" ? (
        <>
          <p>
            Connected as {user.email} <Link to="logout">Logout</Link>
          </p>
        </>
      ) : (
        <>
          <p>
            Hello guest <Link to="login">Login</Link>
          </p>
        </>
      )}
    </div>
  );
}

export default AuthMenu;
