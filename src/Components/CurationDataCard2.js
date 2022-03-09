import React from "react";
import styled from "styled-components";

function CurationDataCard2({ curationDataItem }) {
  return (
    <CardWrapper>
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
          <div>{curationDataItem.dc_code_list.join(", ")}</div>
          <div>|</div>
          <div>{curationDataItem.dc_country_list.join(", ")}</div>
          <div>|</div>
          <div>{curationDataItem.dc_publisher}</div>
          <div>|</div>
          <div>{curationDataItem.dc_dt_regi}</div>
          <div>|</div>
          <div>{curationDataItem.dc_page}쪽</div>
        </Info>
        <UrlPreview>{curationDataItem.dc_url_loc}</UrlPreview>
      </ContentContainer>
    </CardWrapper>
  );
}
const CardWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  box-shadow: rgb(9 30 66 / 25%) 0px 1px 1px;
  border-radius: 4px;
  margin: 0.5rem;
  transition: all 0.3s ease-in-out; /* 부드러운 모션을 위해 추가*/
  &:hover {
    transform: scale(1.02);
    cursor: pointer;
  }
  background-color: white;
`;
const ImageContainer = styled.div`
  width: 8rem;
  height: 6rem;
  overflow: hidden;
  border: solid 1px #eee;
  /*box-shadow: rgb(9 30 66 / 25%) 0px 1px 1px;*/
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
    margin-bottom: 0.25rem;
  }
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;
const Title = styled.div`
  display: flex;
  div {
    margin-right: 0.5rem;
    font-weight: bold;
    font-size: 16px;
  }
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
    padding-right: 0.5rem;
    margin: 0;
  }
`;
const UrlPreview = styled.div`
  color: #009999;
  font-size: 12px;
`;
export default CurationDataCard2;
