import axiosInstance from "../../helper/axiosInstance";
import { SET_BANNERS, REMOVE_BANNER_ERRORS, REMOVE_BANNER_LOADER, SET_SINGLE_BANNER, SET_BANNER_ERRORS, SET_BANNER_LOADER, SET_BANNER_MESSAGE, SET_BANNER_REDIRECT, BANNER_STATUS } from "../types/BannerType";


export const fetchBanners = (page) =>{
      return async(dispatch,getState)=>{
            dispatch({type: SET_BANNER_LOADER});
            try {
                  const {data: {response, count, perPage}} = await axiosInstance.get(`/all-banner/${page}`);
                  dispatch({type: SET_BANNERS, payload: {response,count,perPage}});
                  dispatch({type: REMOVE_BANNER_LOADER});
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_BANNER_LOADER});
                  dispatch({type: SET_BANNER_ERRORS, payload:errors});
                  console.log(errors);
            }
      }
  }

export const createAction = (bannerData) =>{
    return async(dispatch,getState)=>{
        // const {AuthReducer: {token}} = getState();
        dispatch({type: SET_BANNER_LOADER});
        try {
                const { data:{message} } = await axiosInstance.post(`/create-banner`,bannerData); 
                dispatch({type: REMOVE_BANNER_LOADER});
                dispatch({type: SET_BANNER_MESSAGE, payload:message});
                dispatch({type: SET_BANNER_REDIRECT}); 
                console.log(message);   
          } catch (error) {
                const {errors} = error.response.data;
                dispatch({type: REMOVE_BANNER_LOADER});
                dispatch({type: SET_BANNER_ERRORS, payload:errors});
                console.log(errors);
          }
    }
}

export const deleteAction = (id) =>{
      return async (dispatch, getState)=>{
              try {
              const {data} = await axiosInstance.get(`/delete-banner/${id}`);
              dispatch({type:SET_BANNER_LOADER});
              dispatch({type:REMOVE_BANNER_ERRORS});
              dispatch({type:SET_BANNER_MESSAGE, payload: data.message});    
          } catch (error) {
              dispatch({type:SET_BANNER_ERRORS, payload: error.response.data.errors});
          }
        
      };
  }

  export const fetchBanner = (id) =>{
      return async(dispatch,getState)=>{
            dispatch({type: SET_BANNER_LOADER});
            try {
                  const { data } = await axiosInstance.get(`/edit-banner/${id}`);
                  dispatch({type:SET_SINGLE_BANNER, payload: data.response});
                  dispatch({type: REMOVE_BANNER_LOADER});
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_BANNER_LOADER});
                  console.log(errors);
            }
      }
  }

  export const updateAction = (bannerData,id) =>{
      return async(dispatch,getState)=>{
          try {
                  const { data:{message} } = await axiosInstance.post(`/update-banner/${id}`,bannerData); 
                  dispatch({type: SET_BANNER_MESSAGE, payload:message});
                  dispatch({type: SET_BANNER_REDIRECT}); 
                  console.log(message);   
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: SET_BANNER_ERRORS, payload:errors});
                  console.log(errors);
            }
      }
  }

  export const statusAction = (statusData) =>{
    return async(dispatch,getState)=>{
          try {
                const {data: {status,banner_id}} = await axiosInstance.post(`/status-banner`, statusData);
                dispatch({type: BANNER_STATUS, payload: {status,banner_id}});
          } catch (error) {
                const {errors} = error.response.data;
                dispatch({type: SET_BANNER_ERRORS, payload:errors});
                console.log(errors);
          }
    }
}
