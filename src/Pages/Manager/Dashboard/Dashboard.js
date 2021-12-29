import React from "react";
import TitleCard from "../../../Components/DashboardComponents/TitleCard";
import DocumentStatCard from "../../../Components/DashboardComponents/DocumentStatCard";
import FormHeader from "../../../Components/FormHeader";
import ChartCard from "../../../Components/DashboardComponents/ChartCard"
import styled from "styled-components";

function Dashboard() {
  return (
    <>
      <FormHeader type={"view"} title={"대시보드"} />
      <Wrapper>
        <CountryContentWrapper>
          <TitleCard></TitleCard>
          <div>
            <ChartCard></ChartCard>
            <DocumentStatCard></DocumentStatCard>
          </div>
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
  grid-template-columns: 7fr 3fr;
`;
export default Dashboard;
