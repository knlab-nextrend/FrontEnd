import React, { useState, useEffect } from "react";
import CurationDataList from "./CurationDataList";
import { CrawlDataListFetchApi, sessionHandler } from "../../../Utils/api";
import { useParams , useHistory} from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { trackPromise } from "react-promise-tracker";

function CurationDataListContainer() {
  const [curationDataList, setCurationDataList] = useState([]);
  const userInfo = useSelector((state) => state.user.user);
  /* 페이지네이션 */
  const [dcCount, setDcCount] = useState(0); // document 총 개수
  const [pageNo, setPageNo] = useState(1); // 현재 활성화 된 페이지 번호
  const [listSize, setListSize] = useState(10); // 한 페이지에 나타낼 document 개수

  const dispatch = useDispatch();
  const statusCode = 7;

  const [viewType , setViewType] = useState("list");

  const viewTypeHandler = (e)=>{
    setViewType(e.target.value)
  }

  const history = useHistory();
  const handleRowClick = (_id) => {
    history.push(`/${userInfo.permission!==0?"curation":"library"}/${_id}`);
  }  

  /* 데이터 정제하기 */
  const dataCleansing = (rawData) => {
    let _curationDataList = [];
    let _rawCurationDataList = rawData.docs;
    let _dcCount = rawData.dcCount;
    console.log(rawData)
    _rawCurationDataList.forEach((item) => {
      const obj = {
        _id: item._id,
        doc_origin_title: item.doc_origin_title,
        doc_kor_title: item.doc_kor_title,
        doc_page: item.doc_page,
        doc_thumbnail: item.doc_thumbnail,
        doc_country_list: item.doc_country.map((x) => x.CT_NM).join(", "),
        doc_publish_country_list: item.doc_publish_country.map((x) => x.CT_NM).join(", "),
        doc_category_list: item.doc_category.map((x) => x.CT_NM).join(", "),
        doc_register_date: item.doc_register_date.substring(0, 10),
        doc_host: item.doc_host,
        doc_content_type_list:item.doc_content_type.map((x) => x.CT_NM).join(", "),
        doc_content: item.doc_content.replace(/(<([^>]+)>)/gi, ""), // 태그 삭제 정규표현식
        doc_url:item.doc_url,
      };
      _curationDataList.push(obj);
    });
    setDcCount(_dcCount);
    setCurationDataList(_curationDataList);
  };

  /* 데이터 불러오기 */
  const dataFetch = () => {
    trackPromise(
      CrawlDataListFetchApi(statusCode, listSize, pageNo)
        .then((res) => {
          console.log(res.data)
          dataCleansing(res.data);
        })
        .catch((err) => {
          sessionHandler(err, dispatch).then((res) => {
            CrawlDataListFetchApi(statusCode, listSize, pageNo).then((res) => {

              dataCleansing(res.data);
            });
          });
        })
    );
  };

  useEffect(() => {
    dataFetch();
  }, [pageNo]);

  return (
    <>
      <CurationDataList
        curationDataList={curationDataList}
        statusCode={statusCode}
        dcCount={dcCount}
        listSize={listSize}
        pageNo={pageNo}
        setPageNo={setPageNo}
        viewTypeHandler={viewTypeHandler}
        viewType={viewType}
        handleRowClick={handleRowClick}
        userInfo={userInfo}
      />
    </>
  );
}
export default CurationDataListContainer;
