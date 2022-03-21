import React, { useState, useEffect } from "react";
import HostManagement from "./HostManagement";

function HostManagementContainer() {
  const [hostList, setHostList] = useState([]);
  
  const [filterOpen,setFilterOpen] = useState(true);


  /* 검색 필터 변수 */
  const [filterDomain,setFilterDomain] = useState("");
  const [filterLanguage, setFilterLanguage] = useState("");
  const [filterCountry,setFilterCountry] = useState("");
  const [filterPublisherName,setFilterPublisherName] = useState("");
  const [filterCrawlPeriod, setFilterCrawlPeriod] = useState("");

  const filterSearch = () =>{
    
  }
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
