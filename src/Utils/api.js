import axios from "axios";
import { getToken, getRefreshToken, setTokens } from "./tokens";
import { setUser } from "../Modules/user";
import { setLogout } from "../Modules/login";

/* 
    get 요청에서 headers와 params를 동시에 보내려면 아래와 같이 config 객체를 생성한 후 얘를 담아야 함
    https://stackoverflow.com/questions/48261227/use-axios-get-with-params-and-config-together
  */

/* 
  로그인 상태가 아니라면 아래의  통신 함수들은 모두 사용할 일이 없음. 
  로그인에 성공하였다면 그 때 토큰을 받아와서 통신 때마다 토큰의 유효성을 검사함. 
*/
const headers = { authorization: `Bearer ${getToken()}` };

const refreshHeaders = {
  authorization: `Bearer ${getToken()}`,
  refresh: getRefreshToken(),
};

/* 크롤데이터 스크리닝 데이터 받아오기 */
const ScreeningDataFetchApi = (listSize, pageNo, isKeep, searchObj = null) => {
  let config = {
    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    params: {
      listSize: listSize,
      pageNo: pageNo,
      ...searchObj,
    },
  };
  if (isKeep) {
    config.params.keep = 1;
  }
  return axios.get(`/crawl/screening`, config);
};

/* 크롤데이터 스크리닝에서 정제 단계로 넘기기 */
const ScreeningDataStageApi = (stageDataList) => {
  let body = {
    list: stageDataList,
  };
  return axios.put(`/crawl/screening`, body, { headers: headers });
};

/* 크롤데이터 스크리닝 단계에서 보류하기 */
const ScreeningDataKeepApi = (keepDataList) => {
  let body = {
    list: keepDataList,
  };
  return axios.post(`/crawl/screening`, body, { headers: headers });
};
/* 크롤데이터 스크리닝 단계에서 버리기 */
const ScreeningDataDeleteApi = (deleteDataList) => {
  console.log(deleteDataList);
  const config = {
    headers: headers,
    params: {
      list: deleteDataList,
    },
  };
  return axios.delete(`/crawl/screening`, config);
};

/* 크롤데이터 리스트 받아오기 */
const CrawlDataListFetchApi = (
  statusCode,
  listSize,
  pageNo,
  searchObj = null
) => {
  const params = { listSize: listSize, pageNo: pageNo, ...searchObj };
  const config = {
    headers: { authorization: `Bearer ${getToken()}` },
    params,
  };
  return axios.get(`/crawl/list/${statusCode}`, config);
};

/* 크롤데이터 버리기 */
const CrawlDataRejectApi = (_id, statusCode) => {
  const config = {
    headers: headers,
    params: {
      statusCode,
    },
  };
  return axios.delete(`/crawl/detail/${_id}`, config);
};

/* 크롤데이터 보류 하기*/

const CrawlDataKeepApi = (_id, statusCode) => {
  let body = {
    statusCode,
  };
  return axios.put(`/crawl/detail/${_id}`, body, { headers: headers });
};
/* 크롤데이터 넘기기*/
const CrawlDataStageApi = (statusCode, _id, docs) => {
  const body = {
    statusCode,
    _id,
    docs,
  };
  return axios.post(`/crawl/detail/${_id}`, body, { headers: headers });
};

/* 크롤데이터 상세조회에서 사용하는 통신 함수 */
const CrawlDataDetailFetchApi = (statusCode, _id) => {
  let config = {
    headers: { authorization: `Bearer ${getToken()}` },
    params: {
      statusCode: statusCode,
    },
  };
  return axios.get(`/crawl/detail/${_id}`, config);
};

/* 본문 이미지 첨부 후 url 받아오는 함수 */
const documentPastedImageApi = (imageForm) => {
  return axios.post(`/file/docImageAttach/`, imageForm, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const uploadExcelDataApi = (formData) => {
  return axios.post(`/file/uploadExcelData/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      authorization: `Bearer ${getToken()}`,
    },
  });
};

const documentDetachImageApi = (_id) => {
  let config = {
    headers: { authorization: `Bearer ${getToken()}` },
    params: { _id },
  };
  return axios.get(`/file/docImageDetach/`, config);
};

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
const CategoryOptionFetchApi = (type) => {
  let config = {
    headers: { authorization: `Bearer ${getToken()}` },
    params: { type },
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

/* user 토큰 인증 및 유저 정보 가져오기 */
const userAuthApi = () => {
  let config = {
    headers: { authorization: `Bearer ${getToken()}` },
  };
  return axios.get(`/nextrend/user`, config);
};

/* 데이터 요청 시 토큰 만료 및 리프레시 토큰 만료 세션 처리 함수 */
const sessionHandler = (err, dispatch) => {
  /* dispatch 를 사용하기 위해서 인자로 받아옴 */
  return new Promise((resolve, reject) => {
    if (err.response.status === 401) {
      RefreshTokenApi()
        .then((res) => {
          setTokens(res);
          userAuthApi().then((res) => {
            dispatch(
              setUser({
                name: res.data.Name,
                permission: Number(res.data.Category),
              })
            );
            resolve("세션유효");
          });
        })
        .catch((err) => {
          if (err.response.status === 401) {
            dispatch(setLogout("EXPIRED_LOGOUT"));
          }
        });
    }
  });
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
const verifyUserIdApi = (userId, id) => {
  const body = {
    userId,
    id,
  };
  return axios.post(`/nextrend/user/verify`, body, { headers: headers });
};

const addUserApi = (userInfo) => {
  const body = {
    userInfo,
  };
  return axios.post(`/nextrend/user/add`, body, { headers: headers });
};

const restrictUserApi = (uid, restrict) => {
  const body = {
    uid,
    restrict,
  };
  return axios.post(`/nextrend/user/restrict`, body, { headers: headers });
};

/* 카테고리 관리 */

/* 카테고리 데이터 받아오기 */
const categoryListFetchApi = (type, length, code = null) => {
  let config = {
    headers: { authorization: `Bearer ${getToken()}` },
    params: {
      type,
      length,
      code,
    },
  };
  return axios.get(`/nextrend/cat`, config);
};
/* 카테고리 추가하기 */
const categoryItemAddApi = (type, length, ct_nm, code = null) => {
  const body = {
    type,
    length,
    ct_nm,
    code,
  };
  return axios.post(`/nextrend/cat`, body, { headers: headers });
};
/* 카테고리 수정하기 */
const categoryItemEditApi = (type, code, ct_nm) => {
  let body = {
    type,
    code,
    ct_nm,
  };
  return axios.put(`/nextrend/cat`, body, { headers: headers });
};
/* 카테고리 삭제하기 */
const categoryItemDeleteApi = (type, code) => {
  const config = {
    headers: headers,
    params: {
      type,
      code,
    },
  };
  return axios.delete(`/nextrend/cat`, config);
};

/* 사용자 맞춤형 메뉴 관련 api */

/* 특정 카테고리의 하위 카테고리 목록을 받아오는 기능을 함. */
const axisMenuPreviewFetchApi = (cid) => {
  const config = {
    headers: headers,
    params: { cid },
  };
  return axios.get(`/nextrend/custom/test`, config);
};
/* uid에 해당하는 유저의 설정된 x축, y축 의 하위 메뉴 정보를 받아옴. (사용자화면 출력용?? ) */
const userAxisMenuFetchApi = (uid) => {
  let config = {
    headers: { authorization: `Bearer ${getToken()}` },
    params: { uid },
  };
  return axios.get(`/nextrend/custom/load`, config);
};
/* uid에 해당하는 유저의 메뉴 세팅 정보를 받아옴.*/
const userAxisMenuSettingFetchApi = (uid) => {
  let config = {
    headers: { authorization: `Bearer ${getToken()}` },
    params: { uid },
  };
  return axios.get(`/nextrend/custom`, config);
};
const userAxisMenuSaveApi = (axisSetObj, saveType) => {
  if (saveType === "create") {
    return axios.post(`/nextrend/custom`, axisSetObj, { headers: headers });
  }
  if (saveType === "update") {
    return axios.put(`/nextrend/custom`, axisSetObj, { headers: headers });
  }
};
//data와 method 형태로 변경..
const MultilingualDictionaryApi = (data = null, method) => {
  if (method === "GET") {
    const config = {
      headers: { headers },
    };
    return axios.get(`/nextrend/multilingual`, config);
  }
  if (method === "POST") {
    return axios.post(`/nextrend/multilingual`, data, { headers: headers });
  }
  if (method === "PUT") {
    console.log(data);
    return axios.put(`/nextrend/multilingual`, data, { headers: headers });
  }
  if (method === "DELETE") {
    const config = {
      headers: headers,
      params: {
        ...data,
      },
    };
    return axios.delete(`/nextrend/multilingual`, config);
  }
};

const HostManagementApi = (data = null, method) => {
  if (method === "GET") {
    const config = {
      headers: { headers },
    };
    if (data !== null) {
      // 검색 쿼리가 있다면?
      config["params"] = { ...data };
    }
    console.log(config)
    return axios.get(`/nextrend/host`, config);
  }
  if (method === "POST") {
    return axios.post(`/nextrend/host`, data, { headers: headers });
  }
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
  ScreeningDataKeepApi,
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
  sessionHandler,
  documentPastedImageApi,
  documentDetachImageApi,
  uploadExcelDataApi,
  restrictUserApi,
  verifyUserIdApi,
  categoryListFetchApi,
  categoryItemAddApi,
  categoryItemDeleteApi,
  categoryItemEditApi,
  axisMenuPreviewFetchApi,
  userAxisMenuFetchApi,
  userAxisMenuSettingFetchApi,
  userAxisMenuSaveApi,
  MultilingualDictionaryApi,
  HostManagementApi,
};
