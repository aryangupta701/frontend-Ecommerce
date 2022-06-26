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
    LOGOUT_USER_SUCCESS
 } from "../constants/userConstant"

export const userReducer = (state={user:{}},action) =>{
    switch(action.type){
        case LOGIN_REQUEST:
        case SIGNUP_REQUEST:
        case LOAD_USER_REQUEST: {
            return {
                loading : true,
                isAuthenticated : false
            }
        }
        case LOGIN_SUCCESS :
        case SIGNUP_SUCCESS:
        case LOAD_USER_SUCCESS: {
            return {
                ...state,
                loading : false,
                isAuthenticated : true,
                user: action.payload
            }
        }
        case LOGIN_FAIL : 
        case SIGNUP_FAIL : 
            return {
                ...state,
                loading : false,
                isAuthenticated : false,
                user: null,
                error :action.payload
            }
        
        case LOGOUT_USER_SUCCESS: 
        return {
            loading: false,
            user: null, 
            isAuthenticated: false
        }

        case LOGOUT_USER_FAIL: 
        return {
            ...state, 
            loading: false,
            error : action.payload
        }
        case LOAD_USER_FAIL: {
            return {
                loading : false,
                isAuthenticated : false,
                user: null,
                error :action.payload
            }
        }
        case CLEAR_ERRORS:
                return {
                    ...state,
                    error : null
                }

        default:  return state
    }
}