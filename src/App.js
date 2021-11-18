import React from "react";
import { Switch, Redirect } from "react-router-dom";
import styled from "styled-components";

/* components */
import Header from "./Components/Header";
import AsideMenuBar from "./Components/AsideMenuBar";
import Footer from "./Components/Footer";
import GlobalModal from "./Components/ModalComponents/GlobalModal";
/* body */
import LoginContainer from "./Pages/Login/LoginContainer";
import WorkerAside from "./Pages/Worker/WorkerAside";

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
          <WorkerAside/>
        </Section>
      </Body>
      {isLogin && <Footer />}

      <PublicRoute
        restricted={true}
        path="/login"
        component={LoginContainer}
        exact
      />
      <GlobalModal/> {/* 모달 전역 제어 */}
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
