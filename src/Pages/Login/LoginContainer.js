import React, { useState } from "react";
import Login from "./Login";
import { LoginApi } from "../../Utils/api";
import { useHistory } from "react-router-dom";

function LoginContainer({ setIsLogin }) {
  const history = useHistory();
  const [inputID, setInputID] = useState("");
  const [inputPW, setInputPW] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const _inputIDHandler = (e) => {
    setInputID(e.target.value);
  };
  const _inputPWHandler = (e) => {
    setInputPW(e.target.value);
  };

  const login = () => {
    if (inputID === "") {
      setErrorMsg("아이디를 입력해주세요.");
    } else if (inputPW === "") {
      setErrorMsg("비밀번호를 입력해주세요.");
    } else {
      setErrorMsg("");
      setIsLogin(true);
      history.push("/crawl/list/0")

      //   LoginApi(inputID, inputPW).then((res) => {
      //     console.log(res);
      //   }).catch((err)=>{
      //       console.log(err)
      //   });
    }
  };
  return (
    <>
      <Login
        _inputIDHandler={_inputIDHandler}
        _inputPWHandler={_inputPWHandler}
        login={login}
        errorMsg={errorMsg}
      />
    </>
  );
}

export default LoginContainer;
