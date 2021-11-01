import React from "react";
import styled from "styled-components";

function Footer() {
  return (
    <>
      <FooterContainer>
        <ContentWrapper>
          <p>temp Footer</p>
        </ContentWrapper>
      </FooterContainer>
    </>
  );
}

const FooterContainer = styled.footer`
  background-color: #435269;
  display: flex;
  color: white;
  font-weight: bold;
  height: 10rem;
`;

const ContentWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: right;
`;

export default Footer;
