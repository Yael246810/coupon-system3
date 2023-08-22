import { Link } from "react-router-dom";
import "./Menu.css";


function Menu(): JSX.Element {
    return (
        <div className="Menu">
            {/* <Link to={"/home"}>Home</Link>
            <Link to={"/about"}>About</Link> */}
      {/* <Link to="/home">
        <button>Home</button>
      </Link> */}
      <Link to="/about">
        <button>About</button>
      </Link>
      <Link to="/contactUs">
        <button>Contact Us</button>
      </Link>
      {/* <Link to="/todo">
        <button>AddTodo</button>
      </Link> */}
      <Link to="/coupons">
        <button>Coupons</button>
      </Link>
      <Link to="/admin/companies">
        <button>Companies</button>
      </Link>
      <Link to="/customers">
        <button>Customers</button>
      </Link>
      <Link to="/customers/add">
        <button>Add a new customer</button>
      </Link>
        </div>
    );
}

export default Menu;
