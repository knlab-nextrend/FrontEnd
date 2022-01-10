import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaFilter } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineSearch } from "react-icons/ai";
import { GrPowerReset } from "react-icons/gr";
import { MdSort } from "react-icons/md";
import { CategoryOptionFetchApi, CountryOptionFetchApi } from "../Utils/api";
function DataFilter({ dataFilterFetch }) {
  const [optionIsOpen, setOptionIsOpen] = useState(false);
  const [startDate, setStartDate] = useState("1970-01-01"); // startDate
  const [endDate, setEndDate] = useState(
    new Date().toISOString().substring(0, 10)
  ); //endDate
  const [lang, setLang] = useState(""); // language
  const [publisher, setPublisher] = useState(""); // publisher
  const [keyword, setKeyword] = useState(""); // keyword
  const [isCrawled, setIsCrawled] = useState(true); // is_crawled 여부

  const [dateSort,setDateSort] = useState("desc")
  const [sortDateType,setSortDateType] = useState("dc_dt_collect")
  

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [selectCategory, setSelectCategory] = useState(0);
  const [selectCountry, setSelectCountry] = useState(0);

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
  const _publisherHandler = (e) => {
    setPublisher(e.target.value);
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

  const _sortDateTypeHandler = (e) => {
    setSortDateType(e.target.value);
  };
  const _dateSortHandler = (e) => {
    setDateSort(e.target.value);
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

  const selectedCategory = (code) => {
    setSelectCategory(code)
  };
  const selectedCountry = (country) => {
    setSelectCountry(country)
  };

  const searchFilter = () => {
    dataFilterFetch(
      lang===""?null:lang,
      selectCategory===0?null:selectCategory,
      keyword===""?null:keyword,
      selectCountry===0?null:selectCountry,
      publisher===""?null:publisher,
      null, // dateType을 추후 추가
      startDate,
      endDate,
      isCrawled,
      dateSort,
      sortDateType,
    );
  };

  const searchReset = ()=>{
    setLang("")
    setPublisher("")
    setSelectCategory(0)
    setSelectCountry(0)
    setKeyword("")
    setIsCrawled(true)

  }
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
                            <option value={item.language_code_name}>
                              {item.language_name}
                            </option>
                          );
                        })}
                        <option value="other">그외</option>
                      </OptionSelect>
                    </OptionCol>
                    <OptionCol>
                      <OptionTitle>사이트</OptionTitle>
                      <OptionSelect value={publisher} onChange={_publisherHandler}>
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
                      <OptionTitle>시간 순 정렬</OptionTitle>
                      <OptionSelect
                        value={sortDateType}
                        onChange={_sortDateTypeHandler}
                      >
                        <option value="dc_dt_collect">원문 수집일 기준</option>
                        <option value="dc_dt_write">원문 작성일 기준</option>
                        <option value="dc_dt_regi">데이터 등록일 기준</option>
                      </OptionSelect>
                      <OptionSelect
                        value={dateSort}
                        onChange={_dateSortHandler}
                      >
                        <option value="desc">최신순</option>
                        <option value="asc">오래된 순</option>
                      </OptionSelect>
                    </OptionCol>
                  </OptionRow>
                </OptionContainer>
                <FilterActions>
                  <CustomButton onClick={searchReset} >
                    초기화
                  </CustomButton>
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

function Cascader({ options, selectedCountry,selectedCategory }) {
  const [optionIsOpen, setOptionIsOpen] = useState(false);
  const _optionIsOpenHandler = () => {
    setOptionIsOpen(!optionIsOpen);
  };
  const PrintValue = (e) => {
    console.log(e.target.value)
    if(selectedCategory){
      selectedCategory(e.target.value)
    }
    if(selectedCountry){
      selectedCountry(e.target.value)
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
  font-size:12px;
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
const SubTitle = styled.div`
  font-weight: bold;
  padding: 1rem;
  border-bottom: solid 1px #d6d6d6;
`;
const CustomButton = styled.button`
  border: none;
  cursor: pointer;
  padding: 0.5rem 1rem 0.5rem 1rem;
  color: white;
  background-color: #435269;
  font-weight:bold;
  font-size:14px;
  border-radius:4px;
  
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
