import React from "react";
import { useSelector } from "react-redux";
import CountryCategoryModal from "./CountryCategoryModal";
import CodeCategoryModal from "./CodeCategoryModal";

function GlobalModal() {
  const { modalType } = useSelector((state) => state.modal.modalType);

  const MODAL_TYPES = {
    CountryCategoryModal: "CountryCategoryModal",
    CodeCategoryModal: "CodeCategoryModal",
  };

  const MODAL_COMPONENTS = {
    [MODAL_TYPES.CountryCategoryModal]: CountryCategoryModal,
    [MODAL_TYPES.CodeCategoryModal]: CodeCategoryModal,
  };

  return <>{modalType || MODAL_COMPONENTS[modalType]}</>;
}

export default GlobalModal();
