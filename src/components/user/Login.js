import React, { Fragment, useRef,useState } from 'react'
import { MdFace, MdLockOpen, MdMailOutline } from 'react-icons/md'
import { Link } from 'react-router-dom'
import Loader from '../loader/Loader'
import './Login.css'
const Login = () => {
    const [loginEmail, setLoginEmail] = useState()
    const [loginPassword, setLoginPassword] = useState()
    const [user,setUser] = useState({
        name : "",
        email : "",
        password : ""
    })
    const [avatar,setAvatar] = useState()
    const [avatarPreview,setAvatarPreview] = useState("/profile.png")

    const {name,email,password} = user

    const switcherTab = useRef(null)
    const registerTab = useRef(null)
    const loginTab = useRef(null)
    const registerSubmit =(event)=>{
        event.preventDefault()
        const myForm = new FormData()
        myForm.set("name",name)
        myForm.set("email",email)
        myForm.set("password",password)
        myForm.set("avatar",avatar)
    }
    const registerDataChange =(e)=>{
        if(e.target.name === "avatar"){
            const reader = new FileReader()
            reader.onload = ()=>{
                if(reader.readyState === 2){
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }else{
            setUser(prev => {
                return {
                    ...prev, 
                    [e.target.name] : e.target.value
                }
            })
        }
    }
    const loginSubmit = (event)=>{
        event.preventDefault()
    }
    const switchTabs = (e,type) => {
        if(type === "Login"){
            switcherTab.current.classList.add("shiftToNeutral")
            switcherTab.current.classList.remove("shiftToRight")
            registerTab.current.classList.remove("shiftToNeutralForm")
            loginTab.current.classList.remove("shiftToLeft")
        }
        if(type === "Register"){
            switcherTab.current.classList.remove("shiftToNeutral")
            switcherTab.current.classList.add("shiftToRight")
            registerTab.current.classList.add("shiftToNeutralForm")
            loginTab.current.classList.add("shiftToLeft")
        }
    }
  return (
    <Fragment>
        <div className='LoginSignUpContainer'>
            <div className='LoginSignUpBox'>
                <div>
                    <div className='login_signUp_toggle'>
                        <p onClick={e => switchTabs(e,"Login")}>Login</p>
                        <p onClick={e => switchTabs(e,"Register")}>Register</p>
                    </div>
                    <button ref={switcherTab}></button>
                </div>
                <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                    <div className='loginEmail'>
                        <MdMailOutline />
                        <input type='email'
                            required
                            placeholder='Email'
                            value={loginEmail}
                            onChange = {e=> setLoginEmail(e.target.value)}
                        />
                    </div>
                    <div className='loginPassword'>
                        <MdLockOpen />
                        <input 
                            required
                            placeholder='Password'
                            type ="password"
                            value={loginPassword}
                            onChange={e=>setLoginPassword(e.target.value)}
                        />
                    </div>
                    <Link to='/password/forget'>Forgot Password ?</Link>
                    <input type="submit" value="Login" className="loginBtn" />
                </form>
                
                <form className='signUpForm' ref={registerTab} onSubmit={registerSubmit} 
                    encType="multipart/form-data">
                    <div className='signUpName'>
                        <MdFace/>
                        <input 
                            type="text"
                            placeholder='Name'
                            required
                            value={name}
                            onChange={registerDataChange}
                        />
                    </div>
                    <div className='signUpEmail'>
                        <MdMailOutline />
                        <input type='email'
                            required
                            placeholder='Email'
                            value={email}
                            onChange = {registerDataChange}
                        />
                    </div>
                    <div className='signUpPassword'>
                        <MdLockOpen />
                        <input 
                            required
                            placeholder='Password'
                            type ="password"
                            value={password}
                            onChange={registerDataChange}
                        />
                    </div>
                    <div id="registerImage">
                        <img src={avatarPreview} alt="avatar" />
                        <input 
                            type="file"
                            accept='image/*'
                            name="avatar"
                            onChange={registerDataChange}
                        />
                    </div>
                    <input type="submit" value="Register" className="signUpBtn"
                    // disabled ={loading ? true : false} 
                    />
                </form>
            </div>
        </div>
    </Fragment>
  )
}

export default Login