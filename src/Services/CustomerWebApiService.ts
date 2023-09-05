import axios, { AxiosResponse } from "axios";
import { Category, CouponModel, CustomerModel } from "../Models/Admin";
import UrlService from "./UrlService";
import { LoginReqModel, LoginResModel } from "../Models/Login";
import { CustomerReq } from "../Models/CustomerReq";
import { CustomersModel } from "../Models/Customers";
import AuthorizationService from "./AuthorizationService";

const authService = new AuthorizationService();

class WebApiService{

    public login(data:LoginReqModel):Promise<AxiosResponse<LoginResModel>>{
        return axios.post<LoginResModel>(UrlService.auth+"/login",data);
    }

    public getAllCustomers():Promise<AxiosResponse<CustomerModel[],any>>{
        return axios.get<CustomerModel[]>(UrlService.allCustomers,authService.getPostHeaders());
    }
    
    public addCustomer(customer:CustomerReq):Promise<AxiosResponse<CustomerModel>>{
        return axios.post<CustomerModel>(`${UrlService.admin}/customer`,customer,authService.getPostHeaders());
    }

    public deleteCustomer(id:number):Promise<AxiosResponse<any>>{
        return axios.delete<any>(`${UrlService.allCustomers}/${id}`,authService.getPostHeaders())
    }

    public updateCustomer(id: number, customer: CustomerReq): Promise<AxiosResponse<CustomerModel>> {
        return axios.put(`${UrlService.admin}/customer/${id}`, customer,authService.getPostHeaders());
    }
    
    public getSingleCustomer(customerId:number): Promise<AxiosResponse<CustomerModel>>{
        console.log('IM HERE')
        return axios.get(`${UrlService.admin}/customers/${customerId}`,authService.getPostHeaders());
    }
    public PurchaseCoupon(customerId:number,couponId:number): Promise<AxiosResponse<CouponModel>>{
        console.log(`I'm going to purchase coupon ${couponId} for customer ${customerId}`)
        return axios.post(`${UrlService.customer}/${customerId}/coupons/${couponId}/purchase`, null, authService.getPostHeaders())
    }

    public getCustomerCoupons(id:number): Promise<AxiosResponse<CouponModel[]>>{
        console.log(`I want to get the coupons of customer #${id}`,authService.getHeaders())
        return axios.get(`${UrlService.customer}/${id}/coupons`,authService.getHeaders());
    }
    public getCustomerCouponsByMaxPrice(id:number, price:number): Promise<AxiosResponse<CouponModel[]>>{
        return axios.get(`${UrlService.customer}/${id}/coupons/price?max=${price}`,authService.getHeaders())
    }
    public getCustomerCouponsByCategory(id: number, category: Category): Promise<AxiosResponse<CouponModel[]>> {
        return axios.get(`${UrlService.customer}/${id}/coupons/category?val=${Category[category]}`,authService.getHeaders()); // doesn't update the added coupons
      }
    public deletePurchasedCoupon(couponId: number, customerId: number): Promise<AxiosResponse<any>> {
        return axios.delete<any>(`${UrlService.customer}/${customerId}/coupons/${couponId}/delete`,authService.getHeaders());
      }   
      public getCustomerDetails(customerId:number): Promise<AxiosResponse<CustomersModel>>{
        return axios.get(`${UrlService.customer}/${customerId}/details`,authService.getHeaders());
    }
}

const customerWebApiService = new WebApiService();

export default customerWebApiService;
