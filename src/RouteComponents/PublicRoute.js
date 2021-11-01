import React from "react";
import { Route, Redirect } from "react-router-dom";

/* 
    restricted 는 로그인 한 상태에서는 접근할 수 없는 사이트이며, 메인페이지로 이동한다.
    로그인 여부를 확인하는 코드를 가져와야 한다 ?
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