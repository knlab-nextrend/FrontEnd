import React from "react";
import FormHeader from "../../../Components/FormHeader";
import styled, { css } from "styled-components";
function CurationDataList() {
  return (
    <>
      <FormHeader type="view" title={"큐레이션 데이터 조회"} />
      <CurationListWrapper>
        <CurationCard />
        <CurationCard />
        <CurationCard />
        <CurationCard />
        <CurationCard />
        <CurationCard />
        <CurationCard />
        <CurationCard />
        <CurationCard />
        <CurationCard />
      </CurationListWrapper>
    </>
  );
}

function CurationCard(data) {
  return (
    <>
      <CardWrpper>
        <ImageContainer>
          <Image
            src={process.env.PUBLIC_URL + `/img/curation_default_image.png`}
          />
        </ImageContainer>
        <ContentContainer>
          <Title>
            <div>[아시아][한국]</div>
            <div>큐레이션 데이터 한글제목</div>
          </Title>
          <SubTitle>
            Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit
          </SubTitle>
          <Info>
            <CategoryBadge color="grey">{`대분류 > 중분류 > 소분류`}</CategoryBadge>
            <CountryBadge color="grey">{`아시아 > 한국`}</CountryBadge>
            <PublisherBadge color="grey">{`neti... 모시기 발행기관`}</PublisherBadge>
          </Info>
          <Info>
            <PageBadge color="grey">6쪽</PageBadge>
            <RegiDateBadge color="grey">{`2021-11-28`}</RegiDateBadge>
          </Info>
          <Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            consectetur magna sed consectetur faucibus. In consectetur blandit
            magna a vehicula. Vestibulum laoreet elementum eros, in pharetra ex
            vestibulum sed. Phasellus non sollicitudin elit. Duis nec semper
            tortor. Pellentesque eu condimentum mi, a efficitur tellus. Integer
            sed libero ac orci fermentum ultricies ut convallis ante. Maecenas
            et nibh semper, rhoncus leo id, feugiat nisl. Quisque faucibus
            gravida arcu, eget lacinia ante. Ut facilisis viverra justo, quis
            finibus ex sodales sit amet. Proin ut diam turpis. Integer sit amet
            magna quis orci porttitor hendrerit vitae sit amet velit. Duis sed
            justo quis velit egestas bibendum. Ut non ipsum nisi. Maecenas
            scelerisque velit sit amet est interdum sagittis. Nulla dignissim
            sodales massa eu condimentum. Phasellus rutrum, eros a aliquam
            iaculis, diam enim eleifend libero, id vulputate magna lorem vel
            justo. Sed a consequat sapien. Quisque gravida neque eget malesuada
            luctus. Vivamus euismod maximus tristique. Morbi tristique nulla
            eget laoreet dictum. Ut bibendum mattis ullamcorper. Suspendisse
            bibendum, est non congue ornare, risus nibh vehicula nisl, nec
            semper arcu est nec dui. Curabitur eget leo varius, mollis nunc nec,
            vehicula diam. Aenean rhoncus ipsum ut tellus dictum, a elementum
            lorem consectetur. Aenean non nisi ipsum.
          </Content>
        </ContentContainer>
      </CardWrpper>
    </>
  );
}

const CardWrpper = styled.div`
  display: flex;
  padding:1rem;

`;
const ImageContainer = styled.div`
  min-width: 12rem;
  min-height: 18rem;
  max-width: 12rem;
  max-height: 18rem;
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
  div:nth-child(1) {
    color: black;
  }
  /* p태그 두번째 요소는 한글 제목*/
  div:nth-child(2) {
    color: #435269;
  }
`;
const SubTitle = styled.div`
  /* p태그 세번째 요소는 원문 제목*/
  font-size: 14px;
  color: grey;
`;
const Info = styled.div`
  display: flex;

  div {
    align-items: center;
    padding:0.5rem;
    margin:0;
  }
`;

const Badge = styled.div`
  &:before {
    content: "";
    color: white;
    font-weight: bold;
    font-size: 12px;
    padding: 5px;
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
  margin:2rem;
`;
export default CurationDataList;
