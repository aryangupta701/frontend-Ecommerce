import './ResetPassword.css'
import "./UpdatePassword.css"
import Loader from "../loader/Loader"
import React, { Fragment, useEffect,useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useAlert } from "react-alert"
import { clearErrors, resetPassword } from "../../actions/userActions"
import { MdLock, MdLockOpen, MdVpnKey } from "react-icons/md"
import MetaData from "../layout/MetaData"
import { useNavigate, useParams } from "react-router-dom"
 
 const ResetPassword = () => {
   const dispatch = useDispatch()
   const alert = useAlert()
   const navigate = useNavigate()

   const {loading,error,success} = useSelector(state=>state.forgotPassword)

   const [passwords,setPasswords] = useState({
    password : "",
    confirmPassword : "",
   })
   const token = useParams().token
  //  console.log(token)
   const resetPasswordSubmit = (e)=>{
     e.preventDefault()
     dispatch(resetPassword(passwords,token))
   }
   const handleChange = (e) => {
    setPasswords(prev => {
        return {
            ...prev, 
            [e.target.name] : e.target.value
        }
    })
   }
   useEffect(()=>{
    if(error){
        alert.error(error)
        dispatch(clearErrors())
    }
    if(success){
        alert.success("Password Updated Successfully")
        navigate("/login")
    }
   },[dispatch,alert,error,success])

   return (
       <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Reset Password</h2>

              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div className="loginPassword">
                  <MdLockOpen />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    name="password"
                    value={passwords.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="loginPassword">
                  <MdLock />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={passwords.confirmPassword}
                    name="confirmPassword"
                    onChange={handleChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
 }
 
 export default ResetPassword