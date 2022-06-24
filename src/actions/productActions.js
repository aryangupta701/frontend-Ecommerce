import axios from "axios";

import { 
    ALL_PRODUCT_FAIL, 
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    CLEAR_ERRORS
    } from "../constants/productConstant";

export const getProduct= (keyword="",page=1,price=[0,250000],category,rating=0) => async(dispatch) => {
    try{
        dispatch({
            type : ALL_PRODUCT_REQUEST
        })

        let url = `/api/v1/products?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}`;
        if(category){
            url = `/api/v1/products?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${rating}`
        }
        const {data} = await axios.get(url);
        console.log(data)
        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload : data,
        })
    }
    catch(error){
        console.log(error)
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getProductDetails= (id) => async(dispatch) => {
    try{
        dispatch({
            type : PRODUCT_DETAILS_REQUEST
        })
        const {data} = await axios.get(`/api/v1/product/${id}`);
        // console.log(data)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload : data
        })
    }
    catch(error){
        console.log(error)
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async(dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}