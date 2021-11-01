import React from "react";
import { Route, Redirect } from "react-router-dom";

/* 
    로그인한 상태에서만 접근 가능한 페이지다.
    로그인 여부를 확인하는 코드를 가져와야 한다 ?
*/

function PrivateRoute({ component: Component,isLogin, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}
export default PrivateRoute;
