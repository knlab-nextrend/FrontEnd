import React, { useState, useEffect } from "react";
import CurationDataDetail from "./CurationDataDetail";
import { useParams, useHistory } from "react-router-dom";
import { CrawlDataDetailFetchApi, sessionHandler } from "../../../Utils/api";
import { useSelector, useDispatch } from "react-redux";
import { trackPromise } from "react-promise-tracker";

function CurationDataDetailContainer() {
  const statusCode = 7;
  const permission = useSelector((state) => state.user.user.permission);
  const { _id } = useParams();
  const [docs, setDocs] = useState({}); // 폼에 default 값으로 출력할 데이터를 객체로 전달. 관리 편하게
  const history = useHistory();
  const dispatch = useDispatch();
  /* 데이터 관리로 이동 */
  const goDataManage = () => {
    history.push(`/crawl/${statusCode}/${_id}`);
  };
  /* 데이터 불러오기 */
  const dataFetch = () => {
    trackPromise(CrawlDataDetailFetchApi(statusCode, _id)
      .then((res) => {
        console.log(res.data)
        dataCleansing(res.data);
      })
      .catch((err) => {
        sessionHandler(err, dispatch).then((res) => {
          CrawlDataDetailFetchApi(statusCode, _id).then((res) => {
            dataCleansing(res.data);
          });
        });
      }));
  };

  /* 데이터 정제하기 */
  const dataCleansing = (rawData) => {
    const _rawStatusDetailData = rawData.docs;
    let _docs = {
      doc_content: _rawStatusDetailData.doc_content || "",
      doc_collect_date: _rawStatusDetailData.doc_collect_date || "",
      doc_write_date: _rawStatusDetailData.doc_write_date || "",
      doc_publish_date:_rawStatusDetailData.doc_publish_date || "",
      doc_keyword: _rawStatusDetailData.doc_keyowrd,
      doc_publisher: _rawStatusDetailData.doc_publisher || "",
      doc_thumbnail:_rawStatusDetailData.doc_thumbnail,
      doc_publish_country: _rawStatusDetailData.doc_publish_country || "",
      doc_publish_country_list: _rawStatusDetailData.doc_publish_country.map(
        (x) => x.CT_NM
      ).join(", "),
      doc_category: _rawStatusDetailData.doc_category,
      doc_category_list: _rawStatusDetailData.doc_category.map((x) => x.CT_NM).join(", "),
      doc_country: _rawStatusDetailData.doc_country,
      doc_country_list: _rawStatusDetailData.doc_country.map((x) => x.CT_NM).join(", "),
      doc_page: _rawStatusDetailData.doc_page || "",
      doc_content_type: _rawStatusDetailData.doc_content_type||[],
      doc_content_type_list:_rawStatusDetailData.doc_content_type.map((x) => x.CT_NM).join(", "),
      doc_content_category:_rawStatusDetailData.doc_content_category || [],
      doc_content_category_list:_rawStatusDetailData.doc_content_category.map((x) => x.CT_NM).join(", "),
      doc_origin_title: _rawStatusDetailData.doc_origin_title || "",
      doc_kor_title: _rawStatusDetailData.doc_kor_title || "",
      doc_kor_summary: _rawStatusDetailData.doc_kor_summary || "",
      doc_url: _rawStatusDetailData.doc_url || "",
      doc_url_intro:_rawStatusDetailData.doc_url_intro || "",
      doc_relate_title:_rawStatusDetailData.doc_relate_title || "",
      doc_relate_url:_rawStatusDetailData.doc_relate_url||""
    };
    console.log(_docs)
    setDocs(_docs);
  };

  useEffect(() => {
    dataFetch();
  }, [_id]);

  return (
    <>
      <CurationDataDetail
        docs={docs}
        permission={permission}
        goDataManage={goDataManage}
      />
    </>
  );
}
export default CurationDataDetailContainer;
