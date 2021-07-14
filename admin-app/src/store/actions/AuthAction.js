import axiosInstance from "../../helper/axiosInstance";
import { REMOVE_AUTH_LOADER, SET_AUTH_ERRORS, SET_AUTH_LOADER, SET_TOKEN } from "../types/AuthType"

export const AuthLogin = (loginData) =>{
    return async (dispatch) =>{
         try {
             dispatch({type: SET_AUTH_LOADER});
             const { data } = await axiosInstance.post("/login", loginData);
             localStorage.setItem("myToken", data.token);
             localStorage.setItem("user", JSON.stringify(data.user));
             dispatch({type: SET_TOKEN, payload: {token: data.token, userdetails: data.user}});
         } catch (error) {
            dispatch({type: REMOVE_AUTH_LOADER});
            dispatch({type: SET_AUTH_ERRORS, payload: error.response.data.errors});
         }
    }
}

export const forgotPassword = () =>{
    return async (dispatch) =>{
         try {

         } catch (error) {
             
         }
    }
}

export const resetPassword = () =>{
    return async (dispatch) =>{
         try {
             
         } catch (error) {
             
         }
    }
}