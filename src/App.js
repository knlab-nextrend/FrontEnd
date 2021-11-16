import React from "react";
import { Switch, Redirect } from "react-router-dom";
import styled from "styled-components";

/* components */
import Header from "./Components/Header";
import AsideMenuBar from "./Components/AsideMenuBar";
import Footer from "./Components/Footer";

/* body */
import CrawlDataListContainer from "./Pages/CrawlRefineList/CrawlRefineListContainer";
import LoginContainer from "./Pages/Login/LoginContainer";
import CrawlDataDetailContainer from "./Pages/CrawlDataDetail/CrawlDataDetailContainer";
import CrawlDataScreeningContainer from "./Pages/CrawlDataScreening/CrawlDataScreeningContainer";

/* route components */
import PublicRoute from "./Route/PublicRoute";
import PrivateRoute from "./Route/PrivateRoute";

import { useSelector } from "react-redux";

function App() {
  const isLogin = useSelector((state) => state.login.isLogin);
  return (
    <>
      {isLogin && <Header />}
      <Body isLogin={isLogin}>
        {isLogin && <AsideMenuBar />}
        <Section>
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
              path="/crawl/refine/:statusCode"
              component={CrawlDataListContainer}
              exact
            />
            <PrivateRoute
              path="/crawl/detail/:statusCode/:itemId"
              component={CrawlDataDetailContainer}
              exact
            />
          </Switch>
        </Section>
      </Body>
      {isLogin && <Footer />}

      <PublicRoute
        restricted={true}
        path="/login"
        component={LoginContainer}
        exact
      />
    </>
  );
}

const Body = styled.div`
  display: grid;
  padding-top: ${(props) => (!props.isLogin ? "0rem" : "6.5rem")};
  grid-template-columns: 1fr 8fr;
`;
const Section = styled.section`
  width: 100%;
`;

export default App;
