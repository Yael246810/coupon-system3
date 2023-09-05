import axios, { AxiosResponse } from "axios";
import { CouponModel } from "../Models/Admin";
import UrlService from "./UrlService";
import { CouponCompany } from "../Models/CouponCompany";

class WebApiService{

    public addCoupon(coupon:CouponCompany):Promise<AxiosResponse<CouponCompany>>{
        console.log("I want to add this coupon")
        return axios.post<CouponCompany>(`${UrlService.company}/coupon`,coupon);
    }

    public deleteCoupon(id:number):Promise<AxiosResponse<any>>{
        return axios.delete<any>(`${UrlService.company}/${id}`)
    }

    public updateCoupon(id: number, coupon: CouponModel): Promise<AxiosResponse<CouponModel>> {
        //const headers = { 'Authorization': store.getState().userReducer.user.token }
        return axios.put(`${UrlService.company}/coupon/${id}`, coupon);
    }
}

const couponWebApiService = new WebApiService();

export default couponWebApiService;