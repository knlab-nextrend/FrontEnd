import React, { useEffect } from "react";
import styled from "styled-components";

/* components */
import Header from "./Components/Header";
import MainPage from "./Pages/Common/MainPage";
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

import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { RefreshTokenApi, userAuthApi } from "./Utils/api";
import { setUser } from "./Modules/user";
import { setTokens } from "./Utils/tokens";
import { setLogout } from "./Modules/login";

function App() {
  const isLogin = useSelector((state) => state.login.isLogin, shallowEqual);
  const userInfo = useSelector((state) => state.user.user, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogin) {
      userAuthApi()
        .then((res) => {
          dispatch(
            setUser({
              name: res.data.Name,
              permission: Number(res.data.Category),
            })
          );
        })
        .catch((err) => {
          if (err.response.status === 401) {
            RefreshTokenApi()
              .then((res) => {
                setTokens(res);
                userAuthApi().then((res) => {
                  dispatch(
                    setUser({
                      name: res.data.Name,
                      permission: Number(res.data.Category),
                    })
                  );
                });
              })
              .catch((err) => {
                if (err.response.status === 401) {
                  alert("세션만료");
                  localStorage.removeItem("token"); // 로컬스토리지에서 데이터 삭제
                  localStorage.removeItem("refreshToken"); // 로컬스토리지에서 데이터 삭제

                  window.location.href = "/login";
                }
              });
          }
        });
    }
  }, [isLogin]);
  useEffect(() => {
    console.log("userInfo");
  }, [userInfo]);
  return (
    <>
      {isLogin && <Header name={userInfo.name} />}
      {isLogin && (
        <Body isLogin={isLogin}>
          {isLogin && <AsideMenuBar permission={userInfo.permission} />}
          <Section>
            {userInfo.permission === 9 && <WorkerSection />}
            {userInfo.permission === 0 && <UserSection />}
            <PrivateRoute path="/" exact>
              <MainPage />
            </PrivateRoute>
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
