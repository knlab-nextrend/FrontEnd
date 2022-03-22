import React, { useState, useEffect } from "react";
import HostManagement from "./HostManagement";
import XLSX from "xlsx";
import { HostManagementApi, sessionHandler } from "../../../Utils/api";
import { useDispatch } from "react-redux";
import { trackPromise } from "react-promise-tracker";

function HostManagementContainer() {
  const dispatch = useDispatch();
  const [hostList, setHostList] = useState([]);
  const [currentHostList, setCurrentHostList] = useState([]);
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

  const _filterInputsHandler = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setFilterInputs({
      ...filterInputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };
  const filterSearch = () => {
    console.log(filterInputs);
    let _result = [...hostList];
    // 이거 reduce 쓰면 조금 낫나 ?

    for (let key in filterInputs) {
      // host와 name은 포함검색되어야하기에
      if (key !== "host" && key !== "name") {
        if (filterInputs[key] !== "") {
          _result = _result.filter((item) => {
            return item[key] === filterInputs[key];
          });
        }
      } else {
        console.log(key);
        _result = _result.filter((item) => {
          return item[key].includes(filterInputs[key]);
        });
      }
    }
    console.log(_result);
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
      _obj["host"] = item.HOST;
      _obj["lang"] = item.LANG.toString();
      _obj["name"] = item.NAME;
      _obj["country"] = item.COUNTRY.toString();
      _obj["category"] = item.CATEGORY.toString();
      _obj["workCycle"] = item.WORK_CYCLE.toString();
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
      />
    </>
  );
}
export default HostManagementContainer;
