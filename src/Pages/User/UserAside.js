import React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../../Route/PrivateRoute";

import CurationDataListContainer from "../Common/CurationDataList/CurationDataListContainer"
import CurationDataDetailContainer from "../Common/CurationDataDetail/CurationDataDetailContainer";


function UserAside() {
  return (
    <Switch>
      <PrivateRoute
        path="/curation/list"
        component={CurationDataListContainer}
        exact
      />
      <PrivateRoute
        path="/curation/detail/:itemId"
        component={CurationDataDetailContainer}
        exact
      />
    </Switch>
  );
}

export default UserAside;
