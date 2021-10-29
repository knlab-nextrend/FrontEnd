import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineSearch, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { BiRefresh } from "react-icons/bi";

function SearchOption({ Search }) {
  const [optionIsOpen, setOptionIsOpen] = useState(false);

  const [subscribedOption, setSubscribedOption] = useState([
    { value: 0, label: "전체" },
    { value: 1, label: "기조회" },
    { value: 2, label: "미조회" },
  ]);

  const [keyword, setKeyword] = useState("");
  const [duration, setDuration] = useState("전체");
  const [itemID, setItemID] = useState(0);
  const [lang, setLang] = useState("전체");
  const [subscribed, setSubscribed] = useState(0);

  const _keywordHandler = (e) => {
    setKeyword(e.target.value);
  };
  const _durationHandler = (e) => {
    setDuration(e.target.value);
  };
  const _itemIDHandler = (e) => {
    setItemID(e.target.value);
  };
  const _langHandler = (e) => {
    setLang(e.target.value);
  };
  const _subscribedHandler = (e) => {
    setSubscribed(e.target.value);
  };
  const _OptionReset = () => {
    setKeyword("");
    setDuration("전체");
    setItemID(0);
    setLang("전체");
    setSubscribed(0);
  };

  return (
    <>
      <Wrapper>
        <SearchBarContainer>
          <SearchBar>
            <AiOutlineSearch color="#BFBFBF" size="24" />
            <input
              type="text"
              placeholder="검색어를 입력하세요..."
              value={keyword}
              onChange={_keywordHandler}
            ></input>
          </SearchBar>
          <SearchButton
            color="#435269"
            onClick={() => {
              Search(keyword, duration, itemID, lang, subscribed);
            }}
          >
            검색
          </SearchButton>
          {optionIsOpen ? (
            <SearchButton
              color="#888888"
              onClick={() => {
                setOptionIsOpen(false);
              }}
            >
              <AiOutlineMinus />
              검색 조건 접기
            </SearchButton>
          ) : (
            <SearchButton
              color="#888888"
              onClick={() => {
                setOptionIsOpen(true);
              }}
            >
              <AiOutlinePlus />
              검색 조건 펼치기
            </SearchButton>
          )}
        </SearchBarContainer>
        {optionIsOpen && (
          <OptionContainer>
            <CustomInputContainer>
              <p>기간</p>
              <select value={duration} onChange={_durationHandler}>
                <option value="전체">전체</option>
                <option value="최근 1주일">최근 1주일</option>
                <option value="최근 1달">최근 1달</option>
                <option value="최근 1년">최근 1년</option>
              </select>
            </CustomInputContainer>
            <CustomInputContainer>
              <p>ITEM ID</p>
              <input value={itemID} type="number" min="0" onChange={_itemIDHandler} />
            </CustomInputContainer>
            <CustomInputContainer>
              <p>언어</p>
              <select value={lang} onChange={_langHandler}>
                <option value="전체">전체</option>
                <option value="한국">한국</option>
                <option value="미국">미국</option>
                <option value="일본">일본</option>
              </select>
            </CustomInputContainer>
            <CustomInputContainer>
              <p>조회 여부</p>
              <ButtonGroup>
                {subscribedOption.map((item, i) => {
                  return (
                    <button
                      key={i}
                      value={item.value}
                      onClick={_subscribedHandler}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </ButtonGroup>
            </CustomInputContainer>
            <ResetButton onClick={_OptionReset}>
              <BiRefresh size="24" />
              검색 조건 초기화
            </ResetButton>
          </OptionContainer>
        )}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;
const SearchBarContainer = styled.div`
  display: flex;
`;
const SearchBar = styled.div`
  height: 3rem;
  display: flex;
  width: 500px;
  align-items: center;
  padding-left: 1rem;
  border: solid 1px #d6d6d6;
  input {
    border: none;
    width: 100%;
    &:focus {
      outline: none;
    }
  }
`;

const ResetButton = styled.button`
  margin: 1rem;
  max-width: 150px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  background-color: #d6d6d6;
  &:hover {
    background-color: #eee;
  }
`;
const SearchButton = styled.button`
  width: 150px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  color: white;
  background-color: ${(props) => props.color || "grey"};
`;

const ButtonGroup = styled.div`
  display: flex;
  width: 100%;
  button {
    width: 100%;
    height: 40px;
    border: solid 1px #d6d6d6;
    background-color: white;
    cursor: pointer;
  }
`;
const OptionContainer = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 816px;
  border: solid 1px #d6d6d6;
`;

const CustomInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 2rem 0 2rem;
  position:relative;
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 45px;
    background-color: #d6d6d6;
    display: center;
    margin-right: 1rem;
    font-size: 12px;
  }
  input,
  select {
    padding-left: 0.5rem;
    height: 45px;
    width: 100%;
    border: solid 1px #d6d6d6;
  }
  input {
    height: 40px;
  }
`;

export default SearchOption;
