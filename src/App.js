import React, { useState } from "react";
import {Switch } from "react-router-dom";
import styled from "styled-components";

/* components */
import Header from "./Components/Header";
import AsideMenuBar from "./Components/AsideMenuBar";
import Footer from "./Components/Footer";

/* body */
import CrawlDataListContainer from "./Pages/CrawlDataList/CrawlDataListContainer";
import ScreeningContainer from "./Pages/Screening/ScreeningContainer";
import LoginContainer from "./Pages/Login/LoginContainer";


/* route components */
import PublicRoute from "./Route/PublicRoute";
import PrivateRoute from "./Route/PrivateRoute";
import {isLogin} from './Utils/login'

function App() {
  return (
    <>
      {isLogin() ? (
        <>
          <Header />
          <Body>
            <AsideMenuBar />
            <Section>
              <Switch>
                <PrivateRoute path="/crawl/list/:statusCode" exact>
                  <CrawlDataListContainer />
                </PrivateRoute>
                <PrivateRoute path="/crawl/screening" exact>
                  <ScreeningContainer />
                </PrivateRoute>
              </Switch>
            </Section>
          </Body>
          <Footer />
        </>
      ) : (
        <PublicRoute restricted={true} path="/login" exact>
          <LoginContainer/>
        </PublicRoute>
      )}
    </>
  );
}

const Body = styled.div`
  display: grid;
  padding-top: 6.5rem; // header 때문에
  grid-template-columns: 1fr 8fr;
`;
const Section = styled.section`
  width: 100%;
`;

export default App;
