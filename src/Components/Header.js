import React from "react";
import styled from "styled-components";
import {setLogout} from '../Utils/login'

function Header() {
  const goNextrendPage = () => {
    window.open("http://nextrend.kr/index.php");
  };
  return (
    <>
      <HeaderContainer>
        <ContentWrapper>
          <Logo
            onClick={goNextrendPage}
            src={"../../img/logo4.png"}
          />
          <LoginInfo>
            <p className="userName">관리자</p>
            <p className="greetings">님 안녕하세요.</p>
            <button onClick={setLogout}>로그아웃</button>
          </LoginInfo>
        </ContentWrapper>
      </HeaderContainer>
    </>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: row;
  height: 6rem;
  border-bottom: solid 0.5rem #435269;
  align-items: center;
  position: fixed; // 상단고정
  background-color: white;
  width: 100%;
  z-index: 9; // 맨 위에
`;

const ContentWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.img`
  height: 4rem;
  cursor: pointer;
`;

const LoginInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  .userName {
    font-weight: bold;
  }
  button {
    margin-left: 1rem;
    height: 2rem;
    border: none;
    padding: 0 1rem 0 1rem;
    border-radius: 5px;
    background-color: #435269;
    color: white;
    font-weight: bold;
    cursor:pointer;
  }
`;
export default Header;
