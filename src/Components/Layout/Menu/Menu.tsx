import { Link } from "react-router-dom";
import "./Menu.css";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";


function Menu(): JSX.Element {

  const isAdmin = useSelector((state:RootState)=> state.guardReducer.isAdmin);
  const isCompany = useSelector((state:RootState)=> state.guardReducer.isCompany);
  const isCustomer = useSelector((state:RootState)=> state.guardReducer.isCustomer);

    return (
        <div className="Menu">
      <Link to="/home"><button>Home</button></Link>
      <Link to="/about"><button>About</button></Link>
      <Link to="/coupons"><button>Our Coupons</button></Link>
      {isAdmin &&<Link to="/admin/companies"> <button>Companies</button></Link>}
      {isAdmin &&<Link to="/admin/customers"><button>Customers</button></Link>}
      {isAdmin&&<Link to="/admin/customers/add"><button>Add a new customer</button></Link>}
      {/* {isAdmin&&<Link to="/admin/customers/update"><button>Update customer</button></Link>} */}
      {isAdmin&&<Link to="/admin/customers/:id"><button>Get a single Customer</button></Link>}
      {isAdmin&&<Link to="/admin/companies/add"><button>Add Company</button></Link>}
      {isAdmin&&<Link to="/admin/companies/:id"><button>Get a single Company</button></Link>}

      {isCompany&&<Link to="/companies/coupons/add"><button>Add Coupon</button></Link>}
      {/* {isCompany&&<Link to="/companies/coupons/update"><button>Update Coupon</button></Link>}
      {isCompany&&<Link to="/companies/coupons/delete"><button>Delete Coupon</button></Link>} */}
      {isCompany&&<Link to="/companies/:id/coupons"><button>Company Coupons</button></Link>}
      {isCompany&&<Link to="/companies/:id/coupons/price"><button>Company Coupons by price</button></Link>}
      {isCompany&&<Link to="/companies/:id/coupons/category"><button>Company Coupons by category</button></Link>}

      {isCustomer&&<Link to="/customers/:id/coupons/:id/purchase"><button>Purchase Coupon</button></Link>}
      

        </div>
        
    );
}

export default Menu;
