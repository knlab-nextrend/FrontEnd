import axios from "axios";
import { getToken, getRefreshToken } from "./getToken";
/* 
    get 요청에서 headers와 params를 동시에 보내려면 아래와 같이 config 객체를 생성한 후 얘를 담아야 함
    https://stackoverflow.com/questions/48261227/use-axios-get-with-params-and-config-together
  */

/* 
  로그인 상태가 아니라면 아래의  통신 함수들은 모두 사용할 일이 없음. 
  로그인에 성공하였다면 그 때 토큰을 받아와서 통신 때마다 토큰의 유효성을 검사함. 
*/
const headers = { authorization: `Bearer ${getToken()}` };
const testHeaders= { authorization: `Bearer ${localStorage.getItem('token')}`}
const refreshHeaders = {
  authorization: `Bearer ${getToken()}`,
  refresh: getRefreshToken(),
};

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
    list: stageDataList,
  };
  return axios.put(`/crawl/screening`, body, { headers: headers });
};

/* 크롤데이터 스크리닝 단계에서 버리기 */
const ScreeningDataDeleteApi = (deleteDataList) => {
  const config = {
    headers: headers,
    params: {
      list: deleteDataList,
    },
  };
  return axios.delete(`/crawl/screening`, config);
};

/* 크롤데이터 리스트 받아오기 */
const CrawlDataListFetchApi = (statusCode, listSize, pageNo) => {
  
  const config = {
    headers: testHeaders,
    params: {
      listSize: listSize,
      pageNo: pageNo,
    },
  };
  console.log(config)

  return axios.get(`/crawl/list/${statusCode}`, config);
};

/* 크롤데이터 버리기 */
const CrawlDataRejectApi = (itemId, statusCode) => {
  const config = {
    headers: headers,
    params: {
      statusCode,
    },
  };
  return axios.delete(`/crawl/detail/${itemId}`, config);
};

/* 크롤데이터 보류 하기*/

const CrawlDataKeepApi = (itemId, statusCode) => {
  let body = {
    statusCode,
  };
  return axios.put(`/crawl/detail/${itemId}`, body, { headers: headers });
};
/* 크롤데이터 넘기기*/
const CrawlDataStageApi = (statusCode, itemId, docs) => {
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

/* 본문 이미지 첨부 후 url 받아오는 함수 */
const documentPastedImageApi = (imageForm) => {
  return axios.post(`/crawl/docImage/`, imageForm,{
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

/* 대륙 리스트 전체 받아오는 함수 */
const ContinentsListDataFetchApi = () => {
  let config = {
    headers: { authorization: `Bearer ${getToken()}` },
  };
  return axios.get(`/nextrend/continents`, config);
};

/* 대륙 별 국가 리스트를 받아오는 함수 */
const CountrysListDataFetchApi = (continent) => {
  let config = {
    headers: { authorization: `Bearer ${getToken()}` },
  };
  return axios.get(`/nextrend/countrys/${continent}`, config);
};

/* 주제 분류 리스트를 받아오는 함수 */
const CategorysListDataFetchApi = (upperCode = null) => {
  let config = {
    headers: { authorization: `Bearer ${getToken()}` },
    params: { upperCode },
  };
  return axios.get(`/nextrend/categorys`, config);
};

/* 주제 분류 리스트를 모두 받아오는 함수 */
const CategoryOptionFetchApi = () => {
  let config = {
    headers: { authorization: `Bearer ${getToken()}` },
  };
  return axios.get("/nextrend/categorys/dict", config);
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

const FetchUsersApi = () => {
  let config = {
    headers: { authorization: `Bearer ${getToken()}` },
  };
  return axios.get(`/nextrend/user/list`, config);
};

const getUserInfoApi = (uid) => {
  let config = {
    headers: { authorization: `Bearer ${getToken()}` },
    params: {
      uid: uid,
    },
  };
  return axios.get(`/nextrend/user/get`, config);
};

const modifyUserInfoApi = (userInfo, uid) => {
  const body = {
    userInfo,
    uid,
  };
  return axios.post(`/nextrend/user/modify`, body, { headers: headers });
};

const deleteUserByIdApi = (uid) => {
  const body = {
    uid,
  };
  return axios.post(`/nextrend/user/delete`, body, { headers: headers });
};
const addUserApi = (userInfo) => {
  const body = {
    userInfo,
  };
  return axios.post(`/nextrend/user/add`, body, { headers: headers });
};

/* user 토큰 인증 및 유저 정보 가져오기 */
const userAuthApi = () => {
  let config = {
    headers: { authorization: `Bearer ${getToken()}` },
  };
  console.log(config)
  return axios.get(`/nextrend/user`, config);
};
export {
  LoginApi,
  RefreshTokenApi,
  CrawlDataListFetchApi,
  CrawlDataDetailFetchApi,
  CrawlDataRejectApi,
  CrawlDataStageApi,
  CrawlDataKeepApi,
  ScreeningDataDeleteApi,
  ScreeningDataStageApi,
  ScreeningDataFetchApi,
  ContinentsListDataFetchApi,
  CountrysListDataFetchApi,
  FetchUsersApi,
  getUserInfoApi,
  modifyUserInfoApi,
  deleteUserByIdApi,
  addUserApi,
  CategorysListDataFetchApi,
  CategoryOptionFetchApi,
  userAuthApi,
  documentPastedImageApi
};
