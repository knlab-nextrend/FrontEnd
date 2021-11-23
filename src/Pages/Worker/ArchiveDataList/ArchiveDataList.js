import React from "react";
import FormHeader from "../../../Components/FormHeader";
function ArchiveDataList({ archiveDataList }) {
  return (
    <>
      <FormHeader type="view" title={"아카이브 데이터 조회"} />
      {archiveDataList.map((item, index) => {
        return (
          <div>
            <p>{item.item_id}</p>
            <p>{item.page}</p>
          </div>
        );
      })}
    </>
  );
}
export default ArchiveDataList;
