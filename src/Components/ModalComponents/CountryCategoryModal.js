import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  ContinentsListDataFetchApi,
  CountrysListDataFetchApi,
} from "../../Utils/api";
function CountryCategoryModal() {
  const [selectedCountryList, setSelectedCountryList] = useState([]);
  const [countrysListData, setCountrysListData] = useState([]);
  const [continentsListData, setContinentsListData] = useState([]);
  const [currentContinentIndex, setCurrentContinentIndex] = useState(0);

  const countrysDataFetch = (currentContinentIndex) => {
    CountrysListDataFetchApi(currentContinentIndex).then((res) => {
      setCountrysListData(res.data);
    });
  };
  const continentsDataFetch = () => {
    ContinentsListDataFetchApi().then((res) => {
      setContinentsListData(res.data);
    });
  };

  const _currentContinentIndexHandler = (e) => {
    setCurrentContinentIndex(Number(e.target.value));
  };

  const addCountry = (idx) => {
    const _country = countrysListData.find((item) => item.idx === idx);
    setSelectedCountryList([...selectedCountryList, _country]);
  };

  const deleteCountry = (idx) => {
    setSelectedCountryList(
      selectedCountryList.filter((item) => item.idx !== idx)
    );
  };

  useEffect(() => {
    continentsDataFetch();
  }, [continentsDataFetch]);

  useEffect(() => {
    countrysDataFetch(currentContinentIndex);
  }, [currentContinentIndex]);

  useEffect(() => {
    console.log(selectedCountryList);
  }, [selectedCountryList]);
  return (
    <>
      <ModalWrapper>
        <Modalheader>
          <ModalTitle>국가 설정</ModalTitle>
          <ModalSubTitle>
            해당 데이터의 국가 분류를 선택해주세요.{" "}
          </ModalSubTitle>
        </Modalheader>
        <ModalBody>
          <ListContainer>
            <ListWrapper>
              {continentsListData.map((item) => {
                return (
                  <ListItem
                    key={item.IDX}
                    value={item.IDX}
                    onClick={_currentContinentIndexHandler}
                  >
                    {item.CONTI_NAME}
                  </ListItem>
                );
              })}
            </ListWrapper>
            <ListWrapper>
              {countrysListData.map((item) => {
                return (
                  <ListItem
                    key={item.idx}
                    value={item.idx}
                    onClick={() => {
                      addCountry(item.idx);
                    }}
                  >
                    {item.cty_name}
                  </ListItem>
                );
              })}
            </ListWrapper>
          </ListContainer>
          <CountryList>
            {selectedCountryList.map((item) => {
              return (<div onClick={()=>{deleteCountry(item.idx)}}>{item.cty_name}</div>);
            })}
          </CountryList>
        </ModalBody>
        <ModalActions>
          <Button color="#435269">
            <p>저장</p>
          </Button>
          <Button color="#bfbfbf">
            <p>취소</p>
          </Button>
        </ModalActions>
      </ModalWrapper>
    </>
  );
}

const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 0.25rem;
  padding: 1.5rem;
`;
const Modalheader = styled.div`
  justify-content: left;
  margin-bottom: 1rem;
`;
const ModalTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: rgba(0, 0, 0, 0.7);
`;
const ModalSubTitle = styled.div`
  font-size: 16px;
  margin-bottom: 0.5rem;
`;
const ModalBody = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: right;
  flex-direction: row;
`;

const Button = styled.button`
  background-color: ${(props) => props.color || "grey"};
  cursor: pointer;
  min-width: 5rem;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  margin: 0 0.5rem 0 0.5rem;
`;
const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const ListWrapper = styled.ul`
  list-style-type: none;
  height: 30rem;
  overflow: auto;
  margin: 0;
  padding: 0;
`;
const ListItem = styled.li`
  cursor: pointer;
  padding: 1rem;
  width: 10rem;
  min-height: 1.5rem;
  border-bottom: dotted 1px #eeeeee;
`;

const CountryList = styled.div`
  display: flex;
  height:5rem;
`;
export default CountryCategoryModal;
