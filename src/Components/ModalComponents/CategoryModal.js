import React,{useState,useEffect} from "react";
import { useSelector,useDispatch} from "react-redux";
import {sessionHandler,categoryListFetchApi} from "../../Utils/api"
import { trackPromise } from "react-promise-tracker";

import styled from "styled-components";

function CategoryModal({ executeModal, closeModal }) {
  const dispatch  = useDispatch();
  const categoryModalType = useSelector(
    (state) => state.modal.categoryModalType
  );
  const CATEGORY_TYPE_DATA = {
    dcCode: {
      type:1,
      title: "정책 분류 설정",
      subTitle:
        "해당 문서의 정책 분류를 선택해주세요. 추가된 정책 분류는 아래의 리스트에서 미리 볼 수 있으며, 추가된 칩을 클릭하면 목록에서 삭제됩니다.",
    },
    dcCountry: {
      type:3,
      title: "문서 대상 국가 설정",
      subTitle:
        "해당 문서의 대상 국가를 선택해주세요. 추가된 국가는 아래의 리스트에서 미리 볼 수 있으며, 추가된 칩을 클릭하면 목록에서 삭제됩니다.",
    },
    dcCountryPub: {
      type:3,
      title: "문서 발행 국가 설정",
      subTitle:
        "해당 문서의 발행 국가를 선택해주세요. 추가된 국가는 아래의 리스트에서 미리 볼 수 있으며, 추가된 칩을 클릭하면 목록에서 삭제됩니다.",
    },
    dcTopic: {
      type:5,
      title: "토픽 분류 설정",
      subTitle: "해당 문서의 토픽 분류를 선택해주세요.",
    },
    dcTypeDoc: {
      type:4,
      title: "문서 유형 설정",
      subTitle: "해당 문서의 유형을 선택해주세요.",
    },
    dcTypeContent: {
      type:4,
      title: "내용 구분 설정",
      subTitle: "해당 문서의 내용 구분을 선택해주세요.",
    },
    dcLanguage: {
      type:4,
      title: "언어 설정",
      subTitle: "해당 문서의 언어를 선택해주세요.",
    },
  };
  const [categoryList, setCategoryList] = useState([
    { length: 2, list: [] },
    { length: 4, list: [] },
    { length: 6, list: [] },
  ]);
  const [upperCode, setUpperCode] = useState({ 2: null, 4: null, 6: null });
  const [length, setLength] = useState(2); // 대분류 (2) 중분류 (4) 소분류 (6)

  const upperCodeHandler = (code, length) => {
    let _upperCode = { ...upperCode };
    _upperCode[length] = code;
    setUpperCode(_upperCode);
  };
  const lengthHandler = (length) => {
    setLength(length);
  };

  /* 데이터 불러오기 */
  const dataFetch = () => {
    const type = CATEGORY_TYPE_DATA[categoryModalType].type;
    trackPromise(
      categoryListFetchApi(type, length, upperCode[length - 2])
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          sessionHandler(err, dispatch).then((res) => {
            categoryListFetchApi(type, length, upperCode[length - 2]).then(
              (res) => {
                 console.log(res.data)
              }
            );
          });
        })
    );
  };

  useEffect(() => {
    
    dataFetch();
  }, [categoryModalType]);

  return (
    <>
      <ModalWrapper>
        <Modalheader>
          <ModalTitle>{CATEGORY_TYPE_DATA[categoryModalType].title}</ModalTitle>
          <ModalSubTitle>
            {CATEGORY_TYPE_DATA[categoryModalType].subTitle}
          </ModalSubTitle>
        </Modalheader>
        <ModalBody></ModalBody>
        <ModalActions>
          <Button color="#435269">
            <p>저장</p>
          </Button>
          <Button color="#bfbfbf" onClick={closeModal}>
            <p>취소</p>
          </Button>
        </ModalActions>
      </ModalWrapper>
    </>
  );
}

/* 모달 디자인 관련 컴포넌트 ... 나중에 전역 관리 할 수 있음 좋겠네 ㅠ */
const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 0.25rem;
  padding: 1.5rem;
`;
const Modalheader = styled.div`
  justify-content: left;
  margin-bottom: 1rem;
`;
const ModalTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: rgba(0, 0, 0, 0.7);
`;
const ModalSubTitle = styled.div`
  font-size: 16px;
  margin-bottom: 0.5rem;
`;
const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

const Button = styled.button`
  background-color: ${(props) => props.color || "grey"};
  cursor: pointer;
  min-width: 5rem;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  margin: 0 0.5rem 0 0.5rem;
`;

export default CategoryModal;
