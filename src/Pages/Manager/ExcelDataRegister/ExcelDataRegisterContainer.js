import React,{useState} from "react";
import ExcelDataRegister from "./ExcelDataRegister";
import XLSX from "xlsx";
function ExcelDataRegisterContainer() {
 
  const [excelData,setExcelData] = useState([]);
  const [step, setStep] = useState(1);

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
        console.log(rows)
        /* sheet 에 포함된 row 데이터를 순회*/
        rows.forEach((item,index)=>{
          let _obj = {
            dc_keyword:item["키워드(태그)"],
            dc_cat:item["유형분류"],
            dc_country:item["대상국가"],
            dc_title_kr:item["한글제목"],
            dc_title_or:item["원제목"],
            dc_content:item["본문내용"],
            dc_publisher:item["발행기관"],
            dc_dt_write:item["발행일"],
            dc_page:item["발행면수"],
          }
          _excelData.push(_obj)
        })
      });
      console.log(_excelData)
      setExcelData(_excelData)
    };
    reader.readAsBinaryString(input.files[0]);
  };


  const regiExcel = ()=>{      
    if(excelData.length === 0){
      alert("등록할 데이터가 없습니다.")
    }
    else{
      alert("성공적으로 엑셀 데이터가 로딩되었습니다.")
    }
  }
  const nextStep = () => {
    if( step === 1 && excelData.length===0 ){
      alert("엑셀 데이터 등록을 먼저 진행해주세요");
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
      <ExcelDataRegister setExcelData={setExcelData} readExcel={readExcel} regiExcel={regiExcel} nextStep={nextStep} prevStep={prevStep} step={step}/>
    </>
  );
}
export default ExcelDataRegisterContainer;
