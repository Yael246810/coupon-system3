import { Route, Routes } from "react-router-dom";
import "./Routing.css";
import App from "../../../App";
import About from "../../Pages/About/About";
import Page404 from "../../Pages/Page404/Page404";
import Home from "../../Pages/Home/Home";
import Video from "../../../assets/Video/Video";
import Login from "../../Login/Login";
import ContactUs from "../../Pages/ContactUs/ContactUs";
// import AddTodo from "../../Todo/Todo";
import CouponsList from "../../Lists/CouponsList/CouponsList";
import CompaniesList from "../../Lists/CompaniesList/CompaniesList";
import CustomersList from "../../Lists/CustomersList/CustomersList";
import DeleteCustomer from "../../Cards/Customer/DeleteCustomer/DeleteCustomer";
import UpdateCustomer from "../../Cards/Customer/UpdateCustomer/UpdateCustomer";
import DeleteCompany from "../../Cards/Company/DeleteCompany/DeleteCompany";
import UpdateCompany from "../../Cards/Company/UpdateCompany/UpdateCompany";
import AddCustomer from "../../Cards/Customer/AddCustomer/AddCustomer";
import Logout from "../../Logout/Logout";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route index element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/video" element={<Video/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/contactUs" element={<ContactUs/>}/>
                <Route path="/coupons" element={<CouponsList/>}/>
                <Route path="admin/companies" element={<CompaniesList/>}/>
                <Route path="/customers" element={<CustomersList/>}/>
                <Route path="/src/Components/Cards/Customer/DeleteCustomer/:id" element={<DeleteCustomer/>}/>
                <Route path="/customers/update/:id" element={<UpdateCustomer/>}/>
                <Route path="/customers/add" element={<AddCustomer/>}/>
                <Route path="companies/delete/:id" element={<DeleteCompany/>}/>
                <Route path="companies/update/:id" element={<UpdateCompany/>}/>
                <Route path="logout" element={<Logout/>}/>
                <Route path="*" element={<Page404/>}/> //this needs to be the last
            </Routes>
        </div>
    );
}

export default Routing;
