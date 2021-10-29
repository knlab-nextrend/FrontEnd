import React from "react";
import Tab from "./Components/Tab";
import CrawlDataListContainer from "./Pages/CrawlDataList/CrawlDataListContainer";
import { Route } from "react-router-dom";

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
      <section>
        <Route path="/crawl/list/:statusCode">
          <Tab />
          <CrawlDataListContainer />
        </Route>
      </section>
    </>
  );
}

export default App;
