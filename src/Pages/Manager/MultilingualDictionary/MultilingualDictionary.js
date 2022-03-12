import React from "react";
import FormHeader from "../../../Components/FormHeader";
import SearchBar from "../../../Components/SearchBar";
import styled from "styled-components";
function MultilingualDictionary() {
  return (
    <>
      <FormHeader type={"view"} title={"다국어 사전 관리"} />
      <Wrapper>
        <ContentContainer>
          <div className="content-title">
            <div className="main-title">
            검색에 사용할 단어의 동의어 등록을.. 뭔가 멘트를 적으면 될듯한.. 기능설명 표의 행을 클릭하면 수정할 수 있음…  
            </div>
          </div>
          <div className="content-body">
            <ShortSearchBar>
              <SearchBar />
            </ShortSearchBar>
          </div>
        </ContentContainer>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  font-size: 14px;
  min-height: 1280px;
  background-color: #eee;
  color: rgb(59, 59, 59);
`;

const ShortSearchBar = styled.div`
  padding: 5rem;
  width: 500px;
`;
const LineBox = styled.div`
  /* border: solid 1px #d6d6d6;
  border-radius: 4px; */
  background-color: white;
  margin: 1rem;
  border-radius: 4px;
  box-shadow: 0 0 0.875rem 0 rgba(33, 37, 41, 0.05);
`;

const ContentContainer = styled(LineBox)`
  width: 100%;
  .content-title {
    border-bottom: 1px solid #d6d6d6;
    padding: 1rem;
    .main-title {
      font-size: 16px;
      font-weight: bold;
    }
  }
  .content-body {
    padding: 1rem;
  }
`;
export default MultilingualDictionary;
