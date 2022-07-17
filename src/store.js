import {createStore,combineReducers,applyMiddleware} from 'redux'
import Thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { allReviewReducer, newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productsReducer, reviewReducer } from './reducers/productReducer';
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from './reducers/userReducer';
import { cartReducer} from './reducers/cartReducer';
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, ordersReducer } from './reducers/orderReducer';


const reducer = combineReducers({
    products : productsReducer,
    productDetails: productDetailsReducer,
    user : userReducer,
    profile : profileReducer,
    forgotPassword : forgotPasswordReducer,
    cart: cartReducer,
    newOrder : newOrderReducer,
    myOrders : myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct : newProductReducer,
    product: productReducer,
    allOrders : allOrdersReducer,
    order: ordersReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    productReviews : allReviewReducer,
    review : reviewReducer
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