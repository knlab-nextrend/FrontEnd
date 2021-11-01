import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useHistory, useParams } from "react-router-dom";
function Tab() {
  const history = useHistory();
  const { statusCode } = useParams();
  const MenuList = [
    { status: 0, name: "1차 스크리닝" },
    { status: 1, name: "1차 스크리닝 보류" },
    { status: 2, name: "2차 정제" },
    { status: 3, name: "2차 정제 보류" },
  ];
  const [index, setIndex] = useState(1);

  useEffect(() => {
    setIndex(Number(statusCode));
  }, [statusCode]);

  return (
    <>
      <TabContainer>
        {MenuList.map((item, i) => {
          return (
            <TabItem
              key={i}
              active={index === item.status}
              onClick={() => {
                history.push(`/crawl/list/${item.status}`);
                setIndex(item.status);
              }}
            >
              {item.name}
            </TabItem>
          );
        })}
      </TabContainer>
    </>
  );
}

const TabContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  width: 100%;
  margin: 0;
  padding: 0;
  justify-content: center;
  list-style-type: none;
  background-color: #d6d6d6;
  padding-top: 2rem;
`;

const TabItem = styled.li`
  display: flex;
  width: 240px;
  height: 60px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #eeeeee;
  margin-right: 2px;
  margin-left: 2px;
  color: #363636;

  ${(props) =>
    props.active &&
    css`
      border-top: 5px solid white;
      background-color: white;
      font-weight: bold;
    `};

  &:hover {
    background-color: ${(props) => (props.active ? "white" : "#f8f8f8")};
    font-weight: bold;
  }
`;
export default Tab;
