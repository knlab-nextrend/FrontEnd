import axios from "axios";

const headers = { headers: { "Access-Control-Allow-Origin": "*" } };

/* 크롤데이터 등록에서 사용하는 통신 함수 */
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
  return axios.get(`/crawl/list/${statusCode}`, { params: params }, headers);
};

/* 로그인 할 때 사용하는 통신 함수 */
const LoginApi = (userID, userPW) => {
  let body = {
    userID,
    userPW,
  };
  return axios.post(`/nextrend/login`, body, headers);
};

export { CrawlDataFetchApi, LoginApi };
