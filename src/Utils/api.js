import axios from "axios";

const tokenHeaders = {
  headers: { token: localStorage.getItem("token") },
};
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
  // let params = {
  //   listSize: listSize,
  //   pageNo: pageNo,
  // };

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
    headers: {authorization:`Bearer ${localStorage.getItem("token")}`},
    params: {
      listSize: listSize,
      pageNo: pageNo,
    },
  }

  
  return axios.get(
    `/crawl/list/${statusCode}`,
    config
  );
};

/* 로그인 할 때 사용하는 통신 함수 */
const LoginApi = (userID, userPW) => {
  let body = {
    userID,
    userPW,
  };
  return axios.post(`/nextrend/login`, body);
};

export { CrawlDataFetchApi, LoginApi };
