import "./UpdatePassword.css"
import Loader from "../loader/Loader"
import React, { Fragment, useEffect,useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useAlert } from "react-alert"
import { clearErrors, updatePassword } from "../../actions/userActions"
import { MdLock, MdLockOpen, MdVpnKey } from "react-icons/md"
import MetaData from "../layout/MetaData"
import { useNavigate } from "react-router-dom"
 
 const UpdatePassword = () => {
   const dispatch = useDispatch()
   const alert = useAlert()
   const navigate = useNavigate()

   const {loading,error,isUpdated} = useSelector(state=>state.profile)

   const [passwords,setPasswords] = useState({
    newPassword : "",
    confirmPassword : "",
    oldPassword : ""
   })
   const updatePasswordSubmit = (e)=>{
     e.preventDefault()
     dispatch(updatePassword(passwords))
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
    if(isUpdated){
        alert.success("Password Changed Successfully")
        navigate("/account")
    }
   },[dispatch,alert,error,isUpdated])

   return (
       <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Profile</h2>

              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <MdVpnKey />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    name="oldPassword"
                    value={passwords.oldPassword}
                    onChange={handleChange}
                  />
                </div>

                <div className="loginPassword">
                  <MdLockOpen />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    name="newPassword"
                    value={passwords.newPassword}
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
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
 }
 
 export default UpdatePassword