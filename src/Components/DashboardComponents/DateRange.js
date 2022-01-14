import React, { useState } from "react";
import styled from "styled-components";

function DateRange() {
  /* 
        전체: all
        1일 : day
        1주일 : week
        1달 : month
        3달 : three_month
        6달 : six_month
    */
  const [dateRange, setDateRange] = useState("day");

  const dateRangeHandler = (e) => {
    setDateRange(e.target.value);
  };
  return (
    <DateRangeContainer>
      <input
        type="radio"
        name="range"
        id="all"
        value="all"
        onChange={dateRangeHandler}
        checked={dateRange==="all"}
      ></input>
      <label htmlFor="all">전체</label>
      <input
        type="radio"
        name="range"
        id="day"
        value="day"
        onChange={dateRangeHandler}
        checked={dateRange==="day"}
      ></input>
      <label htmlFor="day">최근 1일</label>
      <input
        type="radio"
        name="range"
        id="week"
        value="week"
        onChange={dateRangeHandler}
        checked={dateRange==="week"}
      ></input>
      <label htmlFor="week">최근 1주일</label>
      <input
        type="radio"
        name="range"
        id="month"
        value="month"
        onChange={dateRangeHandler}
        checked={dateRange==="month"}
      ></input>
      <label htmlFor="month">최근 1달</label>
      <input
        type="radio"
        name="range"
        id="three_month"
        value="three_month"
        onChange={dateRangeHandler}
        checked={dateRange==="three_month"}
      ></input>
      <label htmlFor="three_month">최근 3달</label>
      <input
        type="radio"
        name="range"
        id="six_month"
        value="six_month"
        onChange={dateRangeHandler}
        checked={dateRange==="six_month"}
      ></input>
      <label htmlFor="six_month">최근 6달</label>
    </DateRangeContainer>
  );
}

const DateRangeContainer = styled.div`
  display: inline-block;
  padding: 8px;
  background-color: #eee;
  font-size: 12px;
  border-radius: 0.5rem;

  label {
    padding: 0.25rem 0.5rem 0.25rem 0.5rem;
    cursor: pointer;
  }
  input[type="radio"] {
    display: none;
  }
  input[type="radio"]:checked + label {
    transition: ease-in-out 0.2s;
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 0.875rem 0 rgba(33, 37, 41, 0.05);
    color: white;
    border-radius: 0.5rem;
  }
`;
export default DateRange;
