import React from "react";
import TitleCard from "../../../Components/DashboardComponents/TitleCard";
import DocumentStatCard from "../../../Components/DashboardComponents/DocumentStatCard";
import FormHeader from "../../../Components/FormHeader";

import UserSelectCard from "../../../Components/DashboardComponents/UserSelectCard";
import WorkStatCard from "../../../Components/DashboardComponents/WorkStatCard"
import ChartCard from "../../../Components/DashboardComponents/ChartCard";
import TableCard from "../../../Components/DashboardComponents/TableCard";
import ProcessMenu from "../../../Components/DashboardComponents/ProcessMenu";
import styled from "styled-components";

import { ResponsivePie } from "@nivo/pie"; // 원형차트 임시...
import { ResponsiveGeoMap } from "@nivo/geo"; // 세계지도!

function Dashboard({ data }) {
  return (
    <>
      {/* <FormHeader type={"view"} title={"대시보드"} /> */}
      <Wrapper>
        <UserSelectCard />
        <Row1>
          <ProcessMenu />
          <WorkStatCard/>
        </Row1>

        <CountryContentWrapper>
          <TitleCard></TitleCard>
          <div>
            <ChartCard>
              <ResponsivePie
                data={data}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: "color" }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{
                  from: "color",
                  modifiers: [["darker", 2]],
                }}
                defs={[
                  {
                    id: "dots",
                    type: "patternDots",
                    background: "inherit",
                    color: "rgba(255, 255, 255, 0.3)",
                    size: 4,
                    padding: 1,
                    stagger: true,
                  },
                  {
                    id: "lines",
                    type: "patternLines",
                    background: "inherit",
                    color: "rgba(255, 255, 255, 0.3)",
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                  },
                ]}
                fill={[
                  {
                    match: {
                      id: "ruby",
                    },
                    id: "dots",
                  },
                  {
                    match: {
                      id: "c",
                    },
                    id: "dots",
                  },
                  {
                    match: {
                      id: "go",
                    },
                    id: "dots",
                  },
                  {
                    match: {
                      id: "python",
                    },
                    id: "dots",
                  },
                  {
                    match: {
                      id: "scala",
                    },
                    id: "lines",
                  },
                  {
                    match: {
                      id: "lisp",
                    },
                    id: "lines",
                  },
                  {
                    match: {
                      id: "elixir",
                    },
                    id: "lines",
                  },
                  {
                    match: {
                      id: "javascript",
                    },
                    id: "lines",
                  },
                ]}
                legends={[
                  {
                    anchor: "bottom",
                    direction: "row",
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: "#999",
                    itemDirection: "left-to-right",
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: "circle",
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemTextColor: "#000",
                        },
                      },
                    ],
                  },
                ]}
              />
            </ChartCard>
            <DocumentStatCard></DocumentStatCard>
          </div>
        </CountryContentWrapper>
        <TableCard
          title={"작업자 작업 현황"}
          subtitle={
            "작업자 작업 현황입니다. 맨 위의 대시보드 대상을 변경하면 해당 작업자의 자세한 작업 로그를 확인할 수 있습니다."
          }
        />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  background-color: #eee;
  padding: 1rem;
`;
const Row1 = styled.div`
  display: grid;
  grid-template-columns: 7fr 3fr;
`;
const CountryContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 7fr 3fr;
`;
export default Dashboard;
