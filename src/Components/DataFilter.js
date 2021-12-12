import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaFilter } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineSearch } from "react-icons/ai";
import { GrPowerReset } from "react-icons/gr";
import { MdSort } from "react-icons/md";
import { CategoryOptionFetchApi, CountryOptionFetchApi } from "../Utils/api";
function DataFilter() {
  const [optionIsOpen, setOptionIsOpen] = useState(false);
  const [startDate, setStartDate] = useState("1970-01-01"); // startDate
  const [endDate, setEndDate] = useState(
    new Date().toISOString().substring(0, 10)
  ); //endDate
  const [lang, setLang] = useState(""); // language
  const [site, setSite] = useState(""); // site
  const [keyword, setKeyword] = useState(""); // keyword
  const [isCrawled, setIsCrawled] = useState(true); // is_crawled 여부

  const [regiDateSort, setRegiDateSort] = useState(""); // 데이터 등록일
  const [writeDateSort, setWriteDateSort] = useState(""); // 원문 작성일
  const [collectDateSort, setCollectDateSort] = useState(""); // 원문 수집일

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [selectCategory, setSelectCategory] = useState({});
  const [selectCountry, setSelectCountry] = useState({});

  // 더미데이터
  const LANGUAGE_LIST = [
    { language_name: "한국어", language_code_name: "ko" },
    { language_name: "영어", language_code_name: "en" },
    { language_name: "일본어", language_code_name: "ja" },
  ];

  // 더미데이터
  const SITE_LIST = [
    { site_name: "capgemini", site_link: "www.capgemini.com" },
    { site_name: "meti", site_link: "www.meti.go.jp" },
  ];

  const _isCrawledHandler = (e) => {
    setIsCrawled(e.target.value);
  };
  const _siteHandler = (e) => {
    setSite(e.target.value);
  };
  const _optionIsOpenHandler = () => {
    setOptionIsOpen(!optionIsOpen);
  };
  const _langHandler = (e) => {
    setLang(e.target.value);
  };
  const _keywordHandler = (e) => {
    setKeyword(e.target.value);
  };

  const _regiDateSortHandler = (e) => {
    setRegiDateSort(e.target.value);
  };
  const _writeDateSortHandler = (e) => {
    setWriteDateSort(e.target.value);
  };
  const _collectDateSortHandler = (e) => {
    setCollectDateSort(e.target.value);
  };
  const _startDateHandler = (e) => {
    setStartDate(e.target.value);
  };
  const _endDateHandler = (e) => {
    if (_calcDateDifference(startDate, e.target.value)) {
      setEndDate(e.target.value);
    } else {
      alert("시간 선택이 잘못되었습니다.");
      setEndDate(new Date().toISOString().substring(0, 10));
    }
  };

  const _calcDateDifference = (start, end) => {
    if (Date.parse(new Date()) - Date.parse(end) < 0) {
      // 현재 시점에서 미래의 날짜는 선택할 수 없음
      return false;
    }
    return Date.parse(end) - Date.parse(start) >= 0 || false; // endDate가 startDate보다 과거라면 해당 날짜는 선택할 수 없음.
  };

  const selectedCode = (code) => {
    console.log(code);
  };
  useEffect(() => {
    CategoryOptionFetchApi().then((res) => {
      console.log(res.data);
      setCategoryOptions(res.data);
    });
    CountryOptionFetchApi().then((res) => {
      setCountryOptions(res.data);
      console.log(res.data);
    });
  }, []);
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
              <>
                <AiOutlineMinus />
                검색 필터 접기
              </>
            ) : (
              <>
                <AiOutlinePlus />
                검색 필터 펼치기
              </>
            )}
          </CustomButton>
        </FilterHeader>
        {optionIsOpen && (
          <>
            <FilterBody>
              <FilterBodyWrapper>
                <SubTitle>
                  <AiOutlineSearch />
                  검색 필터 설정
                </SubTitle>
                <OptionContainer>
                  <OptionRow>
                    <OptionCol>
                      <OptionTitle>기간</OptionTitle>
                      <OptionInput
                        onChange={_startDateHandler}
                        value={startDate}
                        type="date"
                      ></OptionInput>
                      <OptionInput
                        onChange={_endDateHandler}
                        value={endDate}
                        last
                        type="date"
                      ></OptionInput>
                    </OptionCol>
                  </OptionRow>
                  <OptionRow>
                    <OptionCol>
                      <OptionTitle>언어</OptionTitle>
                      <OptionSelect value={lang} onChange={_langHandler}>
                        <option value={""}>전체</option>
                        {LANGUAGE_LIST.map((item) => {
                          return (
                            <option value={item.site_name}>
                              {item.language_name}
                            </option>
                          );
                        })}
                        <option value="other">그외</option>
                      </OptionSelect>
                    </OptionCol>
                    <OptionCol>
                      <OptionTitle>사이트</OptionTitle>
                      <OptionSelect value={site} onChange={_siteHandler}>
                        <option value={""}>전체</option>
                        {SITE_LIST.map((item) => {
                          return (
                            <option value={item.site_link}>
                              {item.site_name}
                            </option>
                          );
                        })}
                        <option value="other">그외</option>
                      </OptionSelect>
                    </OptionCol>
                  </OptionRow>
                  <OptionRow>
                    <OptionCol>
                      <OptionTitle>키워드</OptionTitle>
                      <OptionInput
                        onChange={_keywordHandler}
                        value={keyword}
                        type="text"
                      ></OptionInput>
                    </OptionCol>
                    <OptionCol>
                      <OptionTitle>데이터 유형</OptionTitle>
                      <OptionSelect
                        value={isCrawled}
                        onChange={_isCrawledHandler}
                      >
                        <option value={null}>전체</option>
                        <option value={true}>크롤데이터</option>
                        <option value={false}>수기데이터</option>
                      </OptionSelect>
                    </OptionCol>
                  </OptionRow>
                  <OptionRow>
                    <OptionCol>
                      <OptionTitle>주제 분류 선택</OptionTitle>
                      <Cascader
                        getCategoryCode={selectedCode}
                        options={categoryOptions}
                      />
                    </OptionCol>
                  </OptionRow>
                  <OptionRow>
                    <OptionCol>
                      <OptionTitle>대상 국가 선택</OptionTitle>
                      <Cascader
                        getCategoryCode={selectedCode}
                        options={countryOptions}
                      />
                    </OptionCol>
                  </OptionRow>
                </OptionContainer>
              </FilterBodyWrapper>
              <FilterBodyWrapper>
                <SubTitle>
                  <MdSort />
                  정렬
                </SubTitle>
                <OptionContainer>
                  <OptionRow>
                    <OptionCol>
                      <OptionTitle>원문 수집일 순서</OptionTitle>
                      <OptionSelect
                        value={collectDateSort}
                        onChange={_collectDateSortHandler}
                      >
                        <option value="newest">최신순</option>
                        <option value="oldest">오래된 순</option>
                      </OptionSelect>
                    </OptionCol>
                    <OptionCol>
                      <OptionTitle>원문 발행일 순서</OptionTitle>
                      <OptionSelect
                        value={writeDateSort}
                        onChange={_writeDateSortHandler}
                      >
                        <option value="newest">최신순</option>
                        <option value="oldest">오래된 순</option>
                      </OptionSelect>
                    </OptionCol>
                    <OptionCol>
                      <OptionTitle>데이터 등록일 순서</OptionTitle>
                      <OptionSelect
                        value={regiDateSort}
                        onChange={_regiDateSortHandler}
                      >
                        <option value="newest">최신순</option>
                        <option value="oldest">오래된 순</option>
                      </OptionSelect>
                    </OptionCol>
                  </OptionRow>
                </OptionContainer>
                <FilterActions>
                  <button>
                    <GrPowerReset />
                    초기화
                  </button>
                  <button>
                    <AiOutlineSearch />
                    검색
                  </button>
                </FilterActions>
              </FilterBodyWrapper>
            </FilterBody>
          </>
        )}
      </Wrapper>
    </>
  );
}

function Cascader({ options, selectedCode }) {
  const [optionIsOpen, setOptionIsOpen] = useState(false);
  const _optionIsOpenHandler = () => {
    setOptionIsOpen(!optionIsOpen);
  };
  const PrintValue = (e) => {
    console.log(e.target.value);
    //selectedCode(e.target.value);
  };
  return (
    <CascaderWrapper>
      <CascaderOpenHandler onClick={_optionIsOpenHandler}>
        분류 선택
      </CascaderOpenHandler>
      {optionIsOpen && (
        <CascaderOptions onClick={PrintValue}>
          <ul className="depth1">
            {options.map((item, index) => {
              return (
                <>
                  <li key={index} value={item.value}>
                    {item.label}
                    {item.children.length !== 0 && (
                      <>
                        <ul className="depth2">
                          {item.children.map((item2, index2) => {
                            return (
                              <>
                                <li
                                  key={index2}
                                  value={item2.value}
                                >
                                  {item2.label}
                                  {item2.children.length !== 0 && (
                                    <>
                                      <ul className="depth3">
                                        {item2.children.map((item3, index3) => {
                                          return (
                                            <>
                                              <li
                                                key={index3}
                                                value={item3.value}
                                              >
                                                {item3.label}
                                              </li>
                                            </>
                                          );
                                        })}
                                      </ul>
                                    </>
                                  )}
                                </li>
                              </>
                            );
                          })}
                        </ul>
                      </>
                    )}
                  </li>
                </>
              );
            })}
          </ul>
        </CascaderOptions>
      )}
    </CascaderWrapper>
  );
}

const CascaderOpenHandler = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 30rem;
  cursor: pointer;
  background-color: white;
  border: solid 1px #d6d6d6;
  padding: 0 1rem 0 1rem;
  margin: 0;
`;
const CascaderWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  margin: 0 0.5rem 0 0.5rem;
  padding-left: 0.5rem;
`;

const CascaderOptions = styled.div`
  z-index: 8;
  position: relative;
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  li {
    background-color: white;
    width: 10rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid 1px #d6d6d6;
    word-break: keep-all;
    text-align: center;
  }
  .depth1 ul {
    display: none;
  }
  .depth1 li:hover {
    cursor: pointer;
    & > ul {
      display: block;
    }
  }
  .depth2,
  .depth3 {
    position: absolute;
    left: 10rem;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  flex-direction: column;
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 2px #bfbfbf;
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;

  p {
    margin: 0 0 0 0.5rem;
    font-size: 22px;
    font-weight: bold;
    color: #435269;
  }
`;
const SubTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding: 1rem;
  border-bottom: solid 1px #d6d6d6;
`;
const CustomButton = styled.button`
  border: none;
  cursor: pointer;
  height: 4rem;
  padding: 0 1rem 0 1rem;
  min-width: 15rem;
  color: white;
  background-color: #435269;
`;
const FilterBody = styled.div`
  padding: 1rem 0 1rem 0;
  border-bottom: solid 2px #bfbfbf;
`;
const FilterActions = styled.div`
  padding: 1rem 0 1rem 0;
  border-top: solid 1px #d6d6d6;
  display: flex;
  justify-content: right;
  button {
    width: 6rem;
    height: 3rem;
    margin: 0.5rem;
  }
`;

const FilterBodyWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const OptionContainer = styled.div``;

const OptionRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 45px;
  margin: 1rem;
`;

const OptionCol = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin: 0 1rem 0 1rem;
`;

const OptionTitle = styled.div`
  width: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  background-color: #d6d6d6;
  font-size: 12px;
  margin-right: 0.5rem;
  padding-left: 5px;
  padding-right: 5px;
  text-align: center;
  word-wrap: break-word;
`;

const OptionInput = styled.input`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  border: solid 1px #d6d6d6;
  margin: 0 0.5rem 0 0.5rem;
  padding-left: 0.5rem;
`;

const OptionSelect = styled.select`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  border: solid 1px #d6d6d6;
  margin: 0 0.5rem 0 0.5rem;
  padding-left: 0.5rem;
`;

/* antd 와 비슷한 cascader 제작을 위한 inner component*/

export default DataFilter;
