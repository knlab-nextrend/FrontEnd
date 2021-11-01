import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";

/* components */
import Header from "./Components/Header";
import AsideMenuBar from "./Components/AsideMenuBar";
import Footer from "./Components/Footer";

/* body */
import CrawlDataListContainer from "./Pages/CrawlDataList/CrawlDataListContainer";
import LoginContainer from "./Pages/Login/LoginContainer";

/* route components */
import PublicRoute from "./RouteComponents/PublicRoute";
import PrivateRoute from "./RouteComponents/PrivateRoute";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      {isLogin ? (
        <>
          <Header />
          <Body>
            <AsideMenuBar />
            <Section>
              <Switch>
                <PrivateRoute isLogin={isLogin} path="/crawl/list/:statusCode" exact>
                  <CrawlDataListContainer />
                </PrivateRoute>
              </Switch>
            </Section>
          </Body>
          <Footer />
        </>
      ) : (
        <PublicRoute isLogin={isLogin} restricted={true} path="/login" exact>
          <LoginContainer setIsLogin={setIsLogin}/>
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
