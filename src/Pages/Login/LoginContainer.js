import React, { useState } from "react";
import Login from "./Login";
import { LoginApi } from "../../Utils/api";
import { useHistory } from "react-router-dom";
import {setLogin} from '../../Utils/login'

function LoginContainer() {
  const [inputID, setInputID] = useState("");
  const [inputPW, setInputPW] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const _inputIDHandler = (e) => {
    setInputID(e.target.value);
  };
  const _inputPWHandler = (e) => {
    setInputPW(e.target.value);
  };

  const loginFunc = () => {
    if (inputID === "") {
      setErrorMsg("아이디를 입력해주세요.");
    } else if (inputPW === "") {
      setErrorMsg("비밀번호를 입력해주세요.");
    } else {
      setErrorMsg("");
      LoginApi(inputID, inputPW)
        .then((res) => {
          const _token = res.data.token;
          const _refreshToken = res.data.token;
          const _permission = res.data.permission;
          setLogin(_token,_refreshToken,_permission)
        })
        .catch((err) => {
          if (err.response.status === 401) {
            alert("아이디 또는 비밀번호가 일치하지 않습니다.");
          }
        });
    }
  };
  return (
    <>
      <Login
        _inputIDHandler={_inputIDHandler}
        _inputPWHandler={_inputPWHandler}
        errorMsg={errorMsg}
        loginFunc={loginFunc}
      />
    </>
  );
}

export default LoginContainer;
