import {createStore,combineReducers,applyMiddleware} from 'redux'
import Thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productDetailsReducer, productReducer } from './reducers/productReducer';
import { forgotPasswordReducer, profileReducer, userReducer } from './reducers/userReducer';
import { cartReducer} from './reducers/cartReducer';
// import { orderReducer} from './reducers/orderReducer.js';



const reducer = combineReducers({
    products : productReducer,
    productDetails: productDetailsReducer,
    user : userReducer,
    profile : profileReducer,
    forgotPassword : forgotPasswordReducer,
    cart: cartReducer,
    // newOrder : orderReducer,
})

let initialState = {
    cart : {
        cartItems : localStorage.getItem('cartItems')? 
                    JSON.parse(localStorage.getItem('cartItems')) : [],
    shippingInfo : localStorage.getItem("shippingInfo") ? 
                JSON.parse(localStorage.getItem('shippingInfo')) : {}
            },
};
const middleware = [Thunk]
const store = createStore
    (
        reducer,
        initialState,
        composeWithDevTools(applyMiddleware(...middleware))
    )

export default store;