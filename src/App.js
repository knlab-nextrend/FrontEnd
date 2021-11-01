import React from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";

import CrawlDataListContainer from "./Pages/CrawlDataList/CrawlDataListContainer";
import Header from "./Components/Header";
import AsideMenuBar from "./Components/AsideMenuBar";
import Footer from "./Components/Footer";
function App() {
  return (
    <>
      <Header />
      <Body>
        <AsideMenuBar />
        <Section>
          <Switch>
            <Route path="/crawl/list/:statusCode">
              <CrawlDataListContainer />
            </Route>
          </Switch>
        </Section>
      </Body>
      <Footer />
    </>
  );
}

const Body = styled.div`
  display: grid;
  padding-top: 6.5rem; // header 때문에
  grid-template-columns: 1fr 8fr;
`;
const Section = styled.section`
  width: 100%;
`;

export default App;
