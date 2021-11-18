import React,{useEffect} from "react";
import {Route,Redirect,Switch} from "react-router-dom";
import PrivateRoute from "../../Route/PrivateRoute";

import CrawlDataDetailContainer from "./CrawlDataDetail/CrawlDataDetailContainer";
import CrawlDataScreeningContainer from "./CrawlDataScreening/CrawlDataScreeningContainer";
import CrawlDataListContainer from "./CrawlDataList/CrawlDataListContainer";
import UserManagementContainer from "../Manager/UserManagement/UserManagementContainer";

function WorkerAside(){
    return(
        <Switch>
            <PrivateRoute path="/" exact>
              <div></div>
            </PrivateRoute>

            <PrivateRoute
              path="/crawl/screening"
              component={CrawlDataScreeningContainer}
              exact
            />
            <PrivateRoute
              path="/crawl/list/:statusCode"
              component={CrawlDataListContainer}
              exact
            />
            <PrivateRoute
              path="/crawl/detail/:statusCode/:itemId"
              component={CrawlDataDetailContainer}
              exact
            />

            <PrivateRoute
              path="/user/"
              component={UserManagementContainer}
              exact
            />
          </Switch>
    );
}

export default WorkerAside;