import { useEffect, useState } from "react";
import "./CompaniesList.css";
import { CompanyModel } from "../../../Models/Admin";
import CompanyCard from "../../Cards/Company/CompanyCard/CompanyCard";
import notifyService from "../../../Services/NotificationService";
import store from "../../Redux/store";
import TotalCompanies from "../../Cards/Company/TotalCompanies/TotalCompanies";
import EmptyView from "../../Pages/EmptyView/EmptyView";
import companyWebApiService from "../../../Services/CompanyWebApiService";
import { gotAllCompaniesAction } from "../../Redux/CompanyAppState";
import { useDispatch } from "react-redux";

function CompaniesList(): JSX.Element {
    const[companies,setCompanies]= useState<CompanyModel[]>(store.getState().companies.companies);
    const dispatch = useDispatch();

    useEffect(()=>{
        if (companies.length === 0) {
        companyWebApiService.getAllCompanies()
        .then(res => {
            dispatch(gotAllCompaniesAction(res.data));
            setCompanies(res.data)
            notifyService.success('Succeeded to upload the companies list');
        })
        .catch(err => {
            console.log(err);
            notifyService.error('Failed to upload the companies list: ' + err);
        });
    }
  }, [companies,dispatch]);

    return (
        <div className="CompaniesList">
            <TotalCompanies/>
			<h1>Companies list</h1>
            {
                companies.length !== 0 ?
                companies.map((c, idx) => <CompanyCard key={`customer-card-${idx}`} company={c} />) :
                <EmptyView msg="There are no companies available at the moment"/>
            }
        </div>
    );
}

export default CompaniesList;

