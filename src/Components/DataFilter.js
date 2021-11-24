import React, { useState } from "react";
import styled from "styled-components";
import { FaFilter } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

function DataFilter() {
  const [optionIsOpen, setOptionIsOpen] = useState(false);

  const _optionIsOpenHandler = () => {
    setOptionIsOpen(!optionIsOpen);
  };
  return (
    <>
      <Wrapper>
        <FilterHeader>
          <Title>
            <FaFilter size="24" color="#435269" />
            <p>검색 필터</p>
          </Title>
          <CustomButton onClick={_optionIsOpenHandler}>
            {optionIsOpen ? (
              <AiOutlineMinus size="24" />
            ) : (
              <AiOutlinePlus size="24" />
            )}
          </CustomButton>
        </FilterHeader>
        {optionIsOpen && <FilterBody>필터 바디</FilterBody>}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
  flex-direction: column;
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  align-items: center;
  border-bottom: solid 2px #bfbfbf;
`;
const Title = styled.div`
  display: flex;
  align-items: center;

  p {
    margin: 0 0 0 0.5rem;
    font-size: 22px;
    font-weight: bold;
    color: #435269;
  }
`;
const CustomButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;
const FilterBody = styled.div`
  padding: 1rem;
  border-bottom: solid 2px #bfbfbf;
`;

export default DataFilter;
