import axios, { AxiosResponse } from "axios";
import { CouponModel, CouponNoCompanyOrCustomerModel } from "../Models/Admin";
import UrlService from "./UrlService";
import { CouponCompany } from "../Models/CouponCompany";
import AuthorizationService from "./AuthorizationService";

const authService = new AuthorizationService();

class WebApiService{

    public addCoupon(coupon:CouponCompany):Promise<AxiosResponse<CouponCompany>>{
        console.log("I want to add this coupon" +coupon)
        return axios.post<CouponCompany>(`${UrlService.company}/coupon`,coupon);
    }

    public deleteCoupon(id:number):Promise<AxiosResponse<any>>{
        return axios.delete<any>(`${UrlService.company}/${id}`,authService.getHeaders())
    }

    public updateCoupon(coupon: CouponCompany): Promise<AxiosResponse<CouponCompany>> {
        //const headers = { 'Authorization': store.getState().userReducer.user.token }
        return axios.put(`${UrlService.company}/coupon`, coupon);
    }
}

const couponWebApiService = new WebApiService();

export default couponWebApiService;