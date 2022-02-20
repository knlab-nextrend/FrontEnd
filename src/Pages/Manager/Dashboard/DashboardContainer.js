import React , {useState}from "react";
import Dashboard from "./Dashboard";

function DashboardContainer() {

  // docs 문서 통계
  // work 작업자 작업 통계
  // crawl 크롤러 현황
  
  const [menuType,setMenuType] = useState("docs")

  const [process,setProcess] = useState("all")
  const menuHandler = (e)=>{
    setMenuType(e.target.value)
  }
  const processHandler = (select)=>{
    setProcess(select)
  }
  const data = [
    {
      id: "sass",
      label: "sass",
      value: 10,
      color: "hsl(63, 70%, 50%)",
    },
    {
      id: "stylus",
      label: "stylus",
      value: 20,
      color: "hsl(25, 70%, 50%)",
    },
    {
      id: "elixir",
      label: "elixir",
      value: 30,
      color: "hsl(262, 70%, 50%)",
    },
    {
      id: "haskell",
      label: "haskell",
      value: 20,
      color: "hsl(101, 70%, 50%)",
    },
    {
      id: "javascript",
      label: "javascript",
      value: 3,
      color: "hsl(192, 70%, 50%)",
    },
  ];
  return (
    <>
      <Dashboard data={data} menuHandler={menuHandler} menuType={menuType} processHandler={processHandler} process={process}/>
    </>
  );
}
export default DashboardContainer;
