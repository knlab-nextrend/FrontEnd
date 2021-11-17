const SET_MODAL = "modal/SET_MODAL";

export const setModal = (modalType) => ({ type: SET_MODAL,modalType });


const initialState = { modalType: null };

export default function modal(state = initialState, action) {
  switch (action.type) {
    case SET_MODAL:
      console.log(action.modalType)
      return {
        ...state,
        modalType: action.modalType,
      };
    default:
      return state;
  }
}
