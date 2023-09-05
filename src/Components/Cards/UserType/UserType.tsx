import React from 'react';
import { useSelector } from 'react-redux';
import GetSingleCompany from '../Company/GetSingleCompany/GetSingleCompany';
import CompanyDetails from '../Company/GetCompanyDetails/GetCompanyDetails';
import { RootState } from '../../Redux/store';


function UserType() {
  const loggedInUser = useSelector((state: RootState) => state.user);

  return (
    <div className="UserComponent">
      {loggedInUser.Type === 'ADMIN' ? (
        <GetSingleCompany />
      ) : (
        <CompanyDetails companyId={loggedInUser.id} />
      )}
    </div>
  );
}

export default UserType;
