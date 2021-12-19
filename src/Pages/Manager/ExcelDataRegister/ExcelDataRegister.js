import React, { useState } from "react";
import styled from "styled-components";
import FormHeader from "../../../Components/FormHeader";
import { HiOutlineDocumentReport, HiOutlineDocumentText } from "react-icons/hi";
import { FaCloudUploadAlt } from "react-icons/fa";
import { RiFileExcel2Line } from "react-icons/ri";
import {
  AiOutlineFilePdf,
  AiOutlineSearch,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";

function ExcelDataRegister({
  readExcel,
  nextStep,
  prevStep,
  step,
  setExcelData,
}) {
  const [excelFilename, setExcelFilename] = useState(null);
  const [pdfFilename, setPdfFilename] = useState(null);
  const excelFileHandler = (e) => {
    setExcelFilename(e.target.files[0].name);
    readExcel(e);
  };
  const pdfFileHandler = (e) => {
    setPdfFilename(e.target.files[0].name);
  };
  const excelFileDelete = (e) => {
    setExcelFilename(null);
    setExcelData([]);
  };
  return (
    <>
      <FormHeader type={"view"} title={"대량 엑셀 데이터 등록"} />
      <Wrapper>
        {step === 1 && (
          <UploadContainer>
            <HeaderContainer color="#217346">
              <div className="step">STEP 1</div>
              <div className="title">
                <FaCloudUploadAlt size="30" color="#fff" />
                <div className="bold">EXCEL</div>
                <div>파일 업로드</div>
              </div>
            </HeaderContainer>
            <BodyContainer>
              <RiFileExcel2Line size="100" color="#d6d6d6" />
              <div className="explain">
                <span className="emphasis">DB 제출용 포맷</span>
                <span>에 맞추어진 </span>
                <span className="emphasis">엑셀 파일</span>
                <span>을 업로드 후 다음 단계를 진행해주세요.</span>
              </div>
              <div className="upload">
                <div className="select-file">
                  <label htmlFor="excelFile">파일 선택</label>
                  <input
                    onChange={excelFileHandler}
                    type="file"
                    id="excelFile"
                    accept=".csv , .xls , .xlsx"
                  />
                  <span>{excelFilename || "엑셀 파일을 등록해주세요."}</span>
                </div>
                <button className="delete-button" onClick={excelFileDelete} >삭제</button>
              </div>
            </BodyContainer>
          </UploadContainer>
        )}
        {step === 2 && (
          <UploadContainer>
            <HeaderContainer color="#c83636">
              <div className="step">STEP 2</div>
              <div className="title">
                <FaCloudUploadAlt size="30" color="#fff" />
                <div className="bold">PDF</div>
                <div>파일 업로드</div>
              </div>
            </HeaderContainer>
            <BodyContainer>
              <AiOutlineFilePdf size="100" color="#d6d6d6" />
              <div className="explain">
                <span className="emphasis">PDF파일</span>
                <span>을 업로드 해주세요.</span>
              </div>
              <div className="upload">
                <div className="select-file">
                  <label htmlFor="pdfFile">파일 선택</label>
                  <input
                    onChange={pdfFileHandler}
                    type="file"
                    id="pdfFile"
                    accept=".pdf"
                  />
                  <span>{pdfFilename || "PDF 파일을 등록해주세요."}</span>
                </div>
                <button className="upload-button">데이터 등록</button>
              </div>
            </BodyContainer>
          </UploadContainer>
        )}
        {step === 3 && (
          <UploadContainer>
            <HeaderContainer color="#435269">
              <div className="step">STEP 3</div>
              <div className="title">
                <AiOutlineSearch size="30" color="#fff" />
                <div className="bold">PDF 및 EXCEL</div>
                <div>검토</div>
              </div>
            </HeaderContainer>

            <BodyContainer>
              <div className="explain">
                <span className="emphasis">EXCEL 파일</span>
                <span>과 </span>
                <span className="emphasis">PDF 파일</span>
                <span>
                  을 대조한 결과 입니다. 파일을 검토하여 적절하지 못한 파일은
                  삭제하여주세요.
                </span>
              </div>
              <FileList>
                <FileCard>
                  <div className="file-container">
                    <HiOutlineDocumentText size="40" color="#d6d6d6" />
                    <div className="file-info">
                      <span>머시기머시기 대충 파일명...pdf</span>
                      <span>10 MB</span>
                    </div>
                  </div>
                  <div className="file-availability">
                    <AiOutlineCheckCircle size="24" color="#6DAF44" />
                    <div>작업 가능</div>
                  </div>
                </FileCard>
                <FileCard>
                  <div className="file-container">
                    <HiOutlineDocumentText size="40" color="#d6d6d6" />
                    <div className="file-info">
                      <span>머시기머시기 대충 파일명...pdf</span>
                      <span>10 MB</span>
                    </div>
                  </div>
                  <div className="file-availability">
                    <AiOutlineCloseCircle size="24" color="#d0021b" />
                    <div>EXCEL과 매치 불가</div>
                  </div>
                </FileCard>
              </FileList>
            </BodyContainer>
          </UploadContainer>
        )}
        <ButtonContainer>
          {step !== 1 && <button onClick={prevStep}>{"< 이전 단계"}</button>}
          <button onClick={nextStep}>{"다음 단계 >"}</button>
        </ButtonContainer>
      </Wrapper>
    </>
  );
}

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  button {
    background-color: grey;
    color: white;
    font-weight: bold;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    width: 10rem;
    border-radius: 4px;
    height: 2rem;
    transition: 0.2s;
    &:hover {
      background-color: #d6d6d6;
    }
  }
`;
const FileList = styled.div`
  width: 90%;
  margin: 2rem auto;
`;
const FileCard = styled.div`
  border-radius: 4px;
  box-shadow: rgb(9 30 66 / 25%) 0px 1px 1px;
  padding: 0.5rem 1rem 0.5rem 1rem;
  width: 100%;
  margin: 1rem 0 1rem 0;
  display: flex;
  justify-content: space-between;
  .file-container {
    display: flex;
  }
  .file-info {
    margin-left: 1rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    div:nth-child(2) {
      color: #363636;
      font-size: 12px;
    }
  }
  .file-availability {
    display: flex;
    align-items: center;
    div {
      margin-left: 0.5rem;
      font-size: 18px;
    }
  }
`;
const Wrapper = styled.div``;
const UploadContainer = styled.div`
  @keyframes loadEffect2 {
    0% {
      opacity: 0;
      transform: translateX(-30px);
    }
    50% {
      opacity: 0.5;
      transform: translateX(30px);
    }
    100% {
      opacity: 1;
      transform: translateX(0px);
    }
  }
  animation: 0.6s ease-in-out loadEffect2;
  border-radius: 4px;
  box-shadow: rgb(9 30 66 / 25%) 0px 1px 1px;
  margin: 1rem;
`;
const HeaderContainer = styled.div`
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: left;
  div {
    font-size: 24px;
  }
  .bold {
    font-weight: bold;
  }
  .step {
    font-size: 18px;
    border-top-left-radius: 4px;
    display: flex;
    align-items: center;
    padding-right: 2rem;
    padding-left: 2rem;
    height: 100%;
    background-color: grey;
    /* background-color: #435269; */
  }
  .title {
    display: flex;
    margin-left: 1rem;
    div {
      margin-left: 5px;
    }
  }
  background-color: ${(props) => props.color || "grey"};
  color: white;
  height: 3rem;
`;
const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  min-height: 20rem;
  .explain {
    margin: 1rem;
  }
  .emphasis {
    font-weight: bold;
  }
  .upload {
    display: flex;
    height: 32px;
  }
  .upload-button,
  .delete-button {
    margin-left: 1rem;
    border: none;
    padding: 0 1rem 0 1rem;
    border-radius: 5px;
    background-color: grey;
    color: white;
    font-weight: bold;
    cursor: pointer;
  }
  .select-file {
    display: flex;
    align-items: center;
    border-radius: 4px;
    font-size: 14px;
    border: solid 1px #d6d6d6;
    label {
      display: flex;
      align-items: center;
      background: #eee;
      height: 100%;
      cursor: pointer;
      padding-left: 1rem;
      padding-right: 1rem;
      width: 5rem;
      justify-content: center;
    }
    span {
      padding-left: 1rem;
      padding-right: 1rem;
      min-width: 15rem;
      max-width: 20rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    input[type="file"] {
      display: none;
    }
  }
`;

export default ExcelDataRegister;
