import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setModal, setModalData, setCategoryModalType } from "../Modules/modal";
import { MdSettings, MdOutlineLink } from "react-icons/md";
import Editor from "./Editor";

/* forwordRef는 부모 컴포넌트에서 자식 컴포넌트를 컨트롤하기 위해 */
function CrawlDataForm({ docs, type, _id }, ref) {

  const dispatch = useDispatch();

  const [itemId, setItemId] = useState("");
  /* 현재 보여질 데이터 정보들 */
  const [dcContent, setDcContent] = useState(""); // dc_content 크롤 데이터 내용
  const [dcDtWrite, setDcDtWrite] = useState(""); // dc_dt_write 원문 작성 일자
  const [dcDtRegi, setDcDtRegi] = useState(""); // dc_dt_regi 문서 등록 일자
  const [dcKeyword, setDcKeyword] = useState([]); // dc_keyword 키워드 검색 단어. 받아올 땐 배열이나, 관리는 문자열로 할 예정
  const [dcKeywordString, setDcKeywordString] = useState(""); // dc_keyword 를 문자열 형태로 표시하기 위해서 .
  const [dcCover, setDcCover] = useState([]); // dc_cover 문서 표지 리스트
  const [dcCoverSelect, setDcCoverSelect] = useState(""); // dc_cover 에서 선택한 표지
  const [dcSmryKr, setDcSmryKr] = useState(""); // dc_smry_kr 한글 요약
  const [dcPublisher, setDcPublisher] = useState(""); // dc_publisher 원문 발행 기관명

  const [dcPage, setDcPage] = useState(0); // dc_page 원문 페이지 수

  const [dcTitleOr, setDcTitleOr] = useState(""); // dc_title_or  원문 제목
  const [dcTitleKr, setDcTitleKr] = useState(""); // dc_title_kr 한글 제목

  const [dcUrlLoc, setDcUrlLoc] = useState(""); // dc_url_loc 원문 문서 위치
  const dcType = useSelector((state) => state.modal.modalData.dc_type); //dc_type 문서 유형 임시
  const dcCountry = useSelector((state) => state.modal.modalData.dc_country); //dc_country 문서 대상 국가
  const dcCountryPub = useSelector((state) => state.modal.modalData.dc_country_pub); //dc_country_pub 문서 발행 국가
  const dcCode = useSelector((state) => state.modal.modalData.dc_code); //dc_code 주제 분류
  const dcLanguage = useSelector((state) => state.modal.modalData.dc_language); //dc_language 언어
  const dcCustom = useSelector((state) => state.modal.modalData.dc_custom); //dc_custom 언어

  const [dcCountryIndexList, setDcCountryIndexList] = useState([]); // dc_country의 index 리스트
  const [dcCodeList, setDcCodeList] = useState([]);
  const [dcCountryPubIndexList, setDcCountryPubIndexList] = useState(null); //dc_country_pub의 index
  const [dcLanguageIndexList, setDcLanguageIndexList] = useState(null); //dc_language의 index
  const [dcTypeIndexList, setDcTypeIndexList] = useState([]); // dc_type의 index 리스트
  const [dcCustomIndexList, setDcCustomIndexList] = useState([]); // dc_custom의 index 리스트

  const _dcContentHandler = (data) => {
    setDcContent(data);
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
  const _dcCoverSelectHandler = (e) => {
    setDcCoverSelect(e.target.value);
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
  const _dcSmryKrHandler = (e)=>{
    setDcSmryKr(e.target.value)
  }
  const _openCategoryModal = (categoryModalType) => {
    dispatch(setModal("CategoryModal"));
    dispatch(setCategoryModalType(categoryModalType));
  };

  /* 부모 컴포넌트에서 호출할 수 있는 함수.*/
  useImperativeHandle(ref, () => ({
    /* input state 값들을 객체에 담아서 반환함.*/
    getCrawlFormData() {
      let _docs = {};
      let _dcCoverSelect = [];
      _dcCoverSelect.push(dcCoverSelect);
      _docs["dc_content"] = dcContent;
      _docs["dc_dt_write"] = dcDtWrite;
      _docs["dc_dt_regi"] = dcDtRegi;
      _docs["dc_keyword"] = dcKeyword;
      _docs["dc_code"] = dcCodeList;
      _docs["dc_country"] = dcCountryIndexList;
      _docs["dc_country_pub"] = dcCountryPubIndexList;
      _docs["dc_lang"] = dcLanguageIndexList; // dc_lang이라고 한 이유는 아직 DB필드에서는 언어가 dc_lang이기 때문. 추후 dc_language로 변경 예정.
      _docs["dc_type"] = dcTypeIndexList;
      _docs["dc_cover"] =
        type !== "screening" && type !== "refine" && type !== "register"
          ? _dcCoverSelect
          : dcCover;
      _docs["dc_smry_kr"] = dcSmryKr;
      _docs["dc_publisher"] = dcPublisher;
      _docs["dc_page"] = dcPage;
      _docs["dc_title_or"] = dcTitleOr;
      _docs["dc_title_kr"] = dcTitleKr;
      _docs["dc_url_loc"] = dcUrlLoc;
      _docs["item_id"] = itemId;

      return _docs;
    },
  }));
  useEffect(() => {
    console.log(docs);
    /* docs가 빈 객체가 아니라면 */
    if (Object.keys(docs).length !== 0) {
      setDcContent(docs.dc_content);
      setDcDtWrite(docs.dc_dt_write.substring(0, 10)); // date 객체에 넣어주기
      setDcDtRegi(docs.dc_dt_regi.substring(0, 10));
      setDcKeyword(docs.dc_keyword);
      setDcKeywordString(docs.dc_keyword.join(", "));
      setDcCover(docs.dc_cover);
      setDcCoverSelect(docs.dc_cover[0] || "");
      setDcSmryKr(docs.dc_smry_kr);
      setDcPublisher(docs.dc_publisher);
      setDcPage(docs.dc_page);
      setDcTitleOr(docs.dc_title_or);
      setDcTitleKr(docs.dc_title_kr);
      setDcUrlLoc(docs.dc_url_loc);
      dispatch(setModalData(docs.dc_code, "dc_code"));
      dispatch(setModalData(docs.dc_country, "dc_country"));
      dispatch(setModalData(docs.dc_country_pub, "dc_country_pub"));
      dispatch(setModalData([docs.dc_language], "dc_language"));
      dispatch(setModalData([], "dc_custom")); // 빈 값 초기화용...
      setItemId(docs.item_id);
    }
  }, [docs]);

  /* dcKeywordString 값이 변경되면 dcKeyword 배열도 자동으로 반영되도록.*/
  useEffect(() => {
    const _stringToArrayKeywordArray = dcKeywordString.split(", ");
    setDcKeyword(_stringToArrayKeywordArray);
  }, [dcKeywordString]);

  useEffect(() => {
    const _dcCountryIndexList = dcCountry.map((item) => item.CODE);
    setDcCountryIndexList(_dcCountryIndexList);
  }, [dcCountry]);

  useEffect(() => {
    const _dcTypeIndexList = dcType.map((item) => item.CODE);
    setDcTypeIndexList(_dcTypeIndexList);
  }, [dcType]);

  useEffect(() => {
    const _dcCodeList = dcCode.map((item) => item.CODE);
    setDcCodeList(_dcCodeList);
  }, [dcCode]);

  useEffect(() => {
    const _dcCountryPub = dcCountryPub.map((item) => item.CODE);
    setDcCountryPubIndexList(_dcCountryPub);
  }, [dcCountryPub]);

  useEffect(() => {
    const _dcLanguage = dcLanguage.map((item) => item.CODE);
    setDcLanguageIndexList(_dcLanguage);
  }, [dcLanguage]);

  useEffect(() => {
    const _dcCustom = dcCustom.map((item) => item.CODE);
    setDcCustomIndexList(_dcCustom);
  }, [dcCustom]);

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
            <p className="title">원문 요약</p>
            <input
              onChange={_dcSmryKrHandler}
              value={dcSmryKr}
              className="form"
              type="text"
              placeholder="원문 요약을 입력하세요"
            />
          </CustomFormItem>
        </CustomFormRow>
        {type !== "refine" && (
          <CustomFormRow>
            <CustomFormItem>
              <div className="title">
                <p>문서 대상 국가</p>
                <button
                  onClick={() => {
                    _openCategoryModal("dc_country");
                  }}
                >
                  <MdSettings /> 설정
                </button>
              </div>
              <div className="form notInput">
                {dcCountry.map((item, index) => {
                  return <CustomList key={index}>{item.CT_NM}</CustomList>;
                })}
              </div>
            </CustomFormItem>
            <CustomFormItem>
              <div className="title">
                <p>문서 발행 국가</p>
                <button
                  onClick={() => {
                    _openCategoryModal("dc_country_pub");
                  }}
                >
                  <MdSettings /> 설정
                </button>
              </div>
              <div className="form notInput">
                {dcCountryPub.map((item, index) => {
                  return <CustomList key={index}>{item.CT_NM}</CustomList>;
                })}
              </div>
            </CustomFormItem>
          </CustomFormRow>
        )}
        {type !== "refine" && (
          <CustomFormRow>
            <CustomFormItem>
              <div className="title">
                <p>정책 분류</p>
                <button
                  onClick={() => {
                    _openCategoryModal("dc_code");
                  }}
                >
                  <MdSettings /> 설정
                </button>
              </div>
              <div className="form notInput">
                {dcCode.map((item, index) => {
                  return <CustomList key={index}>{item.CT_NM}</CustomList>;
                })}
              </div>
            </CustomFormItem>
            <CustomFormItem>
              <div className="title">
                <p>문서 유형</p>
                <button
                  onClick={() => {
                    _openCategoryModal("dc_type");
                  }}
                >
                  <MdSettings /> 선택
                </button>
              </div>
              <div className="form notInput">
                {dcType.map((item, index) => {
                  return <CustomList key={index}>{item.CT_NM}</CustomList>;
                })}
              </div>
            </CustomFormItem>
          </CustomFormRow>
        )}
        <CustomFormRow>
          <CustomFormItem>
            <div className="title">
              <p>언어</p>
              <button
                onClick={() => {
                  _openCategoryModal("dc_language");
                }}
              >
                <MdSettings /> 선택
              </button>
            </div>
            <div className="form notInput">
              {dcLanguage.map((item, index) => {
                return <CustomList key={index}>{item.CT_NM}</CustomList>;
              })}
            </div>
          </CustomFormItem>
          <CustomFormItem>
            <div className="title">
              <p>기관맞춤형 분류</p>
              <button
                onClick={() => {
                  _openCategoryModal("dc_custom");
                }}
              >
                <MdSettings /> 선택
              </button>
            </div>
            <div className="form notInput">
              {dcCustom.map((item, index) => {
                return <CustomList key={index}>{item.CT_NM}</CustomList>;
              })}
            </div>
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
          <CustomFormItem>
            <p className="title">원문 작성일</p>
            <input
              value={dcDtWrite}
              onChange={_dcDtWriteHandler}
              className="form"
              type="date"
              placeholder="원문 작성일을 입력하세요."
            />
          </CustomFormItem>
        </CustomFormRow>
        <CustomFormRow>
          <CustomFormItem>
            <p className="title">문서 위치 URL</p>
            <input
              value={dcUrlLoc}
              onChange={_dcUrlLocHandler}
              className="form"
              type="text"
              placeholder="문서 위치의 URL을 입력하세요."
            />
          </CustomFormItem>
          <CustomFormItem>
            <p className="title">문서 등록일</p>
            <input
              onChange={_dcDtRegiHandler}
              value={dcDtRegi}
              className="form"
              type="date"
            />
          </CustomFormItem>
        </CustomFormRow>
        <CustomFormRow>
          <CustomFormItem>
            <p className="title">발행 기관</p>
            <input
              value={dcPublisher}
              onChange={_dcPublisherHandler}
              className="form"
              type="text"
              placeholder="원문의 발행자 및 발행기관 명을 입력하세요."
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

        <CustomFormRow></CustomFormRow>
        {type !== "refine" && type !== "register" && (
          <CustomFormRow>
            <CustomFormItem>
              <p className="title">내용</p>
              <Editor
                data={dcContent}
                _dcContentHandler={_dcContentHandler}
                _id={_id}
              />
            </CustomFormItem>
          </CustomFormRow>
        )}
        {type !== "refine" && type !== "register" && (
          <CustomFormRow>
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
          </CustomFormRow>
        )}
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

const CustomList = styled.div`
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  background-color: #eee;
  min-width: 4rem;
  text-align: center;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
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
