import React from "react";
import { Switch } from "react-router-dom";
import styled from "styled-components";

/* components */
import Header from "./Components/Header";
import AsideMenuBar from "./Components/AsideMenuBar";
import Footer from "./Components/Footer";

/* body */
import CrawlDataListContainer from "./Pages/CrawlDataList/CrawlDataListContainer";
import CrawlDataRegisterContainer from "./Pages/CrawlDataRegister/CrawlDataRegisterContainer";
import LoginContainer from "./Pages/Login/LoginContainer";

/* route components */
import PublicRoute from "./Route/PublicRoute";
import PrivateRoute from "./Route/PrivateRoute";

import { useSelector } from "react-redux";
import { isLogin } from "./Utils/login";

function App() {
  // const { isLogin } = useSelector((state) => ({
  //   isLogin: state.login.isLogin,
  // }));

  return (
    <>
      {isLogin() && <Header />}
      <Body isLogin={isLogin()}>
        {isLogin() && <AsideMenuBar />}
        <Section>
          <Switch>
            <PrivateRoute
              path="/crawl/list/:statusCode"
              component={CrawlDataListContainer}
              exact
            />
            <PrivateRoute
              path="/crawl/:statusCode/:itemId"
              component={CrawlDataRegisterContainer}
              exact
            />
          </Switch>
        </Section>
      </Body>
      {isLogin() && <Footer />}

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
