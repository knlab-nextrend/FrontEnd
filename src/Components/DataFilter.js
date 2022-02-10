import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaFilter } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineSearch } from "react-icons/ai";
import { CategoryOptionFetchApi, CountryOptionFetchApi } from "../Utils/api";
function DataFilter({ dataFilterFetch = null, type }) {
  const [optionIsOpen, setOptionIsOpen] = useState(false);

  const [keyword, setKeyword] = useState(""); // keyword
  const [isCrawled, setIsCrawled] = useState(true); // is_crawled 여부

  // 스크리닝 부터 사용되는 필터들
  const [sort, setSort] = useState("");
  const [dateRange, setDateRange] = useState("all"); // 날짜 범위를 지정할 수 있도록 함. 기본 값은 전체
  /* 
    all : 전체 범위
    past_week : 최근 1주
    past_month : 최근 1달
    past_3_month : 최근 3달
    past_6_month : 최근 6달
    past_year : 최근 1년
    past_3_year : 최근 3년
    custom_range : 직접 설정
  */
  const [isDateRange, setIsDateRange] = useState(false); // 날짜 범위를 직접 설정할 것인지 아닌지 ...
  const [sortType, setSortType] = useState("dc_dt_collect");
  const [dateGte, setDateGte] = useState("2019-01-01"); // 임시 값. 현재 시각 기준 3년 전으로 설정 할 예정...
  const [dateLte, setDateLte] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [pageGte, setPageGte] = useState(0);
  const [pageLte, setPageLte] = useState(0);

  const [host, setHost] = useState("");
  const [lang, setLang] = useState(""); // language
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [selectCategory, setSelectCategory] = useState(0);
  const [selectCountry, setSelectCountry] = useState(0);

  const _isCrawledHandler = (e) => {
    setIsCrawled(e.target.value);
  };
  const _optionIsOpenHandler = () => {
    setOptionIsOpen(!optionIsOpen);
  };
  const _langHandler = (e) => {
    setLang(e.target.value);
  };
  const _hostHandler = (e) => {
    setHost(e.target.value);
  };

  const _sortTypeHandler = (e) => {
    setSortType(e.target.value);
  };
  const _sortHandler = (e) => {
    setSort(e.target.value);
  };
  const _dateGteHandler = (e) => {
    setDateGte(e.target.value);
  };
  const _dateLteHandler = (e) => {
    if (_calcDateDifference(dateLte, e.target.value)) {
      setDateLte(e.target.value);
    } else {
      alert("시간 선택이 잘못되었습니다.");
      setDateLte(new Date().toISOString().substring(0, 10));
    }
  };
  const _pageGteHandler = (e) => {
    setPageGte(e.target.value);
  };
  const _pageLteHandler = (e) => {
    setPageLte(e.target.value);
  };

  const _dateRangeHandler = (e) => {
    setDateRange(e.target.value);
    setIsDateRange(e.target.value === "custom_range" ? true : false); // 직접 설정일 경우 ..
  };

  const _calcDateDifference = (start, end) => {
    if (Date.parse(new Date()) - Date.parse(end) < 0) {
      // 현재 시점에서 미래의 날짜는 선택할 수 없음
      return false;
    }
    return Date.parse(end) - Date.parse(start) >= 0 || false; // endDate가 startDate보다 과거라면 해당 날짜는 선택할 수 없음.
  };

  const selectedCategory = (code) => {
    setSelectCategory(code);
  };
  const selectedCountry = (country) => {
    setSelectCountry(country);
  };

  const searchFilter = () => {
    dataFilterFetch(
      lang === "" ? null : lang,
      selectCategory === 0 ? null : selectCategory,
      keyword === "" ? null : keyword,
      selectCountry === 0 ? null : selectCountry,
      dateRange==="all" ?  null : dateGte, // 전체 범위 제외 하고는 날짜 범위를 주어야 한다. 
      dateRange==="all" ? null : dateLte, // 전체 범위 제외하고는 날짜 범위를 주어야 한다. 
      pageGte === 0 && pageLte === 0 ? null : pageGte, //Gte, Lte 둘 다 0이라면 보낼 이유가 없다. ..
      pageGte === 0 && pageLte === 0 ? null : pageLte,
      type === "archive" ? isCrawled : null,
      sort === "" ? null : sort, // 정렬 순서
      sortType, // 정렬 날짜 타입
      host === "" ? null : host
    );
  };

  // 설정 완료 해야함
  const searchReset = () => {
    setLang("");
    setSelectCategory(0);
    setSelectCountry(0);
    setKeyword("");
    setIsCrawled(true);
  };

  useEffect(()=>{
    const _dateGte = new Date(); // 오늘 날짜
    if(dateRange === "past_week"){
      _dateGte.setDate(_dateGte.getDate() - 7); // 7일. 1주일 전
    }
    else if(dateRange === "past_month"){
      _dateGte.setMonth(_dateGte.getMonth() - 1); // 1달 전
    }
    else if(dateRange === "past_3_month"){
      _dateGte.setMonth(_dateGte.getMonth() - 3); // 3달 전
    }
    else if(dateRange === "past_6_month"){
      _dateGte.setMonth(_dateGte.getMonth() - 6); // 6달 전
    }
    else if(dateRange === "past_year"){
      _dateGte.setFullYear(_dateGte.getFullYear() - 1); // 1년 전
    }
    else if(dateRange === "past_3_year"){
      _dateGte.setFullYear(_dateGte.getFullYear() - 3); // 3년 전
    }
    setDateGte(_dateGte.toISOString().substring(0,10));

    console.log(_dateGte.toISOString().substring(0,10))
  },[dateRange])
  useEffect(() => {
    CategoryOptionFetchApi().then((res) => {
      setCategoryOptions(res.data);
    });
    CountryOptionFetchApi().then((res) => {
      setCountryOptions(res.data);
    });
  }, []);
  return (
    <>
      <Wrapper>
        <FilterHeader>
          <Title>
            <FaFilter color="#435269" />
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
                <OptionContainer>
                  <OptionRow>
                    <OptionCol>
                      <OptionTitle>기간</OptionTitle>
                      <OptionSelect
                        value={sortType}
                        onChange={_sortTypeHandler}
                      >
                        <option value="dc_dt_collect">원문 수집일 기준</option>
                        {type !== "screening" && (
                          <>
                            <option value="dc_dt_write">
                              원문 작성일 기준
                            </option>
                            <option value="dc_dt_pub">원문 공개일 기준</option>
                            <option value="dc_dt_regi">문서 등록일 기준</option>
                            <option value="dc_dt_modi">문서 수정일 기준</option>
                          </>
                        )}
                      </OptionSelect>

                      <OptionSelect value={dateRange} onChange={_dateRangeHandler}>
                        <option disabled default>
                          기간 설정
                        </option>
                        <option value="all">전체</option>
                        <option value="past_week" >최근 1주</option>
                        <option value="past_month">최근 1개월</option>
                        <option value="past_3_month">최근 3개월</option>
                        <option value="past_6_month">최근 6개월</option>
                        <option value="past_year">최근 1년</option>
                        <option value="past_3_year">최근 3년</option>
                        <option value="custom_range">직접 설정</option>
                      </OptionSelect>
                      {isDateRange && (
                        <>
                          <OptionInput
                            onChange={_dateGteHandler}
                            value={dateGte}
                            type="date"
                          ></OptionInput>
                          <OptionInput
                            onChange={_dateLteHandler}
                            value={dateLte}
                            last
                            type="date"
                          ></OptionInput>
                        </>
                      )}

                      <OptionSelect value={sort} onChange={_sortHandler}>
                        <option value="default">기본</option>
                        <option value="desc">최신순</option>
                        <option value="asc">오래된 순</option>
                      </OptionSelect>
                    </OptionCol>
                  </OptionRow>
                  <OptionRow>
                    <OptionCol>
                      <OptionTitle>언어</OptionTitle>
                      <OptionInput
                        onChange={_langHandler}
                        placeholder="검색하고자 하는 언어 코드를 입력하세요 ( ex. ko, ja, en ... )"
                        type="text"
                      ></OptionInput>
                    </OptionCol>
                    <OptionCol>
                      <OptionTitle>HOST 명</OptionTitle>
                      <OptionInput
                        type="text"
                        onChange={_hostHandler}
                        placeholder="검색하고자 하는 HOST명을 입력하세요 ( ex. www.meti.go.jp )"
                      ></OptionInput>
                    </OptionCol>
                  </OptionRow>
                  <OptionRow>
                    <OptionCol>
                      <OptionTitle>페이지 수</OptionTitle>
                      <OptionInput
                        onChange={_pageGteHandler}
                        value={pageGte}
                        type="number"
                        placeholder="페이지 수 범위 시작 (ex. 10 )"
                        min="0"
                      ></OptionInput>
                      <OptionInput
                        onChange={_pageLteHandler}
                        value={pageLte}
                        last
                        type="number"
                        placeholder="페이지 수 범위 끝 (ex. 50 )"
                        min="0"
                      ></OptionInput>
                    </OptionCol>
                    {type === "archive" && (
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
                    )}
                  </OptionRow>
                  {(type === "archive" || type === "curation") && (
                    <OptionRow>
                      <OptionCol>
                        <OptionTitle>유형 분류</OptionTitle>
                        <OptionInput
                          type="text"
                          placeholder="유형 분류 ( ex. 보고서, 뉴스 ... )"
                        ></OptionInput>
                      </OptionCol>
                    </OptionRow>
                  )}
                  {(type === "archive" || type === "curation") && (
                    <>
                      <OptionRow>
                        <OptionCol>
                          <OptionTitle>주제 분류 선택</OptionTitle>
                          <Cascader
                            selectedCategory={selectedCategory}
                            options={categoryOptions}
                          />
                        </OptionCol>
                      </OptionRow>
                      <OptionRow>
                        <OptionCol>
                          <OptionTitle>대상 국가 선택</OptionTitle>
                          <Cascader
                            selectedCountry={selectedCountry}
                            options={countryOptions}
                          />
                        </OptionCol>
                      </OptionRow>
                    </>
                  )}
                </OptionContainer>
                <FilterActions>
                  <CustomButton onClick={searchReset}>초기화</CustomButton>
                  <CustomButton onClick={searchFilter}>
                    <AiOutlineSearch />
                    검색
                  </CustomButton>
                </FilterActions>
              </FilterBodyWrapper>
            </FilterBody>
          </>
        )}
      </Wrapper>
    </>
  );
}

function Cascader({ options, selectedCountry, selectedCategory }) {
  const [optionIsOpen, setOptionIsOpen] = useState(false);
  const _optionIsOpenHandler = () => {
    setOptionIsOpen(!optionIsOpen);
  };
  const PrintValue = (e) => {
    console.log(e.target.value);
    if (selectedCategory) {
      selectedCategory(e.target.value);
    }
    if (selectedCountry) {
      selectedCountry(e.target.value);
    }
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
                                <li key={index2} value={item2.value}>
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
  font-size: 12px;
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
    width: 8rem;
    height: 2rem;
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
    left: 8rem;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  flex-direction: column;
  font-size: 14px;
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.div`
  display: flex;
  align-items: center;

  p {
    margin: 0 0 0 0.5rem;
    font-size: 16px;
    font-weight: bold;
    color: #435269;
  }
`;
const CustomButton = styled.button`
  border: none;
  cursor: pointer;
  padding: 0.5rem 1rem 0.5rem 1rem;
  color: white;
  background-color: #435269;
  font-weight: bold;
  font-size: 14px;
  border-radius: 4px;
`;
const FilterBody = styled.div`
  padding: 1rem 0 1rem 0;
`;
const FilterActions = styled.div`
  padding: 0.5rem 0 0.5rem 0;
  border-top: solid 1px #d6d6d6;
  display: flex;
  justify-content: right;
  button {
    margin: 0.5rem;
  }
`;

const FilterBodyWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const OptionContainer = styled.div``;

const OptionRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 30px;
  margin: 1rem;
`;

const OptionCol = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin: 0 0.5rem 0 0.5rem;
`;

const OptionTitle = styled.div`
  min-width: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
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
