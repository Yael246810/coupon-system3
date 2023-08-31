import { Link } from "react-router-dom";
import { CompaniesModel } from "../../../../Models/CompaniesModel";
import "./CompanyCard.css";

interface CompanyCardProps{
    company:CompaniesModel;
  }
function CompanyCard(props:CompanyCardProps): JSX.Element {
    return (
        <div className="CompanyCard">
            <h3>{props.company.id}</h3>
      <p>{props.company.name},{props.company.email},{props.company.password}</p>
      <div className="row2">
      <Link to={`/admin/companies/update/${props.company.id}`}>
  <button>Update Company</button>
</Link>
<Link to={`/admin/companies/delete/${props.company.id}`}>
  <button>Delete Company</button>
</Link>
      </div>
        </div>
    );
}

export default CompanyCard;
