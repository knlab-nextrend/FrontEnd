import React from "react";
import styled from "styled-components";
function CrawlDataCard({ crawlDataItem }) {
  return (
    <>
      <Card>
        <Wrapper>
          <ItemID>- {crawlDataItem.item_id} -</ItemID>
        </Wrapper>

        <Content>
          <div className="title">{crawlDataItem.title}</div>
          <div className="subTitle">{crawlDataItem.subTitle}</div>
          <div className="writeDate">{crawlDataItem.writeDate}</div>
          <Tags>
            {crawlDataItem.tags.map((tag, i) => {
              return <Chips key={i}>{tag}</Chips>;
            })}
          </Tags>
        </Content>
        <Wrapper>
          <Dot subscribed={crawlDataItem.subscribed}></Dot>
        </Wrapper>
      </Card>
    </>
  );
}

const Wrapper = styled.div` 
  display:flex;
  justify-content:center;
  flex-grow:1;
  &:nth-child(1){
    font-size:20px;
  }
`
const ItemID = styled.div`
`;
const Card = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  border: solid 1px #d6d6d6;
  box-shadow: 3px 3px 15px 3px rgba(0, 0, 0, 0.1);
  align-items: center;
  padding: 1rem;
  margin: 1rem 0 1rem 0;
  justify-content:space-between;
  &:hover {
    transition: all 0.2s;
    filter: blur(2px);
    background-color: #eee;
  }
`;
const Tags = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const Content = styled.div`
  margin-left:1rem;
  flex-grow: 10;
  display: flex;
  flex-direction: column;
  max-width: 80%;
  .title, .subTitle, .writeDate{
    margin-bottom:0.5rem;
  }
  .title{
    font-size:24px;
  }
`;
const Chips = styled.div`
  padding: 3px 12px;
  border-radius: 32px;
  font-size: 13px;
  background-color: #d6d6d6;
  margin: 3px;
`;

const Dot = styled.div`
  height: 25px;
  width: 25px;
  background-color: ${(props) => (props.subscribed ? "#6DAF44" : "#f44336")};
  border-radius: 50%;
  display: inline-block;
`;
export default CrawlDataCard;
