import React, { useLayoutEffect, useRef } from "react";
import { Component } from "react";
import TitleCard from "../../../Components/DashboardComponents/TitleCard";
import DocumentStatCard from "../../../Components/DashboardComponents/DocumentStatCard";
import FormHeader from "../../../Components/FormHeader";

import UserSelectCard from "../../../Components/DashboardComponents/UserSelectCard";
import WorkStatCard from "../../../Components/DashboardComponents/WorkStatCard";
import ChartCard from "../../../Components/DashboardComponents/ChartCard";
import TableCard from "../../../Components/DashboardComponents/TableCard";
import ProcessMenu from "../../../Components/DashboardComponents/ProcessMenu";
import DateRange from "../../../Components/DashboardComponents/DateRange";
import styled from "styled-components";

import { ResponsivePie } from "@nivo/pie"; // 원형차트 임시...
import { ResponsiveGeoMap } from "@nivo/geo"; // 세계지도!
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";


function Map(props) {
  useLayoutEffect(() => {
    
    let root = am5.Root.new("chartdiv");

    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    let chart = root.container.children.push( 
      am5map.MapChart.new(root, {
        //panX: "rotateX",
        projection: am5map.geoEquirectangular()
      })
    );
    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"]
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      interactive: true
    });
    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x677935)
    });
    chart.set("zoomControl", am5map.ZoomControl.new(root, {}));
    return () => {
      root.dispose();
    };
  }, []);

  return (
    <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
  );
}
function Dashboard({ data, menuType, menuHandler, process, processHandler  }) {
  return (
    <>
      {/* <FormHeader type={"view"} title={"대시보드"} /> */}
      <Tab>
        <div className="button-group">
          <TabButton
            active={menuType === "docs"}
            value="docs"
            onClick={menuHandler}
          >
            문서 작업 통계
          </TabButton>
          <TabButton
            active={menuType === "work"}
            value="work"
            onClick={menuHandler}
          >
            작업자 작업 현황
          </TabButton>
          <TabButton
            active={menuType === "crawl"}
            value="crawl"
            onClick={menuHandler}
          >
            크롤러 작동 현황
          </TabButton>
        </div>
      </Tab>
      <Wrapper>
        {menuType === "docs" && (
          <>
            <UserSelectCard />
            <ProcessMenu processHandler={processHandler} process={process} />
            {process === "all" && (
              <>
                <WorkStatCard />
                <CountryContentWrapper>
                  <TitleCard
                    title={"국가별 문서 현황"}
                    subtitle={
                      "국가를 클릭하면 해당 국가에 대한 문서 작업 현황을 확인할 수 있습니다."
                    }
                  ><Map></Map></TitleCard>
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
                        borderColor={{
                          from: "color",
                          modifiers: [["darker", 0.2]],
                        }}
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
              </>
            )}
            {(process !== "all") && (
              <>
                <TitleCard
                  title={"기간별 통계"}
                  subtitle={
                    "최근 1일 / 최근 1주일 /최근 1달/ 최근 3달 / 최근 6달 수집 통계를 확인하세요."
                  }
                ><DateRange/></TitleCard>
              </>
            )}
          </>
        )}
        {menuType === "work" && (
          <>
            <TableCard
              title={"작업자 작업 현황"}
              subtitle={"작업자 작업 현황입니다."}
            />
          </>
        )}
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

const Tab = styled.div`
  width: 100%;
  height: 4rem;
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
  align-items: bottom;
  display: flex;
  align-items: end;
  padding: 0 1.5rem 0 1.5rem;
  .button-group {
  }
`;
const TabButton = styled.button`
  color: ${(props) => (props.active ? "#435269" : "rgb(59,59,59)")};
  border: none;
  border-bottom: ${(props) => (props.active ? "solid 3px #435269;" : "none")};
  font-weight: bold;
  background-color: white;
  cursor: pointer;
  padding: 1rem;
`;
export default Dashboard;
