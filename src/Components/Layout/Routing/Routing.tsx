import { Route, Routes } from "react-router-dom";
import "./Routing.css";
import App from "../../../App";
import About from "../../Pages/About/About";
import Page404 from "../../Pages/Page404/Page404";
import Home from "../../Pages/Home/Home";
import Video from "../../../assets/Video/Video";
import Login from "../../Login/Login";
import ContactUs from "../../Pages/ContactUs/ContactUs";
import CouponsList from "../../Lists/CouponsList/CouponsList";
import CompaniesList from "../../Lists/CompaniesList/CompaniesList";
import CustomersList from "../../Lists/CustomersList/CustomersList";
import DeleteCustomer from "../../Cards/Customer/DeleteCustomer/DeleteCustomer";
import UpdateCustomer from "../../Cards/Customer/UpdateCustomer/UpdateCustomer";
import DeleteCompany from "../../Cards/Company/DeleteCompany/DeleteCompany";
import UpdateCompany from "../../Cards/Company/UpdateCompany/UpdateCompany";
import AddCustomer from "../../Cards/Customer/AddCustomer/AddCustomer";
import Logout from "../../Logout/Logout";
import AddCompany from "../../Cards/Company/AddCompany/AddCompany";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import AddCoupon from "../../Cards/Coupon/AddCoupon/AddCoupon";
import UpdateCoupon from "../../Cards/Coupon/UpdateCoupon/UpdateCoupon";
import DeleteCoupon from "../../Cards/Coupon/DeleteCoupon/DeleteCoupon";
import GetCompanyCoupons from "../../Cards/Company/GetCompanyCoupons/GetCompanyCoupons";
import GetSingleCustomer2 from "../../Cards/Customer/GetSingleCustomer2/GetSingleCustomer2";
import GetSingleCompany from "../../Cards/Company/GetSingleCompany/GetSingleCompany";

import GetCompanyCouponsByCategory from "../../Cards/Company/GetCompanyCouponsByCategory/GetCompanyCouponsByCategory";
import GetCustomerCouponsByMaxPrice from "../../Cards/Coupon/GetCustomerCouponsUntilMaxPrice/GetCustomerCouponsByMaxPrice";
import GetCompanyCouponsByMaxPrice from "../../Cards/Company/GetCompanyCouponsByMaxPrice/GetCompanyCouponsByMaxPrice";

function Routing(): JSX.Element {
    const AdminFlag = useSelector((state:RootState)=>state.guardReducer.isAdmin);
    const CompanyFlag = useSelector((state:RootState)=>state.guardReducer.isCompany);
    const CustomerFlag = useSelector((state:RootState)=>state.guardReducer.isCustomer);

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
                {AdminFlag &&<Route path="/admin/customers" element={<CustomersList/>}/>}
                {AdminFlag&&<Route path="/admin/delete/:id" element={<DeleteCustomer/>}/>}
                {AdminFlag&&<Route path="/admin/update/:id" element={<UpdateCustomer/>}/>}
                {AdminFlag&&<Route path="/admin/customers/add" element={<AddCustomer/>}/>}
                {AdminFlag&&<Route path="/admin/customers/:id" element={<GetSingleCustomer2/>}/>}
                {AdminFlag &&<Route path="/admin/companies" element={<CompaniesList/>}/>}
                {AdminFlag&&<Route path="/admin/companies/add" element={<AddCompany/>}/>}
                {AdminFlag&&<Route path="/admin/companies/delete/:id" element={<DeleteCompany/>}/>}
                {AdminFlag&&<Route path="/admin/companies/update/:id" element={<UpdateCompany/>}/>}
                {AdminFlag&&<Route path="/admin/companies/:id" element={<GetSingleCompany/>}/>}

                {CompanyFlag&&<Route path="/companies/coupons/add" element={<AddCoupon/>}/>} 
                {CompanyFlag&&<Route path="/companies/coupon/:id" element={<UpdateCoupon/>}/>}
                {CompanyFlag&&<Route path="/companies/:id" element={<DeleteCoupon/>}/>}
                {CompanyFlag&&<Route path="/companies/:id/coupons" element={<GetCompanyCoupons/>}/>}
                {CompanyFlag&&<Route path="/companies/:id/coupons/price" element={<GetCompanyCouponsByMaxPrice/>}/>}
                {CompanyFlag&&<Route path="/companies/:id/coupons/category" element={<GetCompanyCouponsByCategory/>}/>}
                <Route path="logout" element={<Logout/>}/>
                <Route path="*" element={<Page404/>}/> //this needs to be the last
            </Routes>
        </div>
    );
}

export default Routing;
