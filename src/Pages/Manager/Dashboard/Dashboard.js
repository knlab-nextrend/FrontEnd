import React from "react";
import TitleCard from "../../../Components/DashboardComponents/TitleCard";
import DocumentStatCard from "../../../Components/DashboardComponents/DocumentStatCard";
import FormHeader from "../../../Components/FormHeader";
import styled from "styled-components";

function Dashboard() {
  return (
    <>
      <FormHeader type={"view"} title={"대시보드"} />
      <Wrapper>
        <CountryContentWrapper>
          <TitleCard></TitleCard>
          <DocumentStatCard></DocumentStatCard>
        </CountryContentWrapper>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  background-color: #eee;
  padding: 1rem;
`;
const CountryContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 8fr 2fr;
`;
export default Dashboard;
