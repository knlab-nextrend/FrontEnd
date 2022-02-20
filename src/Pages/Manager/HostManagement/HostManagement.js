import React from "react";
import FormHeader from "../../../Components/FormHeader";
import styled from "styled-components";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
function HostManagement() {
  return (
    <>
      <FormHeader type={"view"} title={"HOST 목록 관리"} />
     
    </>
  );
}

const Wrapper = styled.div`
  margin: 0 5rem 5rem 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
`;
const HostGradeContainer = styled.div`
  border: solid 1px #d6d6d6;
  margin: 1rem 0 1rem 0;
  border-radius: 4px;
  width: 100%;
`;
const HostGradeTitle = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #435269;
  padding: 1rem;
  .grade {
    font-size: 16px;
    font-weight: bold;
  }
  .list-toggle-btn {
    display: flex;
    font-size: 20px;
    align-items: center;
  }
`;
const HostGradeBody = styled.div`
  width: 100%;
`;
const HostGradeTable = styled.table`
  text-align: left;
  width: 100%;
  border-collapse: collapse;
  .grade {
    width: 7rem;
    text-align: center;
  }
  thead {
    position: sticky;
    top: 0px;
    background-color: #d8dee6;
    color: #323d4d;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  }
  tbody tr:nth-child(odd) {
    background-color: #f4f5f8;
  }
  tr {
    height: 2rem;
    border-bottom: solid 1px #eee;
  }
  th,
  td {
    word-break: break-all;
    padding-left: 1rem;
  }
`;
export default HostManagement;
