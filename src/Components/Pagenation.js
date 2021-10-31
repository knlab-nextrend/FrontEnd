import React, { useEffect, useState } from "react";
import styled from "styled-components";

function Pagenation({ dcCount, listSize, pageNo, setPageNo }) {
  /* 
    pageNo 현재 클릭한 페이지의 No
    listSize 한 페이지에 보여질 document의 개수
    dcCount 전체 document의 개수
  */

  const [pageCount, setPageCount] = useState(0); // 총 보여질 페이지 갯수
  const [pageNoArray, setPageNoArray] = useState([]); // 총 보여질 페이지 갯수 배열
  const [currentPageNoArray, setCurrentPageNoArray] = useState([]); // 현재 보여질 페이지 갯수 배열
  const [currentPage, setCurrentPage] = useState(0);

  const _handlerPageNo = (e) => {
    const _currentPageNo = Number(e.target.value);
    setPageNo(_currentPageNo);
  };
  const nextCurrentPage = () => {
    const _currentPageNext =
      currentPage + 10 <= pageNoArray.length ? currentPage + 10 : currentPage;
    setCurrentPage(_currentPageNext);
  };
  const prevCurrentPage = () => {
    const _currentPagePrev = currentPage - 10 >= 0 ? currentPage - 10 : 0;
    setCurrentPage(_currentPagePrev);
  };
  const calcCurrentPageNoArray = () => {
    const _start = currentPage <= 1 ? 0 : currentPage;
    const _end = pageNoArray % 10 < 10 ? -1 : _start + 10;
    if (pageNoArray.length <= 1) {
      setCurrentPageNoArray([1]);
    } else {
      const _currentPageNoArray = pageNoArray.slice(_start, _end);
      setCurrentPageNoArray(_currentPageNoArray);
    }
  };

  useEffect(() => {
    const _pageCount = Math.ceil(dcCount / listSize);
    setPageCount(_pageCount);
  }, [dcCount]);

  useEffect(() => {
    const _pageNoArray = Array.from({ length: pageCount }, (v, i) => i + 1);
    setPageNoArray(_pageNoArray);
  }, [pageCount]);

  useEffect(() => {
    calcCurrentPageNoArray();
  }, [pageNoArray]);

  useEffect(() => {
    calcCurrentPageNoArray();
  }, [currentPage]);

  return (
    <>
      <PagenationContainer>
        <NextPrevButton onClick={prevCurrentPage}>{"<"}</NextPrevButton>
        {currentPageNoArray.map((item, i) => {
          return (
            <PagenationButton
              value={item}
              onClick={_handlerPageNo}
              active={item === pageNo}
            >
              {item}
            </PagenationButton>
          );
        })}
        <NextPrevButton onClick={nextCurrentPage}>{">"}</NextPrevButton>
      </PagenationContainer>
    </>
  );
}

const PagenationContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1rem;
`;
const PagenationButton = styled.button`
  margin: 0.5rem;
  padding: 1rem;
  background-color: ${(props) => (props.active ? "#ff9800" : "#ffeb3b")};
  cursor: pointer;
`;

const NextPrevButton = styled(PagenationButton)`
  background-color: grey;
`;
export default Pagenation;
