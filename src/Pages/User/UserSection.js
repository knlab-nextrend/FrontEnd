import React from "react";
import { Switch,Redirect } from "react-router-dom";
import PrivateRoute from "../../Route/PrivateRoute";

import UserOnlyDataLookUpPageContainer from "./UserOnlyDataLookUpPage/UserOnlyDataLookUpPageContainer"

function UserSection() {
  return (
    <Switch>
       <Redirect from="/home" to="/library" /> {/*사용자는 home에 접근 금지*/}
      <PrivateRoute
        path="/library"
        component={UserOnlyDataLookUpPageContainer}
        exact
      />
    </Switch>
  );
}

export default UserSection;
