import React from "react";
import styled from "styled-components";
function CountryCategoryModal() {
  return (
    <>
      <ModalWrapper>
        <Modalheader>국가 설정</Modalheader>
        <ModalBody>국가 설정 띄울거임</ModalBody>
        <ModalActions>
          <Button color="#6DAF44">
            <p>저장</p>
          </Button>
          <Button color="#dc3545">
            <p>취소</p>
          </Button>
        </ModalActions>
      </ModalWrapper>
    </>
  );
}

const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 0.25rem;
  padding: 1.5rem;
`;
const Modalheader = styled.div`
  justify-content: left;
  font-size: 24px;
  margin-bottom: 1rem;
  font-weight:bold;
  color:rgba(0, 0, 0, 0.7);

`;

const ModalBody = styled.div`
  margin-bottom: 1rem;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: right;
  flex-direction: row;
`;

const Button = styled.button`
  background-color: ${(props) => props.color || "grey"};
  cursor: pointer;
  min-width:5rem;
  border:none;
  border-radius:4px;
  color:white;
  font-weight:bold; 
  margin: 0 0.5rem 0 0.5rem;
`;
export default CountryCategoryModal;
