import React from "react";
import styled from "styled-components";

/* components */
import Header from "./Components/Header";
import AsideMenuBar from "./Components/AsideMenuBar";
import Footer from "./Components/Footer";
import GlobalModal from "./Components/ModalComponents/GlobalModal";
/* body */
import LoginContainer from "./Pages/Login/LoginContainer";
import WorkerAside from "./Pages/Worker/WorkerAside";
import UserAside from "./Pages/User/UserAside";
/* route components */
import PublicRoute from "./Route/PublicRoute";
import PrivateRoute from "./Route/PrivateRoute";

import { useSelector } from "react-redux";

function App() {
  const isLogin = useSelector((state) => state.login.isLogin);
  const userInfo = { permission: 9, name: "유저" };
  // 일반사용자 0 , 슈퍼관리자 9
  return (
    <>
      {isLogin && <Header name={userInfo.name}/>}
      <Body isLogin={isLogin}>
        {isLogin && <AsideMenuBar permission={userInfo.permission} />}
        <Section>
          {userInfo.permission === 9 && <WorkerAside />}
          {userInfo.permission === 0 && <UserAside />}
        </Section>
      </Body>
      {isLogin && <Footer />}
      <PublicRoute
        restricted={true}
        path="/login"
        component={LoginContainer}
        exact
      />
      <PrivateRoute path="/" exact>
        <div></div>
      </PrivateRoute>
      <GlobalModal /> {/* 모달 전역 제어 */}
    </>
  );
}

const Body = styled.div`
  display: grid;
  padding-top: ${(props) => (!props.isLogin ? "0rem" : "6.5rem")};
  grid-template-columns: 1fr 8fr;
  min-height: 1280px;
`;
const Section = styled.section`
  width: 100%;
`;


export default App;
