import {createStore,combineReducers,applyMiddleware} from 'redux'
import Thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productDetailsReducer, productReducer } from './reducers/productReducer';
import { userReducer } from './reducers/userReducer';

const reducer = combineReducers({
    products : productReducer,
    productDetails: productDetailsReducer,
    user : userReducer,
})

let initialState = {};
const middleware = [Thunk]
const store = createStore
    (
        reducer,
        initialState,
        composeWithDevTools(applyMiddleware(...middleware))
    )

export default store;