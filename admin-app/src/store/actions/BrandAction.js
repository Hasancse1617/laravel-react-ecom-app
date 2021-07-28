import axiosInstance from '../../helper/axiosInstance';
import { BRAND_STATUS, REMOVE_BRAND_ERRORS, REMOVE_BRAND_LOADER, SET_BRANDS, SET_BRAND_ERRORS, SET_BRAND_LOADER, SET_BRAND_MESSAGE, SET_BRAND_STATUS, SET_SINGLE_BRAND } from '../types/BrandType';

export const createAction = (brandData) =>{
    return async (dispatch, getState)=>{        
        try {
           const {data} = await axiosInstance.post('/create-brand',brandData);
           dispatch({type: SET_BRAND_LOADER});
           dispatch({type: REMOVE_BRAND_ERRORS});
           dispatch({type: SET_BRAND_MESSAGE, payload: data.message});
           console.log(data);
       } catch (error) {
           dispatch({type: REMOVE_BRAND_LOADER});
           dispatch({type: SET_BRAND_ERRORS, payload: error.response.data.errors});
       }
    };
}

export const fetchbrands = (page) =>{
    return async (dispatch, getState) =>{
        // const {AuthReducer: {token}} = getState();
        dispatch({type: SET_BRAND_LOADER});
        try {
           const {data: {response, count, perPage}} = await axiosInstance.get(`/brands/${page}`);
           dispatch({type: REMOVE_BRAND_LOADER});
           dispatch({type: SET_BRANDS, payload: {response,count,perPage}});
           console.log(response);
       } catch (error) {
           dispatch({type: REMOVE_BRAND_LOADER});
       }
    };
}

export const fetchBrand = (id) =>{
     return async (dispatch, getState) =>{
        try {
           const {data: {response}} = await axiosInstance.get(`/edit-brand/${id}`);
           dispatch({type: SET_SINGLE_BRAND, payload: response});
           dispatch({type: SET_BRAND_STATUS});
        //    dispatch({type:CLOSE_LOADER});
           console.log(response);
       } catch (error) {
        //    dispatch({type:CLOSE_LOADER});
       }
     };
}

export const updateAction = (brandData,id) =>{
    return async (dispatch, getState)=>{
        try {
           const {data} = await axiosInstance.post(`/update-brand/${id}`,brandData);
           dispatch({type: SET_BRAND_LOADER});
           dispatch({type: REMOVE_BRAND_ERRORS});
           dispatch({type: SET_BRAND_MESSAGE, payload: data.message});
           console.log(data);
       } catch (error) {
           dispatch({type: REMOVE_BRAND_LOADER});
           dispatch({type: SET_BRAND_ERRORS, payload: error.response.data.errors});
       }
    };
}

export const statusAction = (statusData) =>{
    return async(dispatch,getState)=>{
          try {
                const {data: {status,brand_id}} = await axiosInstance.post(`/status-brand`, statusData);
                dispatch({type: BRAND_STATUS, payload: {status,brand_id}});
          } catch (error) {
                const {errors} = error.response.data;
                dispatch({type: SET_BRAND_ERRORS, payload:errors});
                console.log(errors);
          }
    }
}

export const deleteAction = (id) =>{
    return async (dispatch, getState)=>{
        try {
            const {data} = await axiosInstance.get(`/delete-brand/${id}`);
            dispatch({type: SET_BRAND_LOADER});
            dispatch({type: REMOVE_BRAND_ERRORS});
            dispatch({type: SET_BRAND_MESSAGE, payload: data.message});
            
        } catch (error) {
            dispatch({type: REMOVE_BRAND_LOADER});
            dispatch({type: SET_BRAND_ERRORS, payload: error.response.data.errors});
        }
      
    };
}