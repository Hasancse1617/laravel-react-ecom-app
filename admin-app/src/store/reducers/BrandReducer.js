import { BRAND_STATUS, REMOVE_BRAND_ERRORS, REMOVE_BRAND_LOADER, REMOVE_BRAND_MESSAGE, REMOVE_BRAND_STATUS, SET_BRANDS, SET_BRAND_ERRORS, SET_BRAND_LOADER, SET_BRAND_MESSAGE, SET_BRAND_STATUS, SET_SINGLE_BRAND } from "../types/BrandType"

const initState = {
    loading:false,
    brandErrors:[],
    message:'',
    brands:[],
    count:'',
    perPage:'',
    brand:[],
    status:false,
    pageLink:'',
    brand_status: 0,
    brandId: 0,
}
const BrandReducer = (state=initState, action) =>{
    if(action.type === SET_BRAND_LOADER){
        return {...state, loading: true}
    }
    else if(action.type === REMOVE_BRAND_LOADER){
        return {...state, loading: false}
    }
    else if(action.type === SET_BRAND_ERRORS){
        return {...state, brandErrors: action.payload}
    }
    else if(action.type === REMOVE_BRAND_ERRORS){
        return {...state, brandErrors: []}
    }
    else if(action.type === SET_BRAND_MESSAGE){
        return {...state, message: action.payload}
    }
    else if(action.type === REMOVE_BRAND_MESSAGE){
        return {...state, message: ''}
    }
    else if(action.type === SET_BRANDS){
        return {...state, brands: action.payload.response, count: action.payload.count, perPage: action.payload.perPage, pageLink: '/admin/category/all'}
    }
    else if(action.type === SET_SINGLE_BRAND){
        return {...state, brand: action.payload}
    }
    else if(action.type === SET_BRAND_STATUS){
        return {...state, status: true}
    }
    else if(action.type === REMOVE_BRAND_STATUS){
        return {...state, status: false, brand: []}
    }
    else if(action.type === BRAND_STATUS){
        return{...state, brand_status: action.payload.status, brandId: action.payload.brand_id}
    }
    else{
        return state;
    }
}
export default BrandReducer;