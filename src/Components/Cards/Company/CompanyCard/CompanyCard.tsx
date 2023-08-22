import { CompaniesModel } from "../../../../Models/Company";
import "./CompanyCard.css";

interface CompanyCardProps{
    company:CompaniesModel;
  }
function CompanyCard(props:CompanyCardProps): JSX.Element {
    return (
        <div className="CompanyCard">
			<h3>{props.company.id}</h3>
            <p>{props.company.name}</p>
            <p>{props.company.email},{props.company.password}</p>
            <p>{(props.company.coupons?.length)>0 ?<span>This company has {props.company.coupons.length} coupons</span>
             : <span>No coupons</span>}</p>
        </div>
    );
}

export default CompanyCard;
