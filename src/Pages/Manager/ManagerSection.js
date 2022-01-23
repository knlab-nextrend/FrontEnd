import React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../../Route/PrivateRoute";

import ExcelDataRegisterContainer from "../Manager/ExcelDataRegister/ExcelDataRegisterContainer";
import UserManagementContainer from "../Manager/UserManagement/UserManagementContainer";
import DashboardContainer from "./Dashboard/DashboardContainer";
import CategoryManagementContainer from "./CategoryManagement/CategoryManagementContainer"
function UserSection() {
  return (
    <Switch>
      <PrivateRoute path="/user" component={UserManagementContainer} exact />
      <PrivateRoute path="/dashboard" component={DashboardContainer} exact />
      <PrivateRoute
        path="/excel/register"
        component={ExcelDataRegisterContainer}
        exact
      />
      <PrivateRoute
        path="/category"
        component={CategoryManagementContainer}
        exact
      />
    </Switch>
  );
}

export default UserSection;
