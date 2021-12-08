import React, { useEffect } from "react";
import styled from "styled-components";

/* components */
import Header from "./Components/Header";
import AsideMenuBar from "./Components/AsideMenuBar";
import Footer from "./Components/Footer";
import GlobalModal from "./Components/ModalComponents/GlobalModal";
/* body */
import LoginContainer from "./Pages/Common/Login/LoginContainer";
import WorkerSection from "./Pages/Worker/WorkerSection";
import UserSection from "./Pages/User/UserSection";
/* route components */
import PublicRoute from "./Route/PublicRoute";
import PrivateRoute from "./Route/PrivateRoute";

import { useSelector, useDispatch } from "react-redux";
import { userAuthApi } from "./Utils/api";
import { setUser } from "./Modules/login";
function App() {

  const dispatch = useDispatch();

  const isLogin = useSelector((state) => state.login.isLogin);
  const userInfo = useSelector((state) => state.login.user);
  
  // 일반사용자 0 , 슈퍼관리자 9

  useEffect(() => {
    if (isLogin) {
      userAuthApi().then((res) => {
        const _userObj = {
          name: res.data.Name,
          permission: Number(res.data.Category),
        };
        dispatch(setUser(_userObj));
      });
    }
  }, [isLogin]);


  return (
    <>
      {isLogin && <Header name={userInfo.name} />}
      {isLogin && (
        <Body isLogin={isLogin}>
          {isLogin && <AsideMenuBar permission={userInfo.permission} />}
          <Section>
            {userInfo.permission === 9 && <WorkerSection />}
            {userInfo.permission === 0 && <UserSection />}
          </Section>
        </Body>
      )}
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
