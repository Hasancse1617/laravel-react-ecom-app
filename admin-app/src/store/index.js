import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from "redux-thunk";
import AuthReducer from './reducers/AuthReducer';
import UserReducer from './reducers/UserReducer';
import CategoryReducer from './reducers/CategoryReducer';
import BrandReducer from './reducers/BrandReducer';
import BannerReducer from './reducers/BannerReducer';
import ProductReducer from './reducers/ProductReducer';


const rootReducers = combineReducers({
     AuthReducer,
     UserReducer,
     CategoryReducer,
     BrandReducer,
     BannerReducer,
     ProductReducer,
});
const middlewares = [thunkMiddleware];
const Store = createStore(rootReducers, composeWithDevTools( applyMiddleware(...middlewares)));

export default Store;