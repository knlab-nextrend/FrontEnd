import axios from "axios";

const ip = "nextrend.kr:5000";

const CrawlDataFetchApi = (
  statusCode,
  listSize,
  pageNo,
  keyword = "",
  startDate = "",
  endDate = "",
  itemID = "",
  language = "",
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
  if (itemID !== "") {
    params["itemID"] = itemID;
  }
  if (language !== "") {
    params["language"] = language;
  }
  if (subscribed !== "") {
    params["subscribed"] = subscribed;
  }
  console.log(location.origin);
  console.log(params);
  return axios.get(
    `/crawl/list/${statusCode}`,
    { params: params },
    { headers: { "Access-Control-Allow-Origin": "*" } }
  );
};

export { CrawlDataFetchApi };
