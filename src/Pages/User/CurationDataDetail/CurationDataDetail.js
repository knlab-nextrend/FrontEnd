import React from "react";
import FormHeader from "../../../Components/FormHeader";
import styled from "styled-components";
import { GrFormView } from "react-icons/gr";
function CurationDataDetail() {
  return (
    <>
      <FormHeader type="view" title={"큐레이션 데이터 상세 조회"} />
      <Wrapper>
        <ArticleInfoWrapper>
          <ImageContainer>
            <Image
              src={process.env.PUBLIC_URL + `/img/curation_default_image.png`}
            />
          </ImageContainer>
          <ArticleInfoContainer>
            <ArticleHeader>
              <SubTitle>[글로벌]</SubTitle>
              <Title>두바이, 플로리다, 텔아비브로의 백신 관광zzzzzzz </Title>
              <subTitle>
                `Shot Trips` To Dubai, Florida, Tel Aviv, Havana:Covid-19
                Vaccine Tourism Takes Off
              </subTitle>
            </ArticleHeader>

            <ArticleInfo>
              <Info>
                <GrFormView size="24" color="#d6d6d6" />
                <div className="content">24</div>
              </Info>
              <Info>
                <div className="title">▶ 발행일</div>
                <div className="content">2021-02-14</div>
              </Info>
              <Info>
                <div className="title">▶ 발행기관</div>
                <div className="content">포브스</div>
              </Info>
              <Info>
                <div className="title">▶ 발행면수</div>
                <div className="content">web</div>
              </Info>
              <Info>
                <div className="title">▶ 대상국가</div>
                <div className="content">글로벌</div>
              </Info>
              <Info>
                <div className="title">▶ 주제분류</div>
                <div className="content">기본정보</div>
              </Info>
              <Info>
                <div className="title">▶ 유형분류</div>
                <div className="content">뉴스</div>
              </Info>
            </ArticleInfo>
          </ArticleInfoContainer>
        </ArticleInfoWrapper>
        <ContentRow>
          <div className="title">▶ 키워드</div>
          <div className="contents">
            <div className="chip">키워드1</div>
            <div className="chip">키워드2</div>
            <div className="chip">키워드3</div>
            <div className="chip">키워드4</div>
            <div className="chip">키워드5</div>
          </div>
        </ContentRow>
        <ContentRow>
          <div className="title">▶ URL</div>
          <div className="contents">
            <a href="https://www.forbes.com/home_asia/">
              https://www.forbes.com/home_asia/
            </a>
          </div>
        </ContentRow>
        <ContentRow>
          <div className="title">▶ 한글요약</div>
          <div className="contents">
            Grab Holdings is set to begin trading on Dec. 2 on the Nasdaq after
            Altimeter Growth Corp.’s shareholders approved the merger with
            Southeast Asia’s superapp giant, completing one of the world’s
            biggest transactions involving a SPAC.
          </div>
        </ContentRow>
        <MainArticle></MainArticle>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 90%;
  margin: 3rem auto;
  display:flex;
  flex-direction:column;

`;
const ArticleInfoWrapper = styled.div`
  display: flex;
  min-height:27rem;
  margin-bottom:3rem;
`;
const SubTitle = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;
const Title = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: #009999;
  margin-bottom: 0.5rem;
`;

const ImageContainer = styled.div`
  overflow: hidden;
  box-shadow: rgb(9 30 66 / 25%) 0px 1px 1px;
  display:flex;
  align-items:center;
  max-width:18rem;
  max-height:26rem;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const ArticleHeader = styled.div`
  padding-bottom: 2rem;
  border-bottom: solid 1px #d6d6d6;
`;
const ArticleInfoContainer = styled.div`
margin-left:3rem;
`;

const ArticleInfo = styled.div`
  margin-top: 1rem;
  width: 100%;
`;
const Info = styled.div`
  display: flex;
  font-size: 14px;
  margin-bottom: 1rem;
  .title {
    font-weight: bold;
    color: rgb(153, 153, 153);
    width: 20%;
  }
`;

const ContentRow = styled.div`
  display: flex;
  align-items: top;
  font-size: 14px;
  margin-bottom: 1rem;
  .title {
    font-weight: bold;
    font-size: 16px;
    color: rgb(153, 153, 153);
    width: 10%;
  }
  .contents {
    width: 90%;
    display: flex;
    align-content:space-around
  }
  .chip {
    padding: 3px 12px;
    background-color: #eee;
    margin-right: 1rem;
  }
`;

const MainArticle = styled.div`
  margin-top: 3rem;
  padding: 3rem;
  border-radius: 10px;
  border: solid 1px #eee;
`;
export default CurationDataDetail;
