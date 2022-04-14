import React from "react";
import styled from "styled-components";

function Footer() {
  return (
    <>
      <FooterContainer>
        <ContentWrapper>
          <div className="title">회사명</div>
          <div>케이앤랩 (KNlab)</div>
        </ContentWrapper>
        <ContentWrapper>
          <div className="title">본사 소재지</div>
          <div>(우:34052) 대전광역시 유성구 전민로 74 만조빌딩 604</div>
        </ContentWrapper>
        <ContentWrapper>
          <div className="title">기업부설연구소</div>
          <div>서울특별시 금천구 디지털로 121, 에이스가산타워 601-1</div>
        </ContentWrapper>
        <ContentWrapper>
          <div>Copyright ⓒ 케이엔랩 All rights reserved. </div>
        </ContentWrapper>
        
      </FooterContainer>
    </>
  );
}

const FooterContainer = styled.footer`
  padding:3rem 0 3rem 0;
  background-color: #435269;
  display: flex;
  color: white;
  height: 10rem;
  flex-direction:column;

`;

const ContentWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  align-items: right;
  font-size:14px;
  padding-top:1rem;
  .title{
    font-weight:bold;
    min-width:8rem;
    text-align:left;
  }
  
`;

export default Footer;
