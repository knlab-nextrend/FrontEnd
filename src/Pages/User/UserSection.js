import React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../../Route/PrivateRoute";

import CurationDataListContainer from "../Common/CurationDataList/CurationDataListContainer"
import CurationDataDetailContainer from "../Common/CurationDataDetail/CurationDataDetailContainer";
import CrawlDataDetailContainer from "../Worker/CrawlDataDetail/CrawlDataDetailContainer"

function UserSection() {
  return (
    <Switch>
      <PrivateRoute
        path="/curation"
        component={CurationDataListContainer}
        exact
      />
      <PrivateRoute
        path="/curation/view/:itemId"
        component={CurationDataDetailContainer}
        exact
      />
        <PrivateRoute
        path="/curation/edit/:itemId"
        component={CrawlDataDetailContainer}
        exact
      />
    </Switch>
  );
}

export default UserSection;
