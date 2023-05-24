import axios from "axios"
import { getUserData } from "./Storage";
axios.defaults.baseURL="https://identitytoolkit.googleapis.com/v1"; /* base url*/
const API_KEY="AIzaSyC0A0GXsBKnDA7Y01yGubdz5zPtNjFtbI0"
const REGISTER_URL= `/accounts:signUp?key=${API_KEY}`;
const LOGIN_URL=`/accounts:signInWithPassword?key=${API_KEY}`;
const User_DETAILS_URL=`/accounts:lookup?key=${API_KEY}`;

export const RegisterApi=(inputs)=>{     /* if received inputs from name,email.. */
    let data ={displayName:inputs.name,email:inputs.email,password:inputs.password}
       return axios.post(REGISTER_URL,data)
}
export const LoginApi=(inputs)=>{     /* if received inputs from name,email.. */
    let data ={email:inputs.email,password:inputs.password}
       return axios.post(LOGIN_URL,data)
}
export const UserDetailsApi=()=>{
    let data={idToken:getUserData()}
    return axios.post(User_DETAILS_URL,data)
}

