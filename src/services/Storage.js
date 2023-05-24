export const storeUserData=(data)=>{     /*  to store the data from id token*/
    localStorage.setItem('idToken',data)
}
export const getUserData=()=>{
      return localStorage.getItem('idToken');
}

export const removeUserData =()=>{
    localStorage.removeItem('idToken')
}