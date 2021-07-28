import axiosInstance from "../../helper/axiosInstance";
import { PRODUCT_IMAGE_STATUS, SET_PRODUCT_IMAGES, SET_PRODUCT_CATEGORY, SET_PRODUCT_BRAND, SET_PRODUCTS, REMOVE_PRODUCT_ERRORS, REMOVE_PRODUCT_LOADER, SET_SINGLE_PRODUCT, SET_PRODUCT_ERRORS, SET_PRODUCT_LOADER, SET_PRODUCT_MESSAGE, SET_PRODUCT_REDIRECT, PRODUCT_STATUS } from "../types/ProductType";


export const fetchProducts = (page) =>{
      return async(dispatch,getState)=>{
            dispatch({type: SET_PRODUCT_LOADER});
            try {
                  const {data: {response, count, perPage}} = await axiosInstance.get(`/all-product/${page}`);
                  dispatch({type: SET_PRODUCTS, payload: {response,count,perPage}});
                  dispatch({type: REMOVE_PRODUCT_LOADER});
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_PRODUCT_LOADER});
                  dispatch({type: SET_PRODUCT_ERRORS, payload:errors});
                  console.log(errors);
            }
      }
  }

export const createAction = (productData) =>{
    return async(dispatch,getState)=>{
        // const {AuthReducer: {token}} = getState();
        dispatch({type: SET_PRODUCT_LOADER});
        try {
                const { data:{message} } = await axiosInstance.post(`/create-product`,productData); 
                dispatch({type: REMOVE_PRODUCT_LOADER});
                dispatch({type: SET_PRODUCT_MESSAGE, payload:message});
                dispatch({type: SET_PRODUCT_REDIRECT}); 
                console.log(message);   
          } catch (error) {
                const {errors} = error.response.data;
                dispatch({type: REMOVE_PRODUCT_LOADER});
                dispatch({type: SET_PRODUCT_ERRORS, payload:errors});
                console.log(errors);
          }
    }
}

export const deleteAction = (id) =>{
      return async (dispatch, getState)=>{
              try {
              const {data} = await axiosInstance.get(`/delete-product/${id}`);
              dispatch({type:SET_PRODUCT_LOADER});
              dispatch({type:REMOVE_PRODUCT_ERRORS});
              dispatch({type:SET_PRODUCT_MESSAGE, payload: data.message});    
          } catch (error) {
              dispatch({type:SET_PRODUCT_ERRORS, payload: error.response.data.errors});
          }
        
      };
  }

  export const fetchProduct = (id) =>{
      return async(dispatch,getState)=>{
            dispatch({type: SET_PRODUCT_LOADER});
            try {
                  const { data } = await axiosInstance.get(`/edit-product/${id}`);
                  dispatch({type:SET_SINGLE_PRODUCT, payload: data.response});
                  dispatch({type: REMOVE_PRODUCT_LOADER});
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_PRODUCT_LOADER});
                  console.log(errors);
            }
      }
  }

  export const updateAction = (productData,id) =>{
      return async(dispatch,getState)=>{
          try {
                  const { data:{message} } = await axiosInstance.post(`/update-product/${id}`,productData); 
                  dispatch({type: SET_PRODUCT_MESSAGE, payload:message});
                  dispatch({type: SET_PRODUCT_REDIRECT}); 
                  console.log(message);   
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: SET_PRODUCT_ERRORS, payload:errors});
                  console.log(errors);
            }
      }
  }

  export const statusAction = (statusData) =>{
    return async(dispatch,getState)=>{
          try {
                const {data: {status,product_id}} = await axiosInstance.post(`/status-product`, statusData);
                dispatch({type: PRODUCT_STATUS, payload: {status,product_id}});
          } catch (error) {
                const {errors} = error.response.data;
                dispatch({type: SET_PRODUCT_ERRORS, payload:errors});
                console.log(errors);
          }
    }
}

export const fetchbrands = () =>{
      return async(dispatch,getState)=>{
            dispatch({type: SET_PRODUCT_LOADER});
            try {
                  const { data } = await axiosInstance.get(`/all-brands`);
                  dispatch({type:SET_PRODUCT_BRAND, payload: data.response});
                  dispatch({type: REMOVE_PRODUCT_LOADER});
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_PRODUCT_LOADER});
                  console.log(errors);
            }
      }
  }

  export const fetchcategories = () =>{
      return async(dispatch,getState)=>{
            dispatch({type: SET_PRODUCT_LOADER});
            try {
                  const { data } = await axiosInstance.get(`/all-categories`);
                  dispatch({type:SET_PRODUCT_CATEGORY, payload: data.response});
                  dispatch({type: REMOVE_PRODUCT_LOADER});
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_PRODUCT_LOADER});
                  console.log(errors);
            }
      }
  }

  export const addProductImages = (state,id) =>{
      return async(dispatch,getState)=>{
            console.log(state)
          try {
                  const { data:{message} } = await axiosInstance.post(`/add-product-images/${id}`, state); 
                  dispatch({type: SET_PRODUCT_MESSAGE, payload:message});
                  // dispatch({type: SET_PRODUCT_REDIRECT}); 
                  console.log(message);   
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: SET_PRODUCT_ERRORS, payload:errors});
                  console.log(errors);
            }
      }
  }

  export const allImages = (id) =>{
      return async(dispatch,getState)=>{
            dispatch({type: SET_PRODUCT_LOADER});
            try {
                  const { data } = await axiosInstance.get(`/all-images/${id}`);
                  dispatch({type:SET_PRODUCT_IMAGES, payload: data.response});
                  dispatch({type: REMOVE_PRODUCT_LOADER});
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_PRODUCT_LOADER});
                  console.log(errors);
            }
      }
  }

  export const deleteImageAction = (id) =>{
      return async (dispatch, getState)=>{
              try {
              const {data} = await axiosInstance.get(`/delete-product-image/${id}`);
              dispatch({type:SET_PRODUCT_LOADER});
              dispatch({type:REMOVE_PRODUCT_ERRORS});
              dispatch({type:SET_PRODUCT_MESSAGE, payload: data.message});    
          } catch (error) {
              dispatch({type:SET_PRODUCT_ERRORS, payload: error.response.data.errors});
          }
        
      };
  }

  export const imagestatusAction = (statusData) =>{
      return async(dispatch,getState)=>{
            try {
                  const {data: {status,image_id}} = await axiosInstance.post(`/status-image`, statusData);
                  dispatch({type: PRODUCT_IMAGE_STATUS, payload: {status,image_id}});
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: SET_PRODUCT_ERRORS, payload:errors});
                  console.log(errors);
            }
      }
  }