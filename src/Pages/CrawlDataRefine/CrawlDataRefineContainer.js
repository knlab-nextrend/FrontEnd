import React from "react";
import CrawlDataRefine from "./CrawlDataRefine";
import { useParams } from "react-router-dom";

function CrawlDataRefineContainer() {
  const { itemId, refineStatus } = useParams();
  return (
    <>
      <CrawlDataRefine />
    </>
  );
}

export default CrawlDataRefineContainer;
