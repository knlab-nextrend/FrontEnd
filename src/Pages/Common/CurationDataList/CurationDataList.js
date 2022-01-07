import React from "react";
import FormHeader from "../../../Components/FormHeader";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Pagenation from "../../../Components/Pagenation";
import NoData from "../../../Components/NoData";
function CurationDataList({
  curationDataList,
  dcCount,
  listSize,
  pageNo,
  setPageNo,
}) {
  return (
    <>
      <FormHeader type="view" title={"큐레이션 데이터 조회"} />
      {curationDataList.length !== 0 ? (
        <Wrapper>
          <CurationListWrapper>
            {curationDataList.map((item, index) => {
              return (
                <CustomLink
                  to={`/curation/${item.item_id}`}
                  key={index}
                >
                  <CurationCard curationDataItem={item} />
                </CustomLink>
              );
            })}
          </CurationListWrapper>
          <Pagenation
            dcCount={dcCount}
            listSize={listSize}
            pageNo={pageNo}
            setPageNo={setPageNo}
          />
        </Wrapper>
      ) : (
        <NoData />
      )}
    </>
  );
}

function CurationCard({ curationDataItem }) {
  return (
    <>
      <CardWrpper>
        <ImageContainer>
          <Image
            src={
              curationDataItem.dc_cover.length !== 0
                ? `http://${curationDataItem.dc_cover[0]}`
                : process.env.PUBLIC_URL + `/img/curation_default_image.png`
            }
          />
        </ImageContainer>
        <ContentContainer>
          <Title>
            <div>[{curationDataItem.dc_country_list.join(",")}]</div>
            <div>{curationDataItem.dc_title_kr}</div>
          </Title>
          <SubTitle>{curationDataItem.dc_title_or}</SubTitle>
          <Info>
            <CategoryBadge color="grey">
              {curationDataItem.dc_code_list.join(", ")}
            </CategoryBadge>
            <CountryBadge color="grey">
              {curationDataItem.dc_country_list.join(", ")}
            </CountryBadge>
            <PublisherBadge color="grey">
              {curationDataItem.dc_publisher}
            </PublisherBadge>
          </Info>
          <Info>
            <PageBadge color="grey">{curationDataItem.dc_page}쪽</PageBadge>
            <RegiDateBadge color="grey">
              {curationDataItem.dc_dt_regi}
            </RegiDateBadge>
          </Info>
          <Content>{curationDataItem.dc_content}</Content>
        </ContentContainer>
      </CardWrpper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CustomLink = styled(Link)`
  color: black;
  &:link {
    text-decoration: none;
  }
  &:visited {
    text-decoration: none;
  }
  &:hover {
    text-decoration: none;
  }
`;

const CardWrpper = styled.div`
  display: flex;
  padding: 1rem;
  box-shadow: rgb(9 30 66 / 25%) 0px 1px 1px;
  border-radius: 4px;
  margin: 1rem;
  transition: all 0.3s ease-in-out; /* 부드러운 모션을 위해 추가*/
  &:hover {
    transform: scale(1.02);
    cursor: pointer;
  }
  background-color: white;
`;
const ImageContainer = styled.div`
  min-width: 12rem;
  max-width: 12rem;
  height: 100%;
  overflow: hidden;
  box-shadow: rgb(9 30 66 / 25%) 0px 1px 1px;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const ContentContainer = styled.div`
  p {
    padding: 0;
    margin: 0;
  }
  div {
    margin-bottom: 0.5rem;
  }
  display: flex;
  flex-direction: column;
  margin: 1rem;
`;
const Title = styled.div`
  display: flex;
  div {
    margin-right: 0.5rem;
    font-weight: bold;
    font-size: 20px;
  }
  /* p태그 첫번째 요소는 말머리 */
  /* div:nth-child(1) {
    color: black;
  } */
  /* p태그 두번째 요소는 한글 제목*/
  div:nth-child(1) {
    color: #435269;
  }
`;
const SubTitle = styled.div`
  /* p태그 세번째 요소는 원문 제목*/
  font-size: 14px;
  color: grey;
`;
const Info = styled.div`
  font-size: 12px;
  display: flex;

  div {
    align-items: center;
    padding: 0.5rem;
    margin: 0;
  }
`;

const Badge = styled.div`
  &:before {
    content: "";
    color: white;
    font-weight: bold;
    font-size: 12px;
    padding-left: 5px;
    padding-right: 5px;
    margin-right: 5px;
    border-radius: 3px;
    background-color: ${(props) => props.color || "grey"};
  }
`;
const CategoryBadge = styled(Badge)`
  &:before {
    content: "주제";
  }
`;
const CountryBadge = styled(Badge)`
  &:before {
    content: "국가";
  }
`;

const PageBadge = styled(Badge)`
  &:before {
    content: "페이지수";
  }
`;
const PublisherBadge = styled(Badge)`
  &:before {
    content: "발행 기관";
  }
`;
const RegiDateBadge = styled(Badge)`
  &:before {
    content: "데이터 등록 일자";
  }
`;

const Content = styled.div`
  overflow: hidden;

  text-overflow: ellipsis;

  display: -webkit-box;

  -webkit-line-clamp: 5; /* 라인수 */

  -webkit-box-orient: vertical;

  word-wrap: break-word;
`;

const CurationListWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 2rem;
  width:90%;
  margin:0 auto;
`;
export default CurationDataList;
