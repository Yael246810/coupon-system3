import { Category } from "./../Models/Admin";
import axios, { AxiosResponse } from "axios";
import UrlService from "./UrlService";
import { CompaniesModel } from "../Models/CompaniesModel";
import { CompanyReq } from "../Models/CompanyReq";
import { Category, CompanyModel, CouponModel } from "../Models/Admin";
import AuthorizationService from "./AuthorizationService";

const authService = new AuthorizationService();

class WebApiService {
  public getAllCompanies(): Promise<AxiosResponse<CompaniesModel[], any>> {
    return axios.get<CompaniesModel[]>(
      UrlService.allCompanies,
      authService.getHeaders()
    );
  }
  public addCompany(company: CompanyReq): Promise<AxiosResponse<CompanyModel>> {
    return axios.post<CompanyModel>(
      `${UrlService.admin}/company`,
      company,
      authService.getPostHeaders()
    );
  }

  public deleteCompany(id: number): Promise<AxiosResponse<any>> {
    return axios.delete<any>(
      `${UrlService.allCompanies}/${id}`,
      authService.getHeaders()
    );
  }

  public updateCompany(
    company: CompanyReq
  ): Promise<AxiosResponse<CompanyModel>> {
    return axios.put(
      `${UrlService.admin}/companies/company`,
      company,
      authService.getHeaders()
    );
  }

  public getSingleCompany(id: number): Promise<AxiosResponse<CompaniesModel>> {
    return axios.get(
      `${UrlService.admin}/companies/${id}`,
      authService.getHeaders()
    );
  }
  public getCompanyCoupons(id: number): Promise<AxiosResponse<CouponModel[]>> {
    return axios.get(
      `${UrlService.company}/${id}/coupons`,
      authService.getHeaders()
    );
  }
  public getCompanyCouponsByMaxPrice(
    id: number,
    price: number
  ): Promise<AxiosResponse<CouponModel[]>> {
    return axios.get(
      `${UrlService.company}/${id}/coupons/price?max=${price}`,
      authService.getHeaders()
    );
  }
  public getCompanyCouponsByCategory(
    id: number,
    category: Category
  ): Promise<AxiosResponse<CouponModel[]>> {
    return axios.get(
      `${UrlService.company}/${id}/coupons/category?val=${Category[category]}`,
      authService.getHeaders()
    );
  }
  public getCompanyDetails(
    companyId: number
  ): Promise<AxiosResponse<CompaniesModel>> {
    return axios.get(
      `${UrlService.company}/${companyId}/details`,
      authService.getHeaders()
    );
  }
}

const companyWebApiService = new WebApiService();

export default companyWebApiService;
