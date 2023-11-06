import { Link } from "react-router-dom";
import "./Menu.css";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

function Menu(): JSX.Element {
  const isAdmin = useSelector((state: RootState) => state.guardReducer.isAdmin);
  const isCompany = useSelector(
    (state: RootState) => state.guardReducer.isCompany
  );
  const isCustomer = useSelector(
    (state: RootState) => state.guardReducer.isCustomer
  );

  return (
    <div className="Menu">
      <Link to="/home">
        <button>Home</button>
      </Link>
      <Link to="/about">
        <button>About</button>
      </Link>
      {isAdmin && (
        <Link to="/admin/companies">
          {" "}
          <button>Companies</button>
        </Link>
      )}
      {isAdmin && (
        <Link to="/admin/customers">
          <button>Customers</button>
        </Link>
      )}
      {isAdmin && (
        <Link to="/admin/customers/add">
          <button>Add a new customer</button>
        </Link>
      )}
      {isAdmin && (
        <Link to="/admin/customers/:id">
          <button>Get a single Customer</button>
        </Link>
      )}
      {isAdmin && (
        <Link to="/admin/companies/add">
          <button>Add Company</button>
        </Link>
      )}
      {isAdmin && (
        <Link to="/admin/companies/:id">
          <button>Get a single Company</button>
        </Link>
      )}

      {isCompany && (
        <Link to="/companies/coupons/add">
          <button>Add Coupon</button>
        </Link>
      )}
      {isCompany && (
        <Link to="/companies/coupons">
          <button>Company Coupons</button>
        </Link>
      )}
      {isCompany && (
        <Link to="/companies/:id/coupons/price">
          <button>Company Coupons by price</button>
        </Link>
      )}
      {isCompany && (
        <Link to="/companies/:id/coupons/category">
          <button>Company Coupons by category</button>
        </Link>
      )}
      {isCompany && (
        <Link to="/companies/:id/details">
          <button>Company Details</button>
        </Link>
      )}

      {isCustomer && (
        <Link to="/customers/:id/coupons/:id/purchase">
          <button>Purchase Coupon</button>
        </Link>
      )}
      {isCustomer && (
        <Link to="customers/:id/coupons">
          <button>Customer Coupons</button>
        </Link>
      )}
      {isCustomer && (
        <Link to="customers/:id/coupons/price">
          <button>Customer Coupons by Price</button>
        </Link>
      )}
      {isCustomer && (
        <Link to="customers/:id/coupons/category">
          <button>Customer Coupons by Category</button>
        </Link>
      )}
      {isCustomer && (
        <Link to="customers/:id/details">
          <button>Customer Details</button>
        </Link>
      )}
    </div>
  );
}

export default Menu;
