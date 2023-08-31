import axios, { AxiosResponse } from "axios";
import UrlService from "./UrlService";
import store from "../Components/Redux/store";
import { CompaniesModel } from "../Models/CompaniesModel";
import { CompanyReq } from "../Models/CompanyReq";
import { CompanyModel, CouponModel } from "../Models/Admin";

class WebApiService{

    public getAllCompanies():Promise<AxiosResponse<CompaniesModel[],any>>{
        return axios.get<CompaniesModel[]>(UrlService.allCompanies);
    }

    public getAllCompaniesAuth():Promise<AxiosResponse<CompaniesModel[],any>>{
        const headers = {'Authorization':store.getState().user.token}; // maybe I will do it another way
        return axios.get<CompaniesModel[]>(UrlService.user,{headers});
    }


    public addCompany(company:CompanyReq):Promise<AxiosResponse<CompanyModel>>{
        const url = UrlService.admin+"/company"; // to define it in UrlService
        return axios.post<CompanyModel>(url,company);
    }

    public deleteCompany(id:number):Promise<AxiosResponse<any>>{
        return axios.delete<any>(`${UrlService.allCompanies}/${id}`)
    }

    public updateCompany(company: CompanyReq): Promise<AxiosResponse<CompanyModel>> {
        //const headers = { 'Authorization': store.getState().userReducer.user.token }
        console.log("Hello updated company!!!")
        return axios.put(`${UrlService.admin}/companies/company`, company);
    }

    public getSingleCompany(id:number): Promise<AxiosResponse<CompaniesModel>>{
        //const headers = { 'Authorization': store.getState().userReducer.user.token }
        return axios.get(`${UrlService.admin}/companies/${id}`);
    }
    public getCompanyCoupons(id:number): Promise<AxiosResponse<CouponModel[]>>{
        console.log(`I want to get the coupons of company #${id}` )
        return axios.get(`${UrlService.company}/${id}/coupons`);
    }
    public getCompanyCouponsByMaxPrice(id:number, price:number): Promise<AxiosResponse<CouponModel[]>>{
        console.log(`I want to get coupons by max price of company ${id} and max price ${price}`)
        return axios.get(`${UrlService.company}/${id}/coupons/price?max=${price}`)
    }
    public getCompanyCouponsByCategory(id:number): Promise<AxiosResponse<CouponModel[]>>{
        return axios.get(`${UrlService.company}/${id}/coupons/category`)
    }
}

const companyWebApiService = new WebApiService();

export default companyWebApiService;
