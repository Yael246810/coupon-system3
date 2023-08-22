import axios, { AxiosResponse } from "axios";
import { CustomerModel } from "../Models/Admin";
import UrlService from "./UrlService";
import { LoginReqModel, LoginResModel } from "../Models/Login";
import store from "../Components/Redux/store";

class WebApiService{

    public login(data:LoginReqModel):Promise<AxiosResponse<LoginResModel>>{
        return axios.post<LoginResModel>(UrlService.auth+"/login",data);
    }

    public getAllCustomers():Promise<AxiosResponse<CustomerModel[],any>>{
        return axios.get<CustomerModel[]>(UrlService.allCustomers);
    }

    public getAllCustomersAuth():Promise<AxiosResponse<CustomerModel[],any>>{
        const headers = {'Authorization':store.getState().userReducer.user.token}; // maybe I will do it another way
        return axios.get<CustomerModel[]>(UrlService.user,{headers});
    }


    public addCustomer(customer:CustomerModel):Promise<AxiosResponse<CustomerModel>>{
        return axios.post<CustomerModel>(UrlService.allCustomers,customer);
    }

    public deleteCustomer(id:number):Promise<AxiosResponse<any>>{
        return axios.delete<any>(`${UrlService.allCustomers}/${id}`)
    }
}

const webApiService = new WebApiService();

export default webApiService;
