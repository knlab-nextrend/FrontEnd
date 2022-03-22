import React, { useState, useEffect } from "react";
import HostManagement from "./HostManagement";
import XLSX from "xlsx";

function HostManagementContainer() {
  const [hostList, setHostList] = useState([]);
  /* 검색 필터 변수 */
  const [filterInputs, setFilterInputs] = useState({
    domain: "",
    language: "",
    country: "",
    name: "",
    crawl_period: "",
  });
  const { domain, language, country, name, crawl_period } = filterInputs; // 비구조화 할당을 통해 값 추출
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
          domain: item["HOST 도메인"],
          country: item["HOST 해당 국가"],
          language: item["HOST 해당 언어"],
          name: item["발급 기관 명"],
          crawl_period: item["크롤링 수집주기"],
        });
      });
      setHostList(_excelData);
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
        "크롤링 수집주기",
      ],
    ];
    hostList.map((item)=>{
      _arr.push([item.domain,item.language,item.country,item.name,item.crawl_period])
    })
    const _hostArray = XLSX.utils.aoa_to_sheet(_arr);
    // 첫번째 시트에 생성한 데이터를 넣는다.
    XLSX.utils.book_append_sheet(book, _hostArray, "HOST 목록");
    // 엑셀파일을 생성하고 저장한다.
    XLSX.writeFile(book, "host_list.xlsx");
  };

  
  return (
    <>
      <HostManagement
        hostList={hostList}
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
