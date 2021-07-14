import axiosInstance from "../../helper/axiosInstance";
import { SET_TOKEN, SET_USER } from "../types/AuthType";
import { REMOVE_USER_ERRORS, REMOVE_USER_LOADER, SET_SINGLE_USER, SET_USERS, SET_USER_ERRORS, SET_USER_LOADER, SET_USER_MESSAGE, SET_USER_REDIRECT } from "../types/UserType";


export const fetchUsers = (page) =>{
      return async(dispatch,getState)=>{
            dispatch({type: SET_USER_LOADER});
            try {
                  const {data: {response, count, perPage}} = await axiosInstance.get(`/all-user/${page}`);
                  
                  dispatch({type: SET_USERS, payload: {response,count,perPage}});
                  dispatch({type: REMOVE_USER_LOADER});
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_USER_LOADER});
                  dispatch({type: SET_USER_ERRORS, payload:errors});
                  console.log(errors);
            }
      }
  }

export const createAction = (userData) =>{
    return async(dispatch,getState)=>{
        // const {AuthReducer: {token}} = getState();
        dispatch({type: SET_USER_LOADER});
        try {
                const { data:{message} } = await axiosInstance.post(`/create-user`,userData); 
                dispatch({type: REMOVE_USER_LOADER});
                dispatch({type: SET_USER_MESSAGE, payload:message});
                dispatch({type: SET_USER_REDIRECT}); 
                console.log(message);   
          } catch (error) {
                const {errors} = error.response.data;
                dispatch({type: REMOVE_USER_LOADER});
                dispatch({type: SET_USER_ERRORS, payload:errors});
                console.log(errors);
          }
    }
}

export const deleteAction = (id) =>{
      return async (dispatch, getState)=>{
              try {
              const {data} = await axiosInstance.get(`/delete-user/${id}`);
              dispatch({type:SET_USER_LOADER});
              dispatch({type:REMOVE_USER_ERRORS});
              dispatch({type:SET_USER_MESSAGE, payload: data.message});    
          } catch (error) {
              dispatch({type:SET_USER_ERRORS, payload: error.response.data.errors});
          }
        
      };
  }

  export const fetchUser = (id) =>{
      return async(dispatch,getState)=>{
            dispatch({type: SET_USER_LOADER});
            try {
                  const { data } = await axiosInstance.get(`/edit-user/${id}`);
                  dispatch({type:SET_SINGLE_USER, payload: data.response});
                  dispatch({type: REMOVE_USER_LOADER});
                  console.log(data.response)
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_USER_LOADER});
                  console.log(errors);
            }
      }
  }
  
  export const updateUserProfile = (userData,id) =>{
        return async(dispatch,getState)=>{
            // const {AuthReducer: {token}} = getState();
            dispatch({type: SET_USER_LOADER});
            try {
                    const { data } = await axiosInstance.post(`/update-user/${id}`,userData); 
                    dispatch({type: REMOVE_USER_LOADER});
                    localStorage.setItem('user', JSON.stringify(data.user));
                    dispatch({type: SET_USER, payload: data.user});
                    dispatch({type: SET_USER_MESSAGE, payload: data.message});
                    dispatch({type: SET_USER_REDIRECT});    
              } catch (error) {
                    const {errors} = error.response.data;
                    dispatch({type: REMOVE_USER_LOADER});
                    dispatch({type: SET_USER_ERRORS, payload:errors});
                    console.log(error);
              }
        }
  }
  
  export const updateUserPassword = (userData,id) =>{
        return async(dispatch,getState)=>{;
            dispatch({type: SET_USER_LOADER});
            try {
                    const { data } = await axiosInstance.post(`/update-user-password/${id}`,userData); 
                    dispatch({type: REMOVE_USER_LOADER});
                    dispatch({type: SET_USER_MESSAGE, payload: data.message});
                    dispatch({type: SET_USER_REDIRECT});    
              } catch (error) {
                    const {errors} = error.response.data;
                    dispatch({type: REMOVE_USER_LOADER});
                    dispatch({type: SET_USER_ERRORS, payload:errors});
                    console.log(error);
              }
        }
  }