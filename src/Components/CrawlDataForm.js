import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setModal, setModalData } from "../Modules/modal";
import { MdSettings } from "react-icons/md";
import Editor from "./Editor";

/* forwordRef는 부모 컴포넌트에서 자식 컴포넌트를 컨트롤하기 위해 */
function CrawlDataForm({ docs, type }, ref) {
  /* 현재 보여질 데이터 정보들 */
  const [dcContent, setDcContent] = useState(""); // dc_content 크롤 데이터 내용
  const [dcDtCollect, setDcDtCollect] = useState(""); // dc_dt_collect 원문 수집 일자
  const [dcDtWrite, setDcDtWrite] = useState(""); // dc_dt_write 원문 작성(등록) 일자
  const [dcDtRegi, setDcDtRegi] = useState(""); // dc_dt_regi 데이터 등록 일자
  const [dcKeyword, setDcKeyword] = useState([]); // dc_keyword 키워드 검색 단어. 받아올 땐 배열이나, 관리는 문자열로 할 예정
  const [dcKeywordString, setDcKeywordString] = useState(""); // dc_keyword 를 문자열 형태로 표시하기 위해서 .
  const [dcCat, setDcCat] = useState(""); //dc_cat 유형분류. 그런데 아직 모호함
  const [dcType, setDcType] = useState(""); // dc_type 유형분류. 그런데 아직 모호함.
  const [dcCountryIndexList, setDcCountryIndexList] = useState([]); // dc_country의 index 리스트
  const [dcCodeList, setDcCodeList] = useState([]);
  const [dcCountryPubIndexList, setDcCountryPubIndexList] = useState([]); //dc_country_pub의 index리스트
  const [dcCover, setDcCover] = useState([]); // dc_cover 문서 표지 리스트
  const [dcCoverSelect, setDcCoverSelect] = useState(""); // dc_cover 에서 선택한 표지
  const [dcSmryKr, setDcSmryKr] = useState(""); // dc_smry_kr 한글 요약
  const [dcPublisher, setDcPublisher] = useState(""); // dc_publisher 발행 사이트
  const [dcPage, setDcPage] = useState(0); // dc_page 원문 페이지 수
  const [dcTitleOr, setDcTitleOr] = useState(""); // dc_title_or  원문 제목
  const [dcTitleKr, setDcTitleKr] = useState(""); // dc_title_kr 한글 제목
  const [dcUrlLoc, setDcUrlLoc] = useState(""); // dc_url_loc 원문 문서 위치
  const [dcLink, setDcLink] = useState(""); //dc_link 링크..이긴 하나 무슨 링크?
  const [dcLang, setDcLang] = useState(""); //dc_lang 문서 언어

  const dcCountry = useSelector((state) => state.modal.modalData.dc_country); //dc_country 문서 대상 국가
  const dcCountryPub = useSelector(
    (state) => state.modal.modalData.dc_country_pub
  ); //dc_country_pub 문서 발행 국가
  const dcCode = useSelector((state) => state.modal.modalData.dc_code); //dc_code 주제 분류

  const _dcContentHandler = (data) => {
    setDcContent(data);
  };
  const _dcDtCollectHandler = (e) => {
    setDcDtCollect(e.target.value);
  };
  const _dcDtWriteHandler = (e) => {
    setDcDtWrite(e.target.value);
  };
  const _dcDtRegiHandler = (e) => {
    setDcDtRegi(e.target.value);
  };
  const _dcKeywordStringHandler = (e) => {
    setDcKeywordString(e.target.value);
  };
  const _dcCatHandler = (e) => {
    setDcCat(e.target.value);
  };
  const _dcTypeHandler = (e) => {
    setDcType(e.target.value);
  };
  const _dcCoverSelectHandler = (e) => {
    setDcCoverSelect(e.target.value);
  };
  const _dcSmryKrHandler = (e) => {
    setDcSmryKr(e.target.value);
  };
  const _dcPublisherHandler = (e) => {
    setDcPublisher(e.target.value);
  };
  const _dcPageHandler = (e) => {
    setDcPage(e.target.value);
  };
  const _dcTitleOrHandler = (e) => {
    setDcTitleOr(e.target.value);
  };
  const _dcTitleKrHandler = (e) => {
    setDcTitleKr(e.target.value);
  };
  const _dcUrlLocHandler = (e) => {
    setDcUrlLoc(e.target.value);
  };
  const _dcLinkHandler = (e) => {
    setDcLink(e.target.value);
  };
  const _dcLangHandler = (e) => {
    setDcLang(e.target.value);
  };

  const dispatch = useDispatch();
  const _openCountryCategoryModal = () => {
    dispatch(setModal("CountryCategoryModal"));
  };
  const _openCountryPubCategoryModal = () => {
    dispatch(setModal("CountryPubCategoryModal"));
  };
  const _openCodeCategoryModal = () => {
    dispatch(setModal("CodeCategoryModal"));
  };

  // 더미데이터
  const LANGUAGE_LIST = [
    { language_name: "한국어", language_code_name: "ko" },
    { language_name: "영어", language_code_name: "en" },
    { language_name: "일본어", language_code_name: "ja" },
    { language_name: "독일어", language_code_name: "de" },
    { language_name: "프랑스어", language_code_name: "fr" },
    { language_name: "중국어", language_code_name: "zh" },
    { language_name: "스페인어", language_code_name: "es" },
    { language_name: "포르투갈어", language_code_name: "pt" },
    { language_name: "러시아어", language_code_name: "ru" },
    { language_name: "아랍어", language_code_name: "ar" },
  ];

  /* 부모 컴포넌트에서 호출할 수 있는 함수.*/
  useImperativeHandle(ref, () => ({
    /* input state 값들을 객체에 담아서 반환함.*/
    getCrawlFormData() {
      let _docs = {};
      let _dcCoverSelect = [];
      _dcCoverSelect.push(dcCoverSelect);
      _docs["dc_content"] = dcContent;
      _docs["dc_dt_collect"] = dcDtCollect;
      _docs["dc_dt_write"] = dcDtWrite;
      _docs["dc_dt_regi"] = dcDtRegi;
      _docs["dc_keyword"] = dcKeyword;
      _docs["dc_code"] = dcCodeList;
      _docs["dc_cat"] = dcCat;
      _docs["dc_type"] = dcType;
      _docs["dc_country"] = dcCountryIndexList;
      _docs["dc_country_pub"] = dcCountryPubIndexList;
      _docs["dc_cover"] = (type!=="screening" && type!=="refine" && type!=="register") ? _dcCoverSelect : dcCover;
      _docs["dc_smry_kr"] = dcSmryKr;
      _docs["dc_publisher"] = dcPublisher;
      _docs["dc_page"] = dcPage;
      _docs["dc_title_or"] = dcTitleOr;
      _docs["dc_title_kr"] = dcTitleKr;
      _docs["dc_url_loc"] = dcUrlLoc;
      _docs["dc_link"] = dcLink;
      _docs["dc_lang"] = dcLang;

      return _docs;
    },
  }));
  useEffect(() => {
    /* docs가 빈 객체가 아니라면 */
    console.log(docs);
    if (Object.keys(docs).length !== 0) {
      setDcContent(docs.dc_content);
      setDcDtCollect(docs.dc_dt_collect);
      setDcDtWrite(docs.dc_dt_write);
      setDcDtRegi(docs.dc_dt_regi);
      setDcKeyword(docs.dc_keyword);
      setDcKeywordString(docs.dc_keyword.join(", "));
      setDcCat(docs.dc_cat);
      setDcType(docs.dc_type);
      dispatch(setModalData(docs.dc_code, "dc_code"));
      dispatch(setModalData(docs.dc_country, "dc_country"));
      dispatch(setModalData(docs.dc_country_pub, "dc_country_pub"));
      setDcCover(docs.dc_cover);
      setDcCoverSelect(docs.dc_cover[0] || "");
      setDcSmryKr(docs.dc_smry_kr);
      setDcPublisher(docs.dc_publisher);
      setDcPage(docs.dc_page);
      setDcTitleOr(docs.dc_title_or);
      setDcTitleKr(docs.dc_title_kr);
      setDcUrlLoc(docs.dc_url_loc);
      setDcLink(docs.dc_link);
      setDcLang(docs.dc_lang);
    }
  }, [docs]);

  /* dcKeywordString 값이 변경되면 dcKeyword 배열도 자동으로 반영되도록.*/
  useEffect(() => {
    const _stringToArrayKeywordArray = dcKeywordString.split(", ");
    setDcKeyword(_stringToArrayKeywordArray);
  }, [dcKeywordString]);

  useEffect(() => {
    const _dcCountryIndexList = dcCountry.map((item) => item.IDX);
    setDcCountryIndexList(_dcCountryIndexList);
  }, [dcCountry]);

  useEffect(() => {
    const _dcCountryPubIndexList = dcCountryPub.map((item) => item.IDX);
    setDcCountryPubIndexList(_dcCountryPubIndexList);
  }, [dcCountryPub]);

  useEffect(() => {
    const _dcCodeList = dcCode.map((item) => item.CODE);
    setDcCodeList(_dcCodeList);
  }, [dcCode]);
  return (
    <>
      <Wrapper>
        <CustomFormRow>
          <CustomFormItem>
            <p className="title">원제목</p>
            <input
              value={dcTitleOr}
              onChange={_dcTitleOrHandler}
              className="form"
              type="text"
            />
          </CustomFormItem>
        </CustomFormRow>
        <CustomFormRow>
          <CustomFormItem>
            <p className="title">한글제목</p>
            <input
              className="form"
              type="text"
              value={dcTitleKr}
              onChange={_dcTitleKrHandler}
              placeholder="한글 제목을 입력하세요"
            />
          </CustomFormItem>
        </CustomFormRow>
        <CustomFormRow>
          <CustomFormItem>
            <p className="title">요약</p>
            <input
              value={dcSmryKr}
              onChange={_dcSmryKrHandler}
              className="form"
              type="text"
              placeholder="한글 요약을 입력하세요"
            />
          </CustomFormItem>
        </CustomFormRow>
        {type !== "refine" && (
          <CustomFormRow>
            <CustomFormItem>
              <div className="title">
                <p>문서 대상 국가 설정</p>
                <button onClick={_openCountryCategoryModal}>
                  <MdSettings /> 설정
                </button>
              </div>
              <div className="form notInput">
                {dcCountry.map((item, index) => {
                  return <CustomList key={index}>{item.CTY_NAME}</CustomList>;
                })}
              </div>
            </CustomFormItem>
          </CustomFormRow>
        )}
        {type !== "refine" && (<CustomFormRow>
          <CustomFormItem>
            <div className="title">
              <p>문서 발행 국가 설정</p>
              <button onClick={_openCountryPubCategoryModal}>
                <MdSettings /> 설정
              </button>
            </div>
            <div className="form notInput">
              {dcCountryPub.map((item, index) => {
                return <CustomList key={index}>{item.CTY_NAME}</CustomList>;
              })}
            </div>
          </CustomFormItem>
        </CustomFormRow>)}
        {type !== "refine" && (<CustomFormRow>
          <CustomFormItem>
            <div className="title">
              <p>주제 분류 설정</p>
              <button onClick={_openCodeCategoryModal}>
                <MdSettings /> 설정
              </button>
            </div>
            <div className="form notInput">
              {dcCode.map((item, index) => {
                return <CustomList key={index}>{item.CT_NM}</CustomList>;
              })}
            </div>
          </CustomFormItem>
        </CustomFormRow>)}
        <CustomFormRow>
          <CustomFormItem>
            <p className="title">문서 위치 URL</p>
            <input
              value={dcUrlLoc}
              onChange={_dcUrlLocHandler}
              className="form"
              type="text"
            />
          </CustomFormItem>
          <CustomFormItem>
            <p className="title">원문 작성일</p>
            <input
              value={dcDtWrite}
              onChange={_dcDtWriteHandler}
              className="form"
              type="text"
              placeholder="원문 작성일을 입력하세요"
            />
          </CustomFormItem>
        </CustomFormRow>
        <CustomFormRow>
          <CustomFormItem>
            <p className="title">문서 안내 URL</p>
            <input
              className="form"
              type="text"
              placeholder="원문의 안내가 적힌 링크를 입력하세요"
            />
          </CustomFormItem>
          <CustomFormItem>
            <p className="title">데이터 수집일</p>
            <input
              value={dcDtCollect}
              onChange={_dcDtCollectHandler}
              className="form"
              type="text"
            />
          </CustomFormItem>
        </CustomFormRow>
        <CustomFormRow>
          <CustomFormItem>
            <p className="title">문서 유형 구분</p>
            <input
              value={dcType}
              onChange={_dcTypeHandler}
              className="form"
              type="text"
              placeholder="보고서, 지침, 뉴스, 논문 등 문서의 물리적 형태 유형을 입력하세요"
            />
          </CustomFormItem>
          <CustomFormItem>
            <p className="title">데이터 등록일</p>
            <input
              onChange={_dcDtRegiHandler}
              value={dcDtRegi}
              className="form"
              type="text"
            />
          </CustomFormItem>
        </CustomFormRow>
        <CustomFormRow>
          <CustomFormItem>
            <p className="title">발행 사이트</p>
            <input
              value={dcPublisher}
              onChange={_dcPublisherHandler}
              className="form"
              type="text"
              placeholder="원문의 발행자 및 발행기관명을 입력하세요"
            />
          </CustomFormItem>
          <CustomFormItem>
            <p className="title">페이지 수</p>
            <input
              value={dcPage}
              onChange={_dcPageHandler}
              className="form"
              type="number"
              min="0"
            />
          </CustomFormItem>
        </CustomFormRow>
        <CustomFormRow>
          <CustomFormItem>
            <p className="title">언어</p>
            <select value={dcLang} onChange={_dcLangHandler} className="form">
              <option value={""}>전체</option>
              {LANGUAGE_LIST.map((item, index) => {
                return (
                  <option key={index} value={item.language_code_name}>
                    {item.language_name}
                  </option>
                );
              })}
              <option value="other">그외</option>
            </select>
          </CustomFormItem>
        </CustomFormRow>
        <CustomFormRow>
          <CustomFormItem>
            <p className="title">검색 키워드</p>
            <input
              value={dcKeywordString}
              onChange={_dcKeywordStringHandler}
              className="form"
              type="text"
              placeholder="검색에 사용할 키워드를 입력하세요. 검색 키워드는 쉼표(,)로 구분합니다."
            />
          </CustomFormItem>
        </CustomFormRow>
        {(type !== "refine" && type!=="register") && (<CustomFormRow>
          <CustomFormItem>
            <p className="title">내용</p>
            <Editor data={dcContent} _dcContentHandler={_dcContentHandler} />
          </CustomFormItem>
        </CustomFormRow>)}
        {(type !== "refine" && type!=="register") &&
        (<CustomFormRow>
          <CustomFormItem>
            <p className="title">표지 파일</p>
            <ImageContainer>
              {dcCover.map((item, index) => {
                return (
                  <div key={index}>
                    <input
                      type="radio"
                      id={index}
                      value={item}
                      name="cover"
                      onChange={_dcCoverSelectHandler}
                      checked={dcCoverSelect === item}
                    />
                    <label htmlFor={index}>
                      <img className="cover" src={`http://${item}`} />
                    </label>
                  </div>
                );
              })}
            </ImageContainer>
          </CustomFormItem>
        </CustomFormRow>)}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const CustomFormItem = styled.div`
  display: flex;
  align-items: center;
  min-height: 3rem;
  overflow: hidden;
  width: 100%;
  font-size: 12px;
  border-bottom: dotted 1px #ccc;
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 0;
    background-color: rgba(0, 0, 0, 0.02);
    height: 100%;
    min-width: 10rem;
    border-right: solid 2px #d6d6d6;
    button {
      display: inherit;
      align-items: center;
    }
  }
  .form {
    background-color: #eeffdb;
    width: 100%;
    padding-left: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    height: 100%;
    &:focus {
      outline: none;
    }
  }
  .textarea {
    padding-top: 2rem;
  }
  .notInput {
    background-color: white;
    height: 5rem;
    justify-content: left;
  }
`;

const CustomFormRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const CustomList = styled.span`
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  background-color: #eee;
  min-width: 4rem;
  text-align: center;
  border-radius: 1rem;
`;

const ImageContainer = styled.div`
  display: flex;
  margin: 2rem;
  input[type="radio"] {
    margin: 10px;
    display: none;
  }
  input:checked + label > img {
    border: solid 2px #009999;
  }
  input + label > img {
    transition: all 0.2s;
    &:hover {
      transform: scale(1.1);
      border: solid 2px red;
    }
  }

  label {
    margin-right: 2rem;
    img {
      cursor: pointer;
      height: 20rem;
    }
  }
`;

/* forwardRef를 사용하여 부모가 자식 컴포넌트 함수를 호출할 수 있도록 함*/
export default forwardRef(CrawlDataForm);
