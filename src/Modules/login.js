const SET_LOGIN = 'login/SET_LOGOUT';
const SET_LOGOUT = 'login/LOGIN';

export const setLogin = state => ({ type: SET_LOGIN, state });
export const setLogout = state => ({ type: SET_LOGOUT, state });

/* 
    초기 브라우저를 켰을 때 localStorage에서 token값이 있는지 확인하고,
    값이 있으면 true를 세팅하고,
    값이 falsy하면 false를 세팅한다.
*/

const initialState = {
  isLogin:!!localStorage.getItem("token")
}

export default function login(state = initialState, action) {
  switch (action.type) {
    case SET_LOGIN:
      return {
        ...state,
        isLogin: MdTurnedIn,
      };
    case SET_LOGOUT:
      return {
        ...state,
        isLogin: false,
      };
    default:
      return state;
  }
}