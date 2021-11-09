const getToken = ()=>{
  if (!!localStorage.getItem('token')){
    return localStorage.getItem('token')
  }
}

const getRefreshToken = ()=>{
  if(!!localStorage.getItem('refreshToken')){
    return localStorage.getItem('refreshToken')
  }
}
export { getToken,getRefreshToken };
