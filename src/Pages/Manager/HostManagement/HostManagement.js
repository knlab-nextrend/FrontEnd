import React from "react";
import FormHeader from "../../../Components/FormHeader";
import SearchBar from "../../../Components/SearchBar";
import { FaFilter } from "react-icons/fa";
import styled from "styled-components";
import {
  MdUpload,
  MdDownload,
  MdOutlineModeEditOutline,
  MdOutlineDeleteOutline,
  MdOutlineCheck,
  MdClose,
} from "react-icons/md";
function HostManagement({ filterOpen, _filterOpenHandler }) {
  return (
    <>
      <FormHeader type={"view"} title={"HOST 목록 관리"} />
      <Wrapper>
        <ContentContainer>
          <div className="content-title">
            <div className="main-title">
              크롤링 HOST의 목록을 관리할 수 있습니다. 엑셀로 데이터를
              업로드하고 관리할 수 있습니다.
            </div>
          </div>
          <div className="content-body">
            <DictionaryFunctionWrapper>
              <DictionaryFunctionBtnWrapper>
                <button onClick={_filterOpenHandler}>조건 검색</button>
                <button>
                  <MdUpload size="20" />
                  엑셀 파일 일괄 업로드
                </button>
                <button>
                  <MdOutlineDeleteOutline size="20" />
                  선택 데이터 일괄 삭제
                </button>
              </DictionaryFunctionBtnWrapper>
            </DictionaryFunctionWrapper>
            {filterOpen && (
              <FilterWrapper>
                <div className="filter-title">
                  <FaFilter />
                  <div>검색 필터 설정</div>
                </div>
                <div className="filter-body">
                  <div className="filter-item">
                    <div>HOST 도메인</div>
                    <input type="text" />
                  </div>
                  <div className="filter-item">
                    <div>HOST 언어</div>
                    <input type="text" />
                  </div>
                  <div className="filter-item">
                    <div>HOST 국가</div>
                    <input type="text" />
                  </div>
                  <div className="filter-item">
                    <div>발급 기관 명</div>
                    <input type="text" />
                  </div>
                  <div className="filter-item">
                    <div className="item-title">크롤링 수집주기</div>
                    <select>
                      <option>A</option>
                      <option>B</option>
                      <option>C</option>
                      <option>D</option>
                      <option>E</option>
                    </select>
                  </div>
                </div>
                <div className="filter-action">
                  <button>검색</button>
                </div>
              </FilterWrapper>
            )}
            <DictonaryDataTable>
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>HOST 도메인</th>
                  <th>HOST 해당 언어</th>
                  <th>HOST 해당 국가</th>
                  <th>발급 기관 명</th>
                  <th className="crawl-setting">크롤링 수집주기 설정</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>www.meti.go.jp</td>
                  <td>일본어</td>
                  <td>일본</td>
                  <td>METI</td>
                  <td className={`A`}>A</td>
                </tr>
                <tr>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>www.meti.go.jp</td>
                  <td>일본어</td>
                  <td>일본</td>
                  <td>METI</td>
                  <td className={`A`}>A</td>
                </tr>
              </tbody>
            </DictonaryDataTable>
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

const DictionaryFunctionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 3rem;
`;
const DictionaryFunctionBtnWrapper = styled.div`
  display: flex;
  button {
    cursor: pointer;
    margin: 0.5rem;
    font-size: 12px;
    display: flex;
    align-items: center;
    background-color: #435269;
    color: white;
    border: solid 1px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    padding: 0 0.5rem 0 0.5rem;
  }
`;
const DictonaryDataTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  margin-top: 1rem;
  margin-bottom: 1rem;
  thead {
    background-color: #d8dee6;
    color: #323d4d;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  }
  th,
  td {
    border-bottom: solid 1px #eee;
    padding: 10px;
  }
  tbody {
    tr:nth-child(even) {
      background-color: #f4f5f8;
    }
  }
  input[type="text"] {
    width: 100%;
  }
  .crawl-setting {
    width: 10rem;
  }
  .actions {
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      height: 2rem;
      width: 2rem;
      margin-left: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border: solid 1px rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      cursor: pointer;
    }
    .delete {
      background-color: #b80000;
      color: white;
    }
    .confirm {
      background-color: #435269;
      color: white;
    }
  }
  .setting {
    text-align: center;
  }
  input[type="text"] {
    &:focus {
      outline: none;
    }
  }
`;

const FilterWrapper = styled.div`
  border: solid 1px #d6d6d6;
  border-radius: 4px;
  padding: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;

  .filter-title {
    color: #435269;
    font-weight: bold;
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  .filter-body {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
  .filter-item {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    height: 30px;
    div {
      min-width: 10rem;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      background-color: #d6d6d6;
      font-size: 12px;
      margin-right: 0.5rem;
      padding-left: 5px;
      padding-right: 5px;
      text-align: center;
      word-wrap: break-word;
    }
    input,
    select {
      display: flex;
      align-items: center;
      height: 100%;
      width: 100%;
      border: solid 1px #d6d6d6;
      margin: 0 0.5rem 0 0.5rem;
      padding-left: 0.5rem;
      &:focus {
        outline: none;
      }
    }
  }
  .filter-action{
    display:flex;
    justify-content:end;
    button{
      cursor:pointer;
      border-radius:4px;
      border:none;
      background-color:#435269;
      color:white;
      padding:0.5rem 1rem 0.5rem 1rem ;
    }
  }
`;
export default HostManagement;
