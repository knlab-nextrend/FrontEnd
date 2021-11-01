import axios from "axios";

const ip = "nextrend.kr:5000";

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
  console.log(params);
  return axios.get(
    `/crawl/list/${statusCode}`,
    { params: params },
    { headers: { "Access-Control-Allow-Origin": "*" } }
  );
};

export { CrawlDataFetchApi };
