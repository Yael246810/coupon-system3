import { Link } from "react-router-dom";
import { CompaniesModel } from "../../../../Models/CompaniesModel";
import "./CompanyCard.css";

interface CompanyCardProps {
  company: CompaniesModel;
}
function CompanyCard(props: CompanyCardProps): JSX.Element {
  const couponListLength = props.company.coupons?.length || 0;

  return (
    <div className="CompanyCard">
        <div className="company-info">
          <p className="company-info-item">
            Id: {props.company.id}
          </p>
          <p className="company-info-item">Name: {props.company.name}</p>
          <p className="company-info-item">Email: {props.company.email}</p>
          <p className="company-info-item">
            Coupons: {couponListLength}
          </p>
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
