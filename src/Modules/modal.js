const SET_MODAL = "modal/SET_MODAL";
const SET_MODAL_DATA = "modal/SET_MODAL_DATA";
const CLEAR_MODAL_DATA = "modal/CLEAR_MODAL_DATA";

export const setModal = (modalType) => ({ type: SET_MODAL, modalType });
export const setModalData = (modalData, dataType) => ({
  type: SET_MODAL_DATA,
  modalData,
  dataType,
});
export const clearModalData = () => ({ type: CLEAR_MODAL_DATA });

const initialState = {
  modalType: null,
  modalData: { dc_country: [], dc_code: [], modal_user: [] },
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
    case CLEAR_MODAL_DATA:
      return {
        ...state,
        modalData: null,
      };
    default:
      return state;
  }
}
