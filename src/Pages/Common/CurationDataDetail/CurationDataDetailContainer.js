import React, { useState, useEffect } from "react";
import CurationDataDetail from "./CurationDataDetail";
import { useParams,useHistory } from "react-router-dom";
import { CrawlDataDetailFetchApi } from "../../../Utils/api";
import {useSelector} from "react-redux"

function CurationDataDetailContainer() {
  const statusCode = 7;
  const permission = useSelector((state) => state.login.user.permission);
  const { itemId } = useParams();
  const [docs, setDocs] = useState({}); // 폼에 default 값으로 출력할 데이터를 객체로 전달. 관리 편하게
  const history = useHistory();
  /* 데이터 관리로 이동 */
  const goDataManage = ()=>{
    history.push(`/crawl/detail/${statusCode}/${itemId}`)
  }
  /* 데이터 불러오기 */
  const dataFetch = () => {
    CrawlDataDetailFetchApi(statusCode, itemId).then((res) => {
      dataCleansing(res.data);
    });
  };

  /* 데이터 정제하기 */
  const dataCleansing = (rawData) => {
    const _rawStatusDetailData = rawData.docs;
    let _docs = {
      dc_content: _rawStatusDetailData.dc_content || "",
      dc_dt_collect: _rawStatusDetailData.dc_dt_collect || "",
      dc_dt_regi: new Date().toISOString().substring(0, 19) + "Z",
      dc_dt_write: _rawStatusDetailData.dc_dt_write || "",
      dc_keyword: _rawStatusDetailData.dc_keyword,
      dc_publisher: _rawStatusDetailData.dc_publisher || "",
      dc_cover:
        _rawStatusDetailData.dc_cover[0] === ""
          ? []
          : _rawStatusDetailData.dc_cover,
      dc_country_pub: _rawStatusDetailData.dc_country_pub || "",
      dc_cat: _rawStatusDetailData.dc_cat,
      dc_code: _rawStatusDetailData.dc_code,
      dc_code_list: _rawStatusDetailData.dc_code.map((x) => x.CT_NM),
      dc_country: _rawStatusDetailData.dc_country,
      dc_country_list: _rawStatusDetailData.dc_country.map((x) => x.CTY_NAME),
      dc_country_pub: _rawStatusDetailData.dc_country_pub,
      dc_country_pub_list: _rawStatusDetailData.dc_country_pub.map(
        (x) => x.CTY_NAME
      ),
      dc_page: _rawStatusDetailData.dc_page || "",
      dc_type: _rawStatusDetailData.dc_type || "",
      dc_title_or: _rawStatusDetailData.dc_title_or || "",
      dc_title_kr: _rawStatusDetailData.dc_title_kr || "",
      dc_smry_kr: _rawStatusDetailData.dc_smry_kr || "",
      dc_url_loc: _rawStatusDetailData.dc_url_loc || "",
      dc_link: _rawStatusDetailData.dc_link || "",
    };
    setDocs(_docs);
  };

  useEffect(() => {
    dataFetch();
  }, [itemId]);

  return (
    <>
      <CurationDataDetail docs={docs} permission={permission} goDataManage={goDataManage}/>
    </>
  );
}
export default CurationDataDetailContainer;
