import {createStore,combineReducers,applyMiddleware} from 'redux'
import Thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productReducer } from './reducers/productReducer';

const reducer = combineReducers({
    products : productReducer,
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