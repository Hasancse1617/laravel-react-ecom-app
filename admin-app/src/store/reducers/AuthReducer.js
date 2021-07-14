import jwt_decode from 'jwt-decode';
import { LOGOUT, REMOVE_AUTH_ERRORS, REMOVE_AUTH_LOADER, SET_AUTH_ERRORS, SET_AUTH_LOADER, SET_TOKEN } from "../types/AuthType";

const initState = {
    loading: false,
    loginErrors: [],
    token: '',
    user: "",
    message: '',
}

const verifyToken = (token) => {
	const decodeToken = jwt_decode(token);
	const expiresIn = new Date(decodeToken.exp * 1000);
	if (new Date() > expiresIn) {
		localStorage.removeItem('myToken');
		return null;
	} else {
		return decodeToken;
	}
};
const token = localStorage.getItem('myToken');
const user = localStorage.getItem('user');

if (token) {
	const decoded = verifyToken(token);
	if (decoded) {
		initState.token = token;
		initState.user = JSON.parse(user);
	}
}

const AuthReducer = (state=initState, action) =>{
    if(action.type === SET_AUTH_LOADER){
        return {...state, loading: true}
    }
    else if(action.type === REMOVE_AUTH_LOADER){
        return {...state, loading: false}
    }
    else if(action.type === SET_AUTH_ERRORS){
        return {...state, loginErrors: action.payload}
    }
    else if(action.type === REMOVE_AUTH_ERRORS){
        return {...state, loginErrors: []}
    }
    else if (action.type === SET_TOKEN) {
		const decoded = verifyToken(action.payload.token);
        console.log('kkkkkkk',action.payload.userdetails)
		return {
			...state,
			token: action.payload.token,
            user: action.payload.userdetails
		};
	}
    
    else if(action.type === LOGOUT){
        return {...state, token: '', user: ""}
    }
    else{
        return state;
    }
}
export default AuthReducer;