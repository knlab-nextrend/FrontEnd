import React, { useState } from "react";
import ExcelDataRegister from "./ExcelDataRegister";
import XLSX from "xlsx";
function ExcelDataRegisterContainer() {
  const [excelData, setExcelData] = useState([]);
  const [pdfData, setPdfData] = useState([]);
  const [pdfMetaData, setPdfMetaData] = useState([]);
  const [step, setStep] = useState(1);

  function getfileSize(x) {
    var s = ["bytes", "kB", "MB", "GB", "TB", "PB"];
    var e = Math.floor(Math.log(x) / Math.log(1024));
    return (x / Math.pow(1024, e)).toFixed(2) + " " + s[e];
  }

  const deletePdf = (name) => {
    if (confirm("해당 PDF파일을 목록에서 제거하시겠습니까?")) {
      const _newPdfData = pdfData.filter((file) => file.name !== name);
      const _newPdfMetaData = pdfMetaData.filter((file) => file.name !== name);
      setPdfData(_newPdfData);
      setPdfMetaData(_newPdfMetaData);
    }
  };
  const readPdf = (e) => {
    console.log(e.target.files);
    const files = e.target.files;
    const _pdfData = [];
    const _pdfMetaData = [];
    for (const file of files) {
      console.log(getfileSize(file.size));
      const available = excelData.filter((x) => x.pdf_file_name === file.name);
      console.log(available);
      const _obj = {
        size: getfileSize(file.size),
        name: file.name,
        available: available.length !== 0,
      };
      _pdfData.push(file);
      _pdfMetaData.push(_obj);
    }

    setPdfData(_pdfData);
    setPdfMetaData(_pdfMetaData);
  };
  const readExcel = (e) => {
    let _excelData = [];
    let input = e.target;
    let reader = new FileReader();
    reader.onload = function () {
      let data = reader.result;
      let workBook = XLSX.read(data, { type: "binary" });
      workBook.SheetNames.forEach(function (sheetName) {
        console.log("SheetName: " + sheetName);
        let rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);
        console.log(rows);
        /* sheet 에 포함된 row 데이터를 순회*/
        rows.forEach((item, index) => {
          let _obj = {
            dc_keyword: item["키워드(태그)"],
            dc_cat: item["유형분류"],
            dc_country: item["대상국가"],
            dc_title_kr: item["한글제목"],
            dc_title_or: item["원제목"],
            dc_content: item["본문내용"],
            dc_publisher: item["발행기관"],
            dc_dt_write: item["발행일"],
            dc_page: item["발행면수"],
            pdf_file_name: item["PDF파일명"],
          };
          _excelData.push(_obj);
        });
      });
      console.log(_excelData);
      setExcelData(_excelData);
    };
    reader.readAsBinaryString(input.files[0]);
  };

  const regiExcel = () => {
    if (excelData.length === 0) {
      alert("등록할 데이터가 없습니다.");
    } else {
      alert("성공적으로 엑셀 데이터가 로딩되었습니다.");
    }
  };
  const nextStep = () => {
    if (step === 1 && excelData.length === 0) {
      alert("엑셀 데이터 등록 해주세요.");
      return;
    }
    if (step === 2 && pdfData.length === 0) {
      alert("PDF 파일을 등록 해주세요.");
      return;
    }
    if (step === 3) {
      return;
    }
    setStep((prev) => prev + 1);
  };
  const prevStep = () => {
    if (step === 1) {
      return;
    }
    setStep((prev) => prev - 1);
  };

  return (
    <>
      <ExcelDataRegister
        readPdf={readPdf}
        setExcelData={setExcelData}
        readExcel={readExcel}
        regiExcel={regiExcel}
        nextStep={nextStep}
        prevStep={prevStep}
        step={step}
        pdfMetaData={pdfMetaData}
        deletePdf={deletePdf}
      />
    </>
  );
}
export default ExcelDataRegisterContainer;
