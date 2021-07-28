import { REMOVE_SINGLE_PRODUCT, REMOVE_PRODUCT_ERRORS, REMOVE_PRODUCT_LOADER, REMOVE_PRODUCT_MESSAGE, REMOVE_PRODUCT_REDIRECT, SET_SINGLE_PRODUCT, SET_PRODUCTS, SET_PRODUCT_ERRORS, SET_PRODUCT_LOADER, SET_PRODUCT_MESSAGE, SET_PRODUCT_REDIRECT, PRODUCT_STATUS, SET_PRODUCT_BRAND, SET_PRODUCT_CATEGORY, SET_PRODUCT_IMAGES, PRODUCT_IMAGE_STATUS } from "../types/ProductType";

const initState = {
    loading: false,
    productErrors: [],
    redirect: false,
    message: '',
    products: [],
    product: [],
    count: '',
    perPage: '',
    pageLink: '',
    status: false,
    product_status: 0,
    productId: 0,
    brands:[],
    categories:[],
    images:[],
    image_status: 0,
    imageId: 0,
}

const ProductReducer = (state=initState, action) =>{
    if(action.type === SET_PRODUCT_LOADER){
        return{...state, loading: true };
    }
    else if(action.type === REMOVE_PRODUCT_LOADER){
        return{...state, loading: false };
    }
    else if(action.type === SET_PRODUCT_MESSAGE){
        return{...state, message: action.payload };
    }
    else if(action.type === REMOVE_PRODUCT_MESSAGE){
        return{...state, message: '' };
    }
    else if(action.type === SET_PRODUCT_ERRORS){
        return{...state, productErrors: action.payload  };
    }
    else if(action.type === REMOVE_PRODUCT_ERRORS){
        return{...state, productErrors: [] };
    }
    else if(action.type === SET_PRODUCT_REDIRECT){
        return{...state, redirect: true };
    }
    else if(action.type === REMOVE_PRODUCT_REDIRECT){
        return{...state, redirect: false };
    }
    else if(action.type === SET_PRODUCTS){
        return{...state, products: action.payload.response, count: action.payload.count, perPage: action.payload.perPage, pageLink: '/admin/category/all' };
    }
    else if(action.type === SET_SINGLE_PRODUCT){
        return{...state, product: action.payload, status: true };
    }
    else if(action.type === REMOVE_SINGLE_PRODUCT){
        return{...state, product: [], status: false };
    }
    else if(action.type === PRODUCT_STATUS){
        return{...state, product_status: action.payload.status, productId: action.payload.product_id}
    }
    else if(action.type === SET_PRODUCT_BRAND){
        return{...state, brands: action.payload}
    }
    else if(action.type === SET_PRODUCT_CATEGORY){
        return{...state, categories: action.payload}
    }
    else if(action.type === SET_PRODUCT_IMAGES){
        return{...state, images: action.payload}
    }
    else if(action.type === PRODUCT_IMAGE_STATUS){
        return{...state, image_status: action.payload.status, imageId: action.payload.image_id}
    }
    else{
        return state;
    }
}
export default ProductReducer;