import React, { useState } from "react";
import Login from "./Login";

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

  const login = () => {
    if (inputID === "") {
      setErrorMsg("아이디를 입력해주세요.");
    } else if (inputPW === "") {
      setErrorMsg("비밀번호를 입력해주세요.");
    } else {
      setErrorMsg("");
      LoginApi(inputId, inputPW).then((res) => {
        console.log(res);
      }).catch((err)=>{
          console.log(err)
      });
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
