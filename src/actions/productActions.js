import axios from "../components/axios/axios";

import { 
    ALL_PRODUCT_FAIL, 
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    CLEAR_ERRORS,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_SUCCESS,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_FAIL
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
        // console.log(data)
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


export const getAdminProduct= () => async(dispatch) => {
    try{
        dispatch({
            type : ADMIN_PRODUCT_REQUEST
        })

        const {data} = await axios.get('/api/v1/admin/products');
        // console.log(data)
        dispatch({
            type: ADMIN_PRODUCT_SUCCESS,
            payload : data.products,
        })
    }
    catch(error){
        console.log(error)
        dispatch({
            type: ADMIN_PRODUCT_FAIL,
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
        // console.log(error)
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newReview= (review) => async(dispatch) => {
    try{
        dispatch({
            type : NEW_REVIEW_REQUEST
        })
        const config = {
            headers: {
                "Content-Type" : "application/json"
            }
        }
        const {data} = await axios.put(`/api/v1/product/review`,review,config);
        // console.log(data)
        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload : data.success
        })
    }
    catch(error){
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newProduct= (product) => async(dispatch) => {
    try{
        dispatch({
            type : NEW_PRODUCT_REQUEST
        })
        const config = {
            headers: {
                "Content-Type" : "application/json"
            }
        }
        const {data} = await axios.post(`/api/v1/admin/product/new`,product,config);
        // console.log(data)
        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload : data
        })
    }
    catch(error){
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}
export const deleteProduct= (id) => async(dispatch) => {
    try{
        dispatch({
            type : DELETE_PRODUCT_REQUEST
        })
        const {data} = await axios.delete(`/api/v1/admin/product/${id}`);
        // console.log(data)
        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload : data.success
        })
    }
    catch(error){
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}


export const updateProduct= (id,product) => async(dispatch) => {
    try{
        dispatch({
            type : UPDATE_PRODUCT_REQUEST
        })
        const config = {
            headers: {
                "Content-Type" : "application/json"
            }
        }
        console.log(product)
        const {data} = await axios.put(`/api/v1/admin/product/${id}`,product,config);
        // console.log(data)
        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload : data.success
        })
    }
    catch(error){
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAllReviews= (id) => async(dispatch) => {
    try{
        dispatch({
            type : ALL_REVIEW_REQUEST
        })
      
        const {data} = await axios.get(`/api/v1/reviews?id=${id}`);
        // console.log(data)
        dispatch({
            type: ALL_REVIEW_SUCCESS,
            payload : data
        })
    }
    catch(error){
        dispatch({
            type: ALL_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}


export const deleteReviews= (reviewId, productId) => async(dispatch) => {
    try{
        dispatch({
            type : DELETE_REVIEW_REQUEST
        })
        const {data} = await axios.delete(`/api/v1/reviews/?id=${reviewId}&productId=${productId}`);
        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload : data.success
        })
    }
    catch(error){
        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async(dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}