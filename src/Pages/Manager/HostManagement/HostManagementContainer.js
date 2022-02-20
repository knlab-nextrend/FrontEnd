import React, { useState, useEffect } from "react";
import HostManagement from "./HostManagement";

function HostManagementContainer() {
  const [hostList, setHostList] = useState([]);
  const [filterObj, setFilterObj] = useState({});

  return (
    <>
      <HostManagement/>
    </>
  );
}
export default HostManagementContainer;
