import React from "react";
import FormHeader from "../../../Components/FormHeader";
import styled from "styled-components";
import { GrFormView } from "react-icons/gr";
import { AiOutlineLink } from "react-icons/ai";
import Editor from "../../../Components/Editor";

function CurationDataDetail({ docs, permission, goDataManage }) {
  return (
    <>
      <FormHeader type="view" title={"큐레이션 데이터 상세 조회"} />
      <Wrapper>
        <ArticleInfoWrapper>
          <ImageContainer>
            {docs.dc_cover && (
              <Image
                src={
                  docs.dc_cover && docs.dc_cover.length !== 0
                    ? `http://${docs.dc_cover[0]}`
                    : process.env.PUBLIC_URL + `/img/curation_default_image.png`
                }
              />
            )}
          </ImageContainer>
          <ArticleInfoContainer>
            <ArticleHeader>
              <SubTitle>
                [{docs.dc_country_list && docs.dc_country_list.join(", ")}]
              </SubTitle>
              <Title>{docs.dc_title_kr}</Title>
              <div>{docs.dc_title_or}</div>
            </ArticleHeader>
            {
              // 권한이 관리자일 경우
              permission === 9 && (
                <ArticleActions>
                  <button onClick={goDataManage}>관리</button>
                </ArticleActions>
              )
            }
            <ArticleInfo>
              <Info>
                <GrFormView size="24" color="#d6d6d6" />
                <div className="content">{docs.dc_hits || 0}</div>
              </Info>
              <Info>
                <div className="title">▶ 원문 발행일</div>
                <div className="content">{docs.dc_dt_write}</div>
              </Info>
              <Info>
                <div className="title">▶ 발행 HOST</div>
                <div className="content">{docs.dc_publisher}</div>
              </Info>
              <Info>
                <div className="title">▶ 발행면수</div>
                <div className="content">{docs.dc_page}</div>
              </Info>
              <Info>
                <div className="title">▶ 발행국가</div>
                <div className="content">
                  {docs.dc_country_pub_list &&
                    docs.dc_country_pub_list.join(", ")}
                </div>
              </Info>
              <Info>
                <div className="title">▶ 주제분류</div>
                <div className="content">
                  {docs.dc_code_list && docs.dc_code_list.join(", ")}
                </div>
              </Info>
              <Info>
                <div className="title">▶ 유형분류</div>
                <div className="content">{docs.dc_type.join(", ")}</div>
              </Info>
            </ArticleInfo>
          </ArticleInfoContainer>
        </ArticleInfoWrapper>
        <ContentRow>
          <div className="title">▶ 키워드</div>
          <div className="contents">
            {docs.dc_keyword &&
              docs.dc_keyword.map((item, index) => {
                return (
                  <div className="chip" key={index}>
                    {item}
                  </div>
                );
              })}
          </div>
        </ContentRow>
        <ContentRow>
          <div className="title">▶ URL</div>
          <div className="contents">
            <a target="_blank" href={docs.dc_url_loc}>
              {docs.dc_url_loc}
            </a>
          </div>
        </ContentRow>
        <ContentRow>
          <div className="title">▶ 요약</div>
          <div className="contents">{docs.dc_smry_kr}</div>
        </ContentRow>
        <ContentRow>
          <div className="title">▶ 연관문서 이동</div>
          <div className="contents">
            <div className="chip">
              <AiOutlineLink />
              연관문서 1
            </div>
          </div>
        </ContentRow>
        <ContentRow>
          <div className="title">▶ 본문내용</div>
        </ContentRow>
        <ContentRow>
          <Editor readOnly={true} data={docs.dc_content} />
        </ContentRow>
      </Wrapper>
    </>
  );
}
const ArticleActions = styled.div`
  padding: 1rem 0 1rem 0;
  border-bottom: solid 1px #d6d6d6;
  button {
    cursor: pointer;
    margin-right: 1rem;
    border: none;
    width: 80px;
    height: 35px;
  }
`;
const Wrapper = styled.div`
  width: 90%;
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
`;
const ArticleInfoWrapper = styled.div`
  display: flex;
  min-height: 27rem;
  margin-bottom: 3rem;
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
  display: flex;
  align-items: center;
  max-width: 18rem;
  max-height: 26rem;
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
  margin-left: 3rem;
  width: 100%;
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
    align-content: space-around;
    flex-wrap: wrap;
  }
  .chip {
    padding: 3px 12px;
    margin-bottom: 12px;
    background-color: #eee;
    margin-right: 1rem;
  }
`;

export default CurationDataDetail;
