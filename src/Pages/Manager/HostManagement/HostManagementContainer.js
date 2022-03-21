import React, { useState, useEffect } from "react";
import HostManagement from "./HostManagement";

function HostManagementContainer() {
  const [hostList, setHostList] = useState([]);
  const [filterObj, setFilterObj] = useState({});
  const [filterOpen,setFilterOpen] = useState(false);


  const _filterOpenHandler = ()=>{
    setFilterOpen(!filterOpen)
  }
  return (
    <>
      <HostManagement filterOpen={filterOpen} _filterOpenHandler={_filterOpenHandler}/>
    </>
  );
}
export default HostManagementContainer;
