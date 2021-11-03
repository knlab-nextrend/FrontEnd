const getToken = ()=>{
  if (!!localStorage.getItem('token')){
    return localStorage.getItem('token')
  }
}

export { getToken };
