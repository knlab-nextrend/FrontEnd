const SET_MODAL = "modal/SET_MODAL";

export const setModal = () => ({ type: SET_MODAL });

const initialState = { modalType: null };

export default function modal(state = initialState, action) {
  switch (action.type) {
    case SET_MODAL:
      return {
        ...state,
        modalType: action.state,
      };
    default:
      return state;
  }
}
