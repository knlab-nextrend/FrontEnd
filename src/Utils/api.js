import axios from "axios";
import { getToken, getRefreshToken } from "./getToken";
/* 
  로그인 상태가 아니라면 아래의  통신 함수들은 모두 사용할 일이 없음. 
  로그인에 성공하였다면 그 때 토큰을 받아와서 통신 때마다 토큰의 유효성을 검사함. 
*/
const headers = { authorization: `Bearer ${getToken()}` };
const refreshHeaders = {
  authorization: `Bearer ${getToken()}`,
  refresh: getRefreshToken(),
};

/* 크롤데이터 정제 데이터 받아오기 */ 
const RefineDataFetchApi = (statusCode,listSize,pageNo)=>{
  const config = {
    headers: headers,
    params: {
      listSize: listSize,
      pageNo: pageNo,
    },
  };

  return axios.get(`/crawl/list/${statusCode}`, config);

}
/* 크롤데이터 스크리닝 데이터 받아오기 */
const ScreeningDataFetchApi = (listSize, pageNo) => {
  const config = {
    headers: headers,
    params: {
      listSize: listSize,
      pageNo: pageNo,
    },
  };
  return axios.get(`/crawl/screening`, config);
};

/* 크롤데이터 스크리닝에서 정제 단계로 넘기기 */
const ScreeningDataStageApi = (stageDataList) => {
  let body = {
    list:stageDataList,
  };
  return axios.put(`/crawl/screening`, body, { headers: headers });
};

/* 크롤데이터 스크리닝 단계에서 버리기 */
const ScreeningDataDeleteApi = (deleteDataList) => {
  const config = {
    headers: headers,
    params: {
      list:deleteDataList,
    },
  };
  return axios.delete(`/crawl/screening`, config);
};

const AuthorizationErrorHandler = async (err1) => {
  if (!!err1.response.status) {
    const _status1 = err1.response.status;
    if (_status1 === 401) {
      {
        console.log("일반 토큰 만료");
        await RefreshTokenApi()
          .then((res) => {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("refreshToken", res.data.refreshToken);
          })
          .catch((err2) => {
            console.log("리프레시 토큰 만료");
            if (!!err2.response.status) {
              const _status2 = err2.response.status;
              if (_status2 === 401) {
                return "expired_logout";
              }
            }
          });
      }
    }
  }
};

/* 크롤데이터 2차 정제 버리기(reject) */
const CrawlDataRefineRejectApi = (itemId, statusCode) => {
  const config = {
    headers: headers,
    params: {
      statusCode,
    },
  };
  return axios.delete(`/crawl/detail/${itemId}`, config);
};
/* 크롤데이터 2차 정제 보류 */
const CrawlDataRefineKeepApi = (itemId, statusCode) => {
  let body = {
    statusCode,
  };
  return axios.put(`/crawl/detail/${itemId}`, body, { headers: headers });
};
/* 크롤데이터 2차정제 > 아카이브 등록 */
const CrawlDataRefineStagedApi = (statusCode, itemId, docs) => {
  const body = {
    statusCode,
    itemId,
    docs,
  };
  return axios.post(`/crawl/detail/${itemId}`, body, { headers: headers });
};

/* 크롤데이터 상세조회에서 사용하는 통신 함수 */
const CrawlDataDetailFetchApi = (statusCode, itemId) => {
  let config = {
    headers: { authorization: `Bearer ${getToken()}` },
    params: {
      statusCode: statusCode,
    },
  };
  return axios.get(`/crawl/detail/${itemId}`, config);
};

/* 크롤데이터 1차 스크리닝 > 2차 정제 넘기기 */
const CrawlDataScreeningStagedApi = (statusCode, itemId, docs) => {
  const body = {
    statusCode,
    itemId,
    docs,
  };
  return axios.post(`/crawl/detail/${itemId}`, body, { headers: headers });
};

/* 크롤데이터 1차 스크리닝 버리기(reject) */
const CrawlDataScreeningRejectApi = (itemId, statusCode) => {
  const config = {
    headers: headers,
    params: {
      statusCode,
    },
  };
  return axios.delete(`/crawl/detail/${itemId}`, config);
};
/* 크롤데이터 1차 스크리닝 보류*/
const CrawlDataScreeningKeepApi = (itemId, statusCode) => {
  /* 
    itemId - 보류 할 데이터 id값
    statusCode - 보류 할 데이터의 상태 값 
  */

  let body = {
    statusCode,
  };
  return axios.put(`/crawl/detail/${itemId}`, body, { headers: headers });
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
  /* 
    get 요청에서 headers와 params를 동시에 보내려면 아래와 같이 config 객체를 생성한 후 얘를 담아야 함
    https://stackoverflow.com/questions/48261227/use-axios-get-with-params-and-config-together
  */

  const config = {
    headers: headers,
    params: {
      listSize: listSize,
      pageNo: pageNo,
    },
  };

  return axios.get(`/crawl/list/${statusCode}`, config);
};

/* 로그인 할 때 사용하는 통신 함수 */
const LoginApi = async (userID, userPW) => {
  const body = {
    userID,
    userPW,
  };

  return axios.post(`/nextrend/login`, body);
};

/* 일반 token 만료 후 refreshToken 검증 하는 함수 */

const RefreshTokenApi = () => {
  const config = {
    headers: refreshHeaders,
  };
  return axios.get(`/nextrend/refresh`, config);
};

export {
  CrawlDataFetchApi,
  LoginApi,
  CrawlDataDetailFetchApi,
  CrawlDataScreeningKeepApi,
  CrawlDataScreeningRejectApi,
  CrawlDataScreeningStagedApi,
  RefreshTokenApi,
  CrawlDataRefineStagedApi,
  CrawlDataRefineRejectApi,
  CrawlDataRefineKeepApi,
  ScreeningDataDeleteApi,
  ScreeningDataStageApi,
  ScreeningDataFetchApi,
  RefineDataFetchApi
};
