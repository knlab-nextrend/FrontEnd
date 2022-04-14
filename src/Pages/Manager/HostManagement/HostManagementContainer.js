import React, { useState, useEffect } from "react";
import HostManagement from "./HostManagement";
import XLSX from "xlsx";
import { HostManagementApi, sessionHandler } from "../../../Utils/api";
import { useDispatch, useSelector } from "react-redux";
import {
  setModal,
  setModalData,
  setCategoryModalType,
} from "../../../Modules/modal";
import { trackPromise } from "react-promise-tracker";

function HostManagementContainer() {
  const dispatch = useDispatch();
  const [hostList, setHostList] = useState([]);
  const [currentHostList, setCurrentHostList] = useState([]);
  const [selectedHost, setSelectedHost] = useState(null);
  /* 검색 필터 변수 */
  const [filterInputs, setFilterInputs] = useState({
    host: "",
    lang: "",
    country: "",
    name: "",
    category: "",
    workCycle: "",
  });
  const { host, lang, country, name, category, workCycle } = filterInputs; // 비구조화 할당을 통해 값 추출
  const [filterOpen, setFilterOpen] = useState(true);

  /* crawlDataForm 과 공유하여 사용. 어차피 각 화면은 독립적이기 때문에. */
  const [hostPublisher, setHostPublisher] = useState("");
  const [hostWorkCycle, setHostWorkCycle] = useState("");
  const docLanguage = useSelector(
    (state) => state.modal.modalData.doc_language
  ); // doc_language HOST 언어
  const docCountry = useSelector((state) => state.modal.modalData.doc_country); // doc_country HOST 국가
  const docCategory = useSelector(
    (state) => state.modal.modalData.doc_category
  ); // doc_category HOST 정책 분류

  const dummy_data = [
    {
      idx: 111,
      host: "www.naver.com",
      start_time: "2022-04-14 21:32:00",
      end_time: "2022-04-10 21:32:00",
      running_time: "1초",
      url: 1111,
      html: 2222,
      pdf: 333,
      word: 344,
      excel: 22,
      ppt: 33,
      etc: 11,
      test_end: true,
      is_registered: true,
    },
    {
      idx: 222,
      host: "www.youtube.com",
      start_time: "2022-04-14 21:32:00",
      end_time: "2022-04-10 21:32:00",
      running_time: "2초",
      url: 111211,
      html: 212222,
      pdf: 33213,
      word: 34214,
      excel: 2212,
      ppt: 2133,
      etc: 1211,
      test_end: true,
      is_registered: false,
    },
    {
      idx: 333,
      host: "www.daum.net",
      start_time: "2022-04-14 21:32:00",
      end_time: "2022-04-10 21:32:00",
      running_time: "3초",
      url: null,
      html: null,
      pdf: null,
      word: null,
      excel: null,
      ppt: null,
      etc: null,
      test_end: false,
      is_registered: true,
    },
    {
      idx: 444,
      host: "www.google.co.kr",
      start_time: "2022-04-14 21:32:00",
      end_time: "2022-04-10 21:32:00",
      running_time: "3초",
      url: 111211,
      html: 212222,
      pdf: 33213,
      word: 34214,
      excel: 2212,
      ppt: 2133,
      etc: 1211,
      test_end: true,
      is_registered: false,
    },
  ];
  const _hostPublisherHandler = (e) => {
    setHostPublisher(e.target.value);
  };
  const _hostWorkCycleHandler = (e) => {
    setHostWorkCycle(e.target.value);
  };
  const _registerHostOpenHandler = (host) => {
    console.log(host);

    //현재 선택된 host_id 새로 보고자 하는 host_id 같을경우 이미 오픈된 목록을 닫는걸로 생각
    if (selectedHost) {
      if (selectedHost.idx === host.idx) {
        setSelectedHost(null);
      } else {
        setSelectedHost(host);
        dispatch(setModalData([], "doc_category")); // 값 비우는 것
        dispatch(setModalData([], "doc_country")); // 값 비우는 것
        dispatch(setModalData([], "doc_language")); // 값 비우는 것
      }
    } else {
      setSelectedHost(host);
      dispatch(setModalData([], "doc_category")); // 값 비우는 것
      dispatch(setModalData([], "doc_country")); // 값 비우는 것
      dispatch(setModalData([], "doc_language")); // 값 비우는 것
    }
  };
  const _openCategoryModal = (categoryModalType) => {
    dispatch(setModal("CategoryModal"));
    dispatch(setCategoryModalType(categoryModalType));
  };
  const _filterInputsHandler = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setFilterInputs({
      ...filterInputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };
  const filterSearch = () => {
    let _result = [...hostList];
    for (let key in filterInputs) {
      // host와 name은 포함검색되어야하기에
      if (key !== "host" && key !== "name") {
        if (filterInputs[key] !== "") {
          _result = _result.filter((item) => {
            return item[key] === filterInputs[key];
          });
        }
      } else {
        _result = _result.filter((item) => {
          return item[key].includes(filterInputs[key]);
        });
      }
    }
    setCurrentHostList(_result);
  };
  const _filterOpenHandler = () => {
    setFilterOpen(!filterOpen);
  };

  const excelUpload = (e) => {
    let _excelData = [];
    let input = e.target;
    let reader = new FileReader();
    reader.onload = function () {
      let data = reader.result;
      const excelFile = XLSX.read(data, { type: "binary" });
      const sheetName = excelFile.SheetNames[0];
      const firstSheet = excelFile.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet, { defval: "" });
      jsonData.map((item) => {
        _excelData.push({
          host: item["HOST 도메인"],
          country: item["HOST 해당 국가"],
          lang: item["HOST 해당 언어"],
          name: item["발급 기관 명"],
          category: item["HOST 정책 분류"],
          workCycle: item["크롤링 수집주기"],
        });
      });
      wordDataUpload(_excelData);
    };
    reader.readAsBinaryString(input.files[0]);
  };
  const excelDownload = () => {
    // 새 엑셀 임시 새 문서 생성
    const book = XLSX.utils.book_new();
    // 값 생성
    let _arr = [
      [
        "HOST 도메인",
        "HOST 해당 언어",
        "HOST 해당 국가",
        "발급 기관 명",
        "HOST 정책 분류",
        "크롤링 수집주기",
      ],
    ];
    hostList.map((item) => {
      _arr.push([
        item.host,
        item.lang,
        item.country,
        item.name,
        item.category,
        item.workCycle,
      ]);
    });
    const _hostArray = XLSX.utils.aoa_to_sheet(_arr);
    // 첫번째 시트에 생성한 데이터를 넣는다.
    XLSX.utils.book_append_sheet(book, _hostArray, "HOST 목록");
    // 엑셀파일을 생성하고 저장한다.
    XLSX.writeFile(book, `host_list.xlsx`);
  };

  const wordDataUpload = (excel_data) => {
    HostManagementApi({ list: excel_data }, "POST").then((res) => {
      if (res.status === 200) {
        alert("성공적으로 업로드되었습니다");
        dataFetch();
      }
    });
  };
  const hostRegisterUpload = () => {
    if (selectedHost) {
      if (
        hostPublisher === "" ||
        docCountry.length === 0 ||
        docCategory.length === 0 ||
        docLanguage.length === 0 ||
        hostWorkCycle === ""
      ) {
        alert("모든 값을 채워주세요");
        return;
      } else if (docCountry.length > 1) {
        alert("국가는 하나만 선택 가능합니다.");
      } else if (docCategory.length > 1) {
        alert("정책 분류는 하나만 선택 가능합니다.");
      } else if (docLanguage.length > 1) {
        alert("언어는 하나만 선택 가능합니다.");
      } else {
        const docCountryIndex = docCountry[0].IDX;
        const docCategoryIndex = docCategory[0].IDX;
        const docLanguageIndex = docLanguage[0].IDX;
        console.log({
          category: docCategoryIndex,
          country: docCountryIndex,
          lang: docLanguageIndex,
          name: hostPublisher,
          host: selectedHost.host,
          workCycle:hostWorkCycle,
        });
      }
    } else {
      alert("host를 선택해주세요.");
    }
  };
  const dataFetch = () => {
    trackPromise(
      HostManagementApi(null, "GET")
        .then((res) => {
          console.log(res.data);
          dataCleansing(res.data);
        })
        .catch((err) => {
          sessionHandler(err, dispatch).then((res) => {
            HostManagementApi(null, "GET").then((res) => {
              dataCleansing(res.data);
            });
          });
        })
    );
  };
  const dataCleansing = (rawData) => {
    const _arr = rawData.map((item) => {
      let _obj = {};
      _obj["host"] = item.HOST || "";
      _obj["lang"] = item.LANG ? item.LANG.toString() : "";
      _obj["name"] = item.NAME || "";
      _obj["country"] = item.COUNTRY ? item.COUNTRY.toString() : "";
      _obj["category"] = item.CATEGORY ? item.CATEGORY.toString() : "";
      _obj["workCycle"] = item.WORK_CYCLE ? item.WORK_CYCLE.toString() : "";
      return _obj;
    });
    setHostList(_arr);
  };

  useEffect(() => {
    dataFetch();
  }, []);
  useEffect(() => {
    setCurrentHostList(hostList);
  }, [hostList]);
  return (
    <>
      <HostManagement
        currentHostList={currentHostList}
        filterOpen={filterOpen}
        _filterOpenHandler={_filterOpenHandler}
        _filterInputsHandler={_filterInputsHandler}
        filterSearch={filterSearch}
        excelDownload={excelDownload}
        excelUpload={excelUpload}
        _registerHostOpenHandler={_registerHostOpenHandler}
        selectedHost={selectedHost}
        dummy_data={dummy_data}
        _openCategoryModal={_openCategoryModal}
        docCountry={docCountry}
        docCategory={docCategory}
        docLanguage={docLanguage}
        hostRegisterUpload={hostRegisterUpload}
        _hostPublisherHandler={_hostPublisherHandler}
        _hostWorkCycleHandler={_hostWorkCycleHandler}
      />
    </>
  );
}
export default HostManagementContainer;
