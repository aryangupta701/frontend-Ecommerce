import axios from "axios";
import { ADD_TO_CART, REMOVE_CART_ITEM } from "../constants/cartConstant";

export const addItemsToCart= (product) => async(dispatch,getState) => {
    const {data} = await axios(`/api/v1/product/${product.id}`)
    // console.log(data)
    dispatch({type : ADD_TO_CART, payload: {
        id : data.product._id,
        name : data.product.name,
        price : data.product.price,
        image :data.product.images[0].URL,
        stock: data.product.stock,
        quantity: product.quantity
    } })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeCartItem = (id) => async(dispatch,getState) => {
    dispatch({type: REMOVE_CART_ITEM, payload: id})
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}