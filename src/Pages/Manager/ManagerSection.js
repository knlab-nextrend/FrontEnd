import React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../../Route/PrivateRoute";

import ExcelDataRegisterContainer from "../Manager/ExcelDataRegister/ExcelDataRegisterContainer";
import UserManagementContainer from "../Manager/UserManagement/UserManagementContainer";
function UserSection() {
  return (
    <Switch>
      <PrivateRoute path="/user/" component={UserManagementContainer} exact />
      <PrivateRoute
        path="/excel/register"
        component={ExcelDataRegisterContainer}
        exact
      />
    </Switch>
  );
}

export default UserSection;