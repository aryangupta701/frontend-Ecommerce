import axios from 'axios'
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
    UPDATE_PASSWORD_RESET,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_REQUEST,
    FORGET_PASSWORD_FAIL,
    FORGET_PASSWORD_REQUEST,
    FORGET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_REQUEST
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
        dispatch({type: LOGIN_SUCCESS, payload: data})
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

export const clearErrors = () => async(dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}