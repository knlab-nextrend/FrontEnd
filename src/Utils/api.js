import axios from "axios";
import { getToken } from "./getToken";
/* 
  로그인 상태가 아니라면 아래의  통신 함수들은 모두 사용할 일이 없음. 
  로그인에 성공하였다면 그 때 토큰을 받아와서 통신 때마다 토큰의 유효성을 검사함. 

*/

/* 크롤데이터 상세조회에서 사용하는 통신 함수 */

const headers = { authorization: `Bearer ${getToken()}` };

const CrawlDataDetailFetchApi = (statusCode, itemId) => {
  let config = {
    headers: { authorization: `Bearer ${getToken()}` },
    params: {
      statusCode: statusCode,
    },
  };
  return axios.get(`/crawl/detail/${itemId}`, config);
};

/* 크롤데이터 1차 스크리닝 버리기(reject) */
const CrawlDataScreeningRejectApi = (itemId,statusCode) =>{
  
  let config = {
    headers: headers,
    params: {
      statusCode
    },
  };
  return axios.delete(`/crawl/detail/${itemId}`, config);
}
/* 크롤데이터 1차 스크리닝 보류*/
const CrawlDataScreeningKeepApi = (itemId, statusCode) => {
  /* 
    itemId - 보류 할 데이터 id값
    statusCode - 보류 할 데이터의 상태 값 
  */

  let body = {
    statusCode,
  };
  return axios.put(`/crawl/detail/${itemId}`, body, headers);
};

/* 크롤데이터 리스트 불러오기 */
const CrawlDataFetchApi = (
  statusCode,
  listSize,
  pageNo,
  keyword = "",
  startDate = "",
  endDate = "",
  itemId = "",
  lang = "",
  subscribed = ""
) => {
  let params = {
    listSize: listSize,
    pageNo: pageNo,
  };

  if (keyword !== "") {
    params["keyword"] = keyword;
  }
  if (startDate !== "") {
    params["startDate"] = startDate;
  }
  if (endDate !== "") {
    params["endDate"] = endDate;
  }
  if (itemId !== "") {
    params["itemId"] = itemId;
  }
  if (lang !== "") {
    params["lang"] = lang;
  }
  if (subscribed !== "") {
    params["subscribed"] = subscribed;
  }
  // console.log(tokenHeaders)

  /* 
    get 요청에서 headers와 params를 동시에 보내려면 아래와 같이 config 객체를 생성한 후 얘를 담아야 함
    https://stackoverflow.com/questions/48261227/use-axios-get-with-params-and-config-together
  */

  let config = {
    headers: headers,
    params: {
      listSize: listSize,
      pageNo: pageNo,
    },
  };

  return axios.get(`/crawl/list/${statusCode}`, config);
};

/* 로그인 할 때 사용하는 통신 함수 */
const LoginApi = (userID, userPW) => {
  let body = {
    userID,
    userPW,
  };
  return axios.post(`/nextrend/login`, body);
};

export {
  CrawlDataFetchApi,
  LoginApi,
  CrawlDataDetailFetchApi,
  CrawlDataScreeningKeepApi,
  CrawlDataScreeningRejectApi
};
