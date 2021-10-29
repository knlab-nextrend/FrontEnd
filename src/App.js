import React from "react";
import Tab from "./Components/Tab";
import CrawlDataListContainer from "./Pages/CrawlDataList/CrawlDataListContainer";
import { Route } from "react-router-dom";
import styled from 'styled-components'

function App() {
  return (
    <>
      <header>
        <div>
          <img src="http://nextrend.kr/images/logo3.jpg" width="300px" />
        </div>
      </header>
      <aside>
        <div></div>
      </aside>
      <Section>
        <Route path="/crawl/list/:statusCode">
          <Tab />
          <CrawlDataListContainer />
        </Route>
      </Section>
    </>
  );
}

const Section= styled.div` 
  width:90%;
  margin:0 auto;
`

export default App;
