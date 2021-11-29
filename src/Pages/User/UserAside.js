import React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../../Route/PrivateRoute";

import CurationDataListContainer from "./CurationDataList/CurationDataListContainer"


function UserAside() {
  return (
    <Switch>
      <PrivateRoute
        path="/curation/list"
        component={CurationDataListContainer}
        exact
      />
    </Switch>
  );
}

export default UserAside;
