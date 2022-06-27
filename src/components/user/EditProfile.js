import React, { Fragment,useState,useEffect } from 'react'
import { MdFace, MdMailOutline } from 'react-icons/md'
import { Link ,useNavigate} from 'react-router-dom'
import Loader from '../loader/Loader'
import './UpdateProfile.css'
import {useDispatch,useSelector} from 'react-redux'
import { updateProfile , clearErrors, loadUser} from '../../actions/userActions'
import {useAlert} from 'react-alert'
import { UPDATE_PROFILE_RESET } from '../../constants/userConstant'

const EditProfile = () => {
    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {user} = useSelector(state => state.user)
    const [avatar,setAvatar] = useState()
    const [avatarPreview,setAvatarPreview] = useState("/profile.png")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const {error,isUpdated,loading}  = useSelector(state=>state.profile)

    const registerDataChange =(e)=>{
        const reader = new FileReader()
        reader.onload = ()=>{
            if(reader.readyState === 2){
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    const registerSubmit =(event)=>{
        event.preventDefault()
        const myForm = new FormData()
        myForm.set("name",name)
        myForm.set("email",email)
        myForm.set("avatar",avatar)
        dispatch(register(myForm))
    }

    useEffect(() => {
        if(user){
            setName(user.name)
            setEmail(user.email)
            setAvatarPreview(user.avatar.URL)
        }
        if(error){
          alert.error(error)
          dispatch(clearErrors())
        }
        if(isUpdated){
            alert.success("Profile Updated Successfully")
            dispatch(loadUser())
            navigate('/account')
            dispatch({type: UPDATE_PROFILE_RESET})
        }
      }, [error,dispatch,alert,isUpdated,navigate])

  return (
    <div>EditProfile</div>
  )
}

export default EditProfile