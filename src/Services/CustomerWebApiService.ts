import axios, { AxiosResponse } from "axios";
import { CustomerModel } from "../Models/Admin";
import UrlService from "./UrlService";
import { LoginReqModel, LoginResModel } from "../Models/Login";
import store from "../Components/Redux/store";
import { CustomerReq } from "../Models/CustomerReq";

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
}

const customerWebApiService = new WebApiService();

export default customerWebApiService;
