import axios from "../components/axios/axios";

import { 
    SIGNUP_FAIL,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    SIGNUP_SUCCESS,
    LOGIN_REQUEST,
    SIGNUP_REQUEST,
    CLEAR_ERRORS,
    LOAD_USER_FAIL,
    LOAD_USER_SUCCESS,
    LOAD_USER_REQUEST,
    LOGOUT_USER_FAIL,
    LOGOUT_USER_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_REQUEST,
    FORGET_PASSWORD_FAIL,
    FORGET_PASSWORD_REQUEST,
    FORGET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_REQUEST,
    ALL_USER_REQUEST,
    ALL_USER_SUCCESS,
    ALL_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL
 } from "../constants/userConstant"

export const login = (email,password)=>async(dispatch)=>{
    try{
        dispatch({type: LOGIN_REQUEST})
        const url = '/api/v1/login';
        const config = {
            headers : {
                "content-type" : "application/json"
            }
        }
        const {data} = await axios.post(url,{email,password},config)
        dispatch({type: LOGIN_SUCCESS, payload: data.user})
    }
    catch(error){
        dispatch({type:LOGIN_FAIL, payload: error.response.data.message})
    }
}

export const register = (formData)=>async(dispatch)=>{
    try{
        dispatch({type: SIGNUP_REQUEST})
        const url = '/api/v1/register'
        const config = {
            headers : {
                "content-type" : "multipart/form-data"
            }
        }
        const {data }= await axios.post(url,formData,config);
        dispatch({type: SIGNUP_SUCCESS, payload: data.user})
    }
    catch(err){
        dispatch({
            type: SIGNUP_FAIL, 
            payload : err.response.data.message
        })
    }
}

export const loadUser = ()=>async(dispatch)=>{
    try{
        dispatch({type: LOAD_USER_REQUEST})
        const url = '/api/v1/profile';
        const {data} = await axios.get(url)
        // console.log(data)
        dispatch({type: LOAD_USER_SUCCESS, payload: data.user})
    }
    catch(error){
        dispatch({type:LOAD_USER_FAIL, payload: error.response.data.message})
    }
}

export const logout = ()=>async(dispatch)=>{
    try{
        const url = '/api/v1/logout'
        await axios.post(url)
        dispatch({type: LOGOUT_USER_SUCCESS})
    }
    catch(err){
        dispatch({type: LOGOUT_USER_FAIL,payload: err.response.data.message})
    }
}

export const updateProfile = (formData)=>async(dispatch)=>{
    try{
        dispatch({type: UPDATE_PROFILE_REQUEST})
        const url = '/api/v1/profile/update'
        const config = {
            headers : {
                "Content-Type" : "multipart/form-data"
            }
        }
        const {data} = await axios.put(url,formData,config);
        dispatch({type: UPDATE_PROFILE_SUCCESS, payload: data.success})
    }
    catch(err){
        dispatch({
            type: UPDATE_PROFILE_FAIL, 
            payload : err.response.data.message
        })
    }
}

export const updatePassword = (pass)=>async(dispatch)=>{
    try{
        dispatch({type: UPDATE_PASSWORD_REQUEST})
        const config = {
            headers : {
                "content-type" : "application/json"
            }
        }
        const url = '/api/v1/profile/update/password'
        const {data} = await axios.put(url,pass,config)
        dispatch({type: UPDATE_PASSWORD_SUCCESS,payload: data.success})
    }
    catch(err){
        dispatch({type: UPDATE_PASSWORD_FAIL,payload:err.response.data.message})
    }
}

export const resetPassword = (pass,token)=>async(dispatch)=>{
    try{
        dispatch({type: RESET_PASSWORD_REQUEST})
        const config = {
            headers : {
                "content-type" : "application/json"
            }
        }
        const url = `/api/v1/password/reset/${token}`
        const {data} = await axios.put(url,pass,config)
        dispatch({type: RESET_PASSWORD_SUCCESS,payload: data.success})
    }
    catch(err){
        dispatch({type: RESET_PASSWORD_FAIL,payload:err.response.data.message})
    }
}

export const forgotPassword = (email) => async(dispatch)=>{
    try{
        dispatch({type: FORGET_PASSWORD_REQUEST})
        const url = '/api/v1/password/forgot'
        console.log(email)
        const config = {
            headers : {
                "content-type" : "application/json"
            }
        }
        const {data} = await axios.post(url,email,config)
        console.log(data)
        dispatch({type: FORGET_PASSWORD_SUCCESS, payload: data.message})
    }
    catch(err){
        dispatch({type: FORGET_PASSWORD_FAIL,payload:err.response.data.message})
    }
}

export const getAllUsers = ()=>async(dispatch)=>{
    try{
        dispatch({type: ALL_USER_REQUEST})
        const url = '/api/v1/admin/users';
        const {data} = await axios.get(url)
        // console.log(data)
        dispatch({type: ALL_USER_SUCCESS, payload: data.users})
    }
    catch(error){
        dispatch({type:ALL_USER_FAIL, payload: error.response.data.message})
    }
}

export const getUserDetails = (id) =>async(dispatch)=>{
    try{
        dispatch({type: USER_DETAILS_REQUEST})
        const url = `/api/v1/admin/user/${id}`;
        const {data} = await axios.get(url)
        // console.log(data)
        dispatch({type: USER_DETAILS_SUCCESS, payload: data.user})
    }
    catch(error){
        dispatch({type:USER_DETAILS_FAIL, payload: error.response.data.message})
    }
}

export const updateUser = (id,userData)=>async(dispatch)=>{
    try{
        dispatch({type: UPDATE_USER_REQUEST})
        const config = {
            headers : {
                "content-type" : "application/json"
            }
        }
        const url = `/api/v1/admin/user/${id}`
        const {data} = await axios.put(url,userData,config)
        dispatch({type: UPDATE_USER_SUCCESS,payload: data.success})
    }
    catch(err){
        dispatch({type: UPDATE_USER_FAIL,payload:err.response.data.message})
    }
}

export const deleteUser = (id)=>async(dispatch)=>{
    try{
        dispatch({type: DELETE_USER_REQUEST})
        const url = `/api/v1/admin/user/${id}`
        const {data} = await axios.delete(url)
        dispatch({type: DELETE_USER_SUCCESS,payload: data})
    }
    catch(err){
        dispatch({type: DELETE_USER_FAIL,payload:err.response.data.message})
    }
}


export const clearErrors = () => async(dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}