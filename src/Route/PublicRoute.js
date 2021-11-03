import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "../Utils/login"; // 로그인 여부를 확인하는 함수

/* 
    restricted 는 로그인 한 상태에서는 접근할 수 없는 사이트이며, 
    로그인 상태에서 해당 페이지에 접근하려 하면 메인페이지로 리다이렉트 시킨다.
*/
function PublicRoute({ component: Component, restricted, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() && restricted ? (
          <Redirect to="/main" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}
export default PublicRoute;
