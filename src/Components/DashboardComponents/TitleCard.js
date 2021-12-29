import React from "react";
import styled from "styled-components";
function TitleCard() {
  return (
    <CardWrapper>
      <div className="title-main"></div>
      <div className="title-sub"></div>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  border-radius: 12px;
  margin: 1rem;
  border:1px solid #E6E9ED;
  .title-main{
    border-bottom:1px solid #E6E9ED;
  }
  .title-sub{

  }
`;
export default TitleCard;
