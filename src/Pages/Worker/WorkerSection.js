import React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../../Route/PrivateRoute";

import CrawlDataDetailContainer from "./CrawlDataDetail/CrawlDataDetailContainer";
import CrawlDataScreeningContainer from "./CrawlDataScreening/CrawlDataScreeningContainer";
import CrawlDataListContainer from "./CrawlDataList/CrawlDataListContainer";
import ArchiveDataListContainer from "./ArchiveDataList/ArchiveDataListContainer";
import CurationDataListContainer from "../Common/CurationDataList/CurationDataListContainer";
import CurationDataDetailContainer from "../Common/CurationDataDetail/CurationDataDetailContainer";

function WorkerSection() {
  return (
    <Switch>
      <PrivateRoute
        path="/crawl/screening"
        component={CrawlDataScreeningContainer}
        exact
      />
      <PrivateRoute
        path="/crawl/:statusCode"
        component={CrawlDataListContainer}
        exact
      />
      <PrivateRoute
        path="/archive"
        component={ArchiveDataListContainer}
        exact
      />
      <PrivateRoute
        path="/crawl/:statusCode/:itemId"
        component={CrawlDataDetailContainer}
        exact
      />
      <PrivateRoute
        path="/curation"
        component={CurationDataListContainer}
        exact
      />
      <PrivateRoute
        path="/curation/:itemId"
        component={CurationDataDetailContainer}
        exact
      />
    </Switch>
  );
}

export default WorkerSection;
