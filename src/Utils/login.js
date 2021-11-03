/* 
    로그인을 하면 로컬스토리지에 token값과 refreshToken 값을 저장하며 , 
    저장한 token값은 서버와 통신을 할 때 로그인 유효 여부를 판단하기 위해 사용한다.

    저장한 token값은 로그아웃을 하지 않는 이상 localStorage에서 삭제되지 않지만,
    통신 과정에서 token값이 유효하지 않거나 만료되었다면 서버에서 401에러를 반환한다.
    
    이 401 인증실패 에러를 받았다면 로그아웃 처리 하고 재로그인을 하도록 유도한다. 

    그리고 프론트엔드 에서는 토큰 외의 유저 정보를 따로 저장하지 않아도 된다. 

    사용자가 로그인을 했을 때, 백엔드에서 해당 유저에 대한 토큰을 생성하고, 
    그 때 로그인한 유저에 대한 정보를 전역으로 관리하도록 한다. 

    프론트엔드에서 통신할 때 헤더로 보내는 토큰을 백엔드에서 받아 
    1. 토큰의 유효성 검사 => 유효하지 않거나 만료되었을 경우 401 에러 반환
    2. 로그인한 사용자에 대한 정보를 전역에서 가져와서 사용함. (post요청 등... DB에 무언갈르 기록할 일이 있을 때.)
*/

/* 
    로컬스토리지에 token key에 대한 value가 존재한다면 true값을 반환하며,
    로컬스토리지에 token key에 대한 value가 undefined 이거나 null .. 등 falsy한 값을 가지면 false를 반환한다 (!! 연산자)
*/

/* 유저의 권한은 아래와 같이 정의 함. */
const PERMISSION = {
  USER: 0,
  FIRST_WORKER: 1,
  SECOND_WORKER: 2,
  ADMIN: 9,
};

const isLogin = () =>{
  return !!localStorage.getItem('token')
}
/* 
    로그인 설정 함수. 
    token - 로그인한 유저의 token 정보
    refreshToken - 
    permission - 로그인한 유저의 권한 (number type)
*/
const setLogin = (token, refreshToken, permission) => {
  localStorage.setItem("token", token);
  localStorage.setItem("refreshToken", refreshToken);
  switch (permission) {
    case PERMISSION.USER:
      localStorage.setItem("permission", PERMISSION.USER);
    case PERMISSION.FIRST_WORKER:
      localStorage.setItem("permission", PERMISSION.FIRST_WORKER);
    case PERMISSION.SECOND_WORKER:
      localStorage.setItem("permission", PERMISSION.SECOND_WORKER);
    case PERMISSION.ADMIN:
      localStorage.setItem("permission", PERMISSION.ADMIN);
  }
  location.href="/"
};

const setLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("permission");

  alert("성공적으로 로그아웃 되었습니다.");
  location.href = "/login";
};

export { isLogin,setLogin, setLogout, PERMISSION };
