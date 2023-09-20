import React from "react";
import { useDispatch } from "react-redux";
import "./DeleteCompany.css";
import { useNavigate, useParams } from "react-router-dom";
import notifyService from "../../../../Services/NotificationService";
import { deletedCompanyAction } from "../../../Redux/CompanyAppState";
import companyWebApiService from "../../../../Services/CompanyWebApiService";

function DeleteCompany(): JSX.Element {
  const dispatch = useDispatch();
  const params = useParams();
  const id = +(params.id || 0);

  const navigate = useNavigate();

  const yes = () => {
    companyWebApiService
      .deleteCompany(id)
      .then((res) => {
        notifyService.success(`Deleted company #${id}`);
        dispatch(deletedCompanyAction(id));
        navigate(-1);
      })
      .catch((err) => notifyService.error(err));
  };

  const no = () => {
    navigate(-1);
  };

  return (
    <div className="delete-container">
      <h2>Delete Company</h2>
      <p className="delete-message">
        Are you sure you want to delete company #{id}?
      </p>
      <div className="delete-button-container">
        <button className="delete-button" onClick={yes}>
          Delete
        </button>
        <button className="cancel-button" onClick={no}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteCompany;
