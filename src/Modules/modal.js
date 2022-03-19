const SET_MODAL = "modal/SET_MODAL";
const SET_MODAL_DATA = "modal/SET_MODAL_DATA";
const CLEAR_AXIS_CATEGORY = "modal/CLEAR_AXIS_CATEGORY";
const SET_CATEGORY_MODAL_TYPE = "modal/SET_CATEGORY_MODAL_TYPE";

export const setModal = (modalType) => ({ type: SET_MODAL, modalType });
export const setModalData = (modalData, dataType) => ({
  type: SET_MODAL_DATA,
  modalData,
  dataType,
});
export const clearCategoryData = () => ({ type: CLEAR_AXIS_CATEGORY });
export const setCategoryModalType = (categoryModalType) => ({
  type: SET_CATEGORY_MODAL_TYPE,
  categoryModalType,
});
const initialState = {
  modalType: null,
  categoryModalType: null,
  modalData: {
    doc_country:[],
    doc_publish_country:[],
    doc_category:[],
    doc_content_category:[],
    doc_content_type:[],
    doc_custom:[],
    doc_language:[],
    doc_topic:[],

    modal_user: [],
    axis_category:null,
  },
};

export default function modal(state = initialState, action) {
  switch (action.type) {
    case SET_MODAL:
      return {
        ...state,
        modalType: action.modalType,
      };
    case SET_MODAL_DATA:
      const _modalData = { ...state.modalData };
      _modalData[action.dataType] = action.modalData;
      return {
        ...state,
        modalData: _modalData,
      };
    case CLEAR_AXIS_CATEGORY:
      _modalData[action.axis_category] = null;
      return {
        ...state,
        modalData: _modalData,
      };
    case SET_CATEGORY_MODAL_TYPE:
      return {
        ...state,
        categoryModalType: action.categoryModalType,
      };
    default:
      return state;
  }
}
