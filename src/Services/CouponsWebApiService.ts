import axios, { AxiosResponse } from "axios";
import UrlService from "./UrlService";
import { CouponCompany } from "../Models/CouponCompany";
import AuthorizationService from "./AuthorizationService";

const authService = new AuthorizationService();

class WebApiService {
  public addCoupon(
    coupon: CouponCompany
  ): Promise<AxiosResponse<CouponCompany>> {
    return axios.post<CouponCompany>(
      `${UrlService.company}/coupon`,
      coupon,
      authService.getHeaders()
    );
  }

  public deleteCoupon(id: number): Promise<AxiosResponse<any>> {
    return axios.delete<any>(
      `${UrlService.company}/${id}`,
      authService.getHeaders()
    );
  }

  public updateCoupon(
    coupon: CouponCompany
  ): Promise<AxiosResponse<CouponCompany>> {
    return axios.put(
      `${UrlService.company}/coupon`,
      coupon,
      authService.getHeaders()
    );
  }
}

const couponWebApiService = new WebApiService();

export default couponWebApiService;
