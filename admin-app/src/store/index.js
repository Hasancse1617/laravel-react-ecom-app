import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from "redux-thunk";
import AuthReducer from './reducers/AuthReducer';
import UserReducer from './reducers/UserReducer';
import CategoryReducer from './reducers/CategoryReducer';


const rootReducers = combineReducers({
     AuthReducer,
     UserReducer,
     CategoryReducer,
});
const middlewares = [thunkMiddleware];
const Store = createStore(rootReducers, composeWithDevTools( applyMiddleware(...middlewares)));

export default Store;