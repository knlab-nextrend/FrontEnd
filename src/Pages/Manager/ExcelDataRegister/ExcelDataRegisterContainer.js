import React,{useState} from "react";
import ExcelDataRegister from "./ExcelDataRegister";
import XLSX from "xlsx";
function ExcelDataRegisterContainer() {

  const [excelData,setExcelData] = useState([]);
  const readExcel = (e) => {
    let _excelData = [];
    let input = e.target;
    console.log(input)
    let reader = new FileReader();
    reader.onload = function () {
      let data = reader.result;
      console.log(data);
      // let workBook = XLSX.read(data, { type: "binary" });
      // workBook.SheetNames.forEach(function (sheetName) {
      //   console.log("SheetName: " + sheetName);
      //   let rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);
      //   console.log(rows)
      //   /* sheet 에 포함된 row 데이터를 순회*/
      //   rows.forEach((item,index)=>{
      //     let _obj = {
      //       dc_country:item["대상국가"],
      //       dc_keyword:item["키워드(태그)"],
      //     }
      //     _excelData.push(_obj)
      //   })
      // });
      // console.log(_excelData)
    };
    //reader.readAsBinaryString(input.files[0]);
  };

  const regiExcel = (data)=>{      
    console.log(data)
  }

  return (
    <>
      <ExcelDataRegister readExcel={readExcel} />
    </>
  );
}
export default ExcelDataRegisterContainer;
