import React, { useLayoutEffect } from "react";

import TitleCard from "../../../Components/DashboardComponents/TitleCard";
import DocumentStatCard from "../../../Components/DashboardComponents/DocumentStatCard";

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
import Title from "antd/lib/skeleton/Title";

function Map(props) {
  useLayoutEffect(() => {
    let root = am5.Root.new("chartdiv");

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5map.MapChart.new(root, {
        //panX: "rotateX",
        projection: am5map.geoEquirectangular(),
      })
    );
    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"],
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      interactive: true,
    });
    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x677935),
    });
    chart.set("zoomControl", am5map.ZoomControl.new(root, {}));
    return () => {
      root.dispose();
    };
  }, []);

  return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
}
function Dashboard({
  data,
  menuType,
  menuHandler,
  process,
  processHandler,
  rowClickHandler,
  crawlDummyData,
}) {
  return (
    <>
      {/* <FormHeader type={"view"} title={"대시보드"} /> */}
      <Tab>
        <div className="button-group">
          <TabButton
            active={menuType === "docs_country"}
            value="docs_country"
            onClick={menuHandler}
          >
            국가별 문서 작업 통계
          </TabButton>
          <TabButton
            active={menuType === "docs_worker"}
            value="docs_worker"
            onClick={menuHandler}
          >
            작업자별 문서 작업 통계
          </TabButton>
          <TabButton
            active={menuType === "work_detail"}
            value="work_detail"
            onClick={menuHandler}
          >
            작업자별 작업 상세 현황
          </TabButton>
          <TabButton
            active={menuType === "crawl"}
            value="crawl"
            onClick={menuHandler}
          >
            크롤러 작동 현황
          </TabButton>
          <TabButton
            active={menuType === "system_access"}
            value="system_access"
            onClick={menuHandler}
          >
            시스템 접속 통계
          </TabButton>
        </div>
      </Tab>
      <Wrapper>
        {menuType === "docs_country" && (
          <>
            {process === "all" && (
              <>
                <CountryContentWrapper>
                  <TitleCard
                    title={"국가별 문서 현황"}
                    subtitle={
                      "국가를 클릭하면 해당 국가에 대한 문서 작업 현황을 확인할 수 있습니다."
                    }
                  >
                    <Map></Map>
                  </TitleCard>
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
          </>
        )}
        {menuType === "docs_worker" && (
          <>
            <UserSelectCard />
            <WorkStatCard />
            <ProcessMenu processHandler={processHandler} process={process} />
            <TitleCard
              title={"기간별 통계"}
              subtitle={
                "최근 1일 / 최근 1주일 /최근 1달/ 최근 3달 / 최근 6달 수집 통계를 확인하세요."
              }
            >
              <DateRange />
            </TitleCard>
          </>
        )}
        {menuType === "crawl" && (
          <>
            <TitleCard
              title={"파일 형태 별 수집 현황"}
              subtitle={
                "URL, HTML, PDF, WORD, EXCEL, PPT 등 다양한 문서 형태의 전체 수집 현황입니다."
              }
            >
              <CrawlFileTypeWrapper>
                <CrawlFileTypeStatCard color="#435269">
                  <div className="file-type">URL</div>
                  <div className="file-status">100</div>
                </CrawlFileTypeStatCard>
                <CrawlFileTypeStatCard color="#fccb00">
                  <div className="file-type">HTML</div>
                  <div className="file-status">100</div>
                </CrawlFileTypeStatCard>
                <CrawlFileTypeStatCard color="#b80000">
                  <div className="file-type">PDF</div>
                  <div className="file-status">100</div>
                </CrawlFileTypeStatCard>
                <CrawlFileTypeStatCard color="#3f51b5">
                  <div className="file-type">WORD</div>
                  <div className="file-status">100</div>
                </CrawlFileTypeStatCard>
                <CrawlFileTypeStatCard color="#4caf50">
                  <div className="file-type">EXCEL</div>
                  <div className="file-status">100</div>
                </CrawlFileTypeStatCard>
                <CrawlFileTypeStatCard color="#db3e00">
                  <div className="file-type">PPT</div>
                  <div className="file-status">100</div>
                </CrawlFileTypeStatCard>
                <CrawlFileTypeStatCard color="#d6d6d6">
                  <div className="file-type">ETC</div>
                  <div className="file-status">100</div>
                </CrawlFileTypeStatCard>
              </CrawlFileTypeWrapper>
            </TitleCard>
            <TitleCard
              title={"작업 목록"}
              subtitle={
                "크롤러 작업 대상 HOST 목록과 그 대상의 작업 현황을 볼 수 있습니다."
              }
            >
              <CrawlStatusTable>
                <colgroup>
                  <col width="8%" />
                  <col width="27%" />
                  <col width="8%" />
                  <col width="19%" />
                  <col width="19%" />
                  <col width="19%" />
                </colgroup>
                <thead>
                  <tr>
                    <th>
                      작업 ID <br />
                      (job_id)
                    </th>
                    <th>
                      HOST 도메인 <br />
                      (host)
                    </th>
                    <th>
                      작업 총량 <br />
                      (worked_count)
                    </th>
                    <th>
                      최근 작업일 <br />
                      (worked_at)
                    </th>
                    <th>
                      다음 작업 예약일 <br />
                      (scheduled_at)
                    </th>
                    <th>
                      작업 생성일 <br />
                      (created_at)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {crawlDummyData.map((item, index) => {
                    return (
                      <>
                        <tr
                          key={index}
                          onClick={() => {
                            rowClickHandler(item.job_id);
                          }}
                        >
                          <td>{item.job_id}</td>
                          <td>{item.host}</td>
                          <td>{item.worked_count}</td>
                          <td>{item.worked_at}</td>
                          <td>{item.scheduled_at}</td>
                          <td>{item.created_at}</td>
                        </tr>
                        <tr key={index+999}>
                          <td colSpan="6">
                            <div className="work-log-wrapper">
                              <div className="work-log">
                                <div>[시작일] 2020-08-24 15:26:07</div>
                                <div>[종료일] 2020-08-26 18:04:02</div>
                                <div>[url] 87590</div>
                                <div>[html] 87350</div>
                                <div>[pdf] 240</div>
                                <div>[word] 0</div>
                                <div>[excel] 0</div>
                                <div>[ppt] 0</div>
                              </div>
                              <div className="work-log">
                                <div>[시작일] 2020-08-24 15:26:07</div>
                                <div>[종료일] 2020-08-26 18:04:02</div>
                                <div>[url] 87590</div>
                                <div>[html] 87350</div>
                                <div>[pdf] 240</div>
                                <div>[word] 0</div>
                                <div>[excel] 0</div>
                                <div>[ppt] 0</div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </CrawlStatusTable>
            </TitleCard>
          </>
        )}
        {menuType === "work_detail" && (
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
  min-height: 1280px;
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

const CrawlFileTypeWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const CrawlFileTypeStatCard = styled.div`
  border: solid 1px #d6d6d6;
  border-radius: 4px;
  box-shadow: rgb(9 30 66 / 25%) 0px 1px 1px;
  padding: 1rem;

  border-left: ${(props) => `solid 5px ${props.color}` || "solid 5px #eee"};
  margin: 1rem;
  min-width: 7rem;

  .file-type {
    color: #435269;
    font-size: 12px;
  }
  .file-status {
    color: #5a5c69;
    font-size: 20px;
    font-weight: bold;
  }
`;

const CrawlStatusTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 14px;
  color: rgb(59, 59, 59);
  th {
    color: #323d4d;
    background-color: #d8dee6;
  }
  th,
  td {
    border-bottom: 1px solid #d6d6d6;
    padding: 10px;
  }
  tr:first-child,
  tr:last-child {
    border: none;
  }
  input[type="text"] {
    width: 100%;
  }
  .work-log-wrapper {
    width: 100%;
    display:flex;
  }
  .work-log {
    margin:10px;
    border: solid 1px #d6d6d6;
    border-radius: 4px;
    box-shadow: rgb(9 30 66 / 25%) 0px 1px 1px;
    padding: 1rem;
  }
`;
export default Dashboard;
