import axios, { AxiosResponse } from "axios";
import { Category, CouponModel, CustomerModel } from "../Models/Admin";
import UrlService from "./UrlService";
import { LoginReqModel, LoginResModel } from "../Models/Login";
import store from "../Components/Redux/store";
import { CustomerReq } from "../Models/CustomerReq";
import { CustomersModel } from "../Models/Customers";

class WebApiService{

    public login(data:LoginReqModel):Promise<AxiosResponse<LoginResModel>>{
        return axios.post<LoginResModel>(UrlService.auth+"/login",data);
    }

    public getAllCustomers():Promise<AxiosResponse<CustomerModel[],any>>{
        return axios.get<CustomerModel[]>(UrlService.allCustomers);
    }

    public getAllCustomersAuth():Promise<AxiosResponse<CustomerModel[],any>>{
        const headers = {'Authorization':store.getState().user.token}; // maybe I will do it another way
        return axios.get<CustomerModel[]>(UrlService.user,{headers});
    }


    public addCustomer(customer:CustomerReq):Promise<AxiosResponse<CustomerModel>>{
        const url = UrlService.admin+"/customer"; // to define it in UrlService
        return axios.post<CustomerModel>(url,customer);
    }

    public deleteCustomer(id:number):Promise<AxiosResponse<any>>{
        return axios.delete<any>(`${UrlService.allCustomers}/${id}`)
    }

    public updateCustomer(id: number, customer: CustomerReq): Promise<AxiosResponse<CustomerModel>> {
        //const headers = { 'Authorization': store.getState().userReducer.user.token }
        console.log("Helloooo")
        return axios.put(`${UrlService.admin}/customer/${id}`, customer);
    }
    
    public getSingleCustomer(customerId:number): Promise<AxiosResponse<CustomerModel>>{
        //  const headers = { 'Authorization': store.getState().userReducer.user.token }
        
        console.log('IM HERE')
        return axios.get(`${UrlService.admin}/customers/${customerId}`);

    }
    public PurchaseCoupon(customerId:number,couponId:number): Promise<AxiosResponse<CouponModel>>{
        console.log(`I'm going to purchase coupon ${couponId} for customer ${customerId} `)
        return axios.post(`${UrlService.customer}/${customerId}/coupons/${couponId}/purchase`)
    }

    public getCustomerCoupons(id:number): Promise<AxiosResponse<CouponModel[]>>{
        console.log(`I want to get the coupons of customer #${id}` )
        return axios.get(`${UrlService.customer}/${id}/coupons`);
    }
    public getCustomerCouponsByMaxPrice(id:number, price:number): Promise<AxiosResponse<CouponModel[]>>{
        console.log(`I want to get coupons by max price of customer ${id} and max price ${price}`)
        return axios.get(`${UrlService.customer}/${id}/coupons/price?max=${price}`)
    }
    public getCustomerCouponsByCategory(id: number, category: Category): Promise<AxiosResponse<CouponModel[]>> {
        return axios.get(`${UrlService.customer}/${id}/coupons/category?val=${Category[category]}`);
      }
    public deletePurchasedCoupon(couponId: number, customerId: number): Promise<AxiosResponse<any>> {
        return axios.delete<any>(`${UrlService.customer}/${customerId}/coupons/${couponId}/delete`);
      }   
      public getCustomerDetails(customerId:number): Promise<AxiosResponse<CustomersModel>>{
        //  const headers = { 'Authorization': store.getState().userReducer.user.token }
        console.log('IM HERE')
        return axios.get(`${UrlService.customer}/${customerId}/details`);

    }
}

const customerWebApiService = new WebApiService();

export default customerWebApiService;
