import { useEffect, useState } from "react";
import "./CompaniesList.css";
import axios from "axios";
import { CompanyModel } from "../../../Models/Admin";
import CompanyCard from "../../Cards/Company/CompanyCard/CompanyCard";
import UrlService from "../../../Services/UrlService";
import notifyService from "../../../Services/NotificationService";

function CompaniesList(): JSX.Element {
    const[companies,setCompanies]= useState<CompanyModel[]>([]);
    useEffect(()=>{
        const url = UrlService.allCompanies;
        console.log(url);
        axios.get<CompanyModel[]>(UrlService.allCompanies)
        .then(res=>
            {console.log(res.data);
            setCompanies(res.data);
            notifyService.success('Succeeded to upload the companies list');
        })
        .catch(err => {
            console.log(err);
            notifyService.error('Failed to upload the companies list: ' + err);
        });
  }, []);

    return (
        <div className="CompaniesList">
			<h1>Companies list</h1>
            {
                companies.map((c,idx)=><CompanyCard key={`customer-card-${idx}`} company={c}/>)
            }
        </div>
    );
}

export default CompaniesList;
