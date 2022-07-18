import React, { Fragment, useState } from 'react'
import {SpeedDial,SpeedDialAction} from '@material-ui/lab'
import { GoDashboard } from 'react-icons/go'
import { BsPerson } from 'react-icons/bs'
import { MdExitToApp, MdShoppingCart } from 'react-icons/md'
import './Header.css'
import { FaListAlt } from 'react-icons/fa'
import { useNavigate} from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import {logout} from '../../../actions/userActions'
import Backdrop from '@material-ui/core/Backdrop'
const UserOptions = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {cartItems} = useSelector(state=> state.cart)
    const {user} = useSelector(state => state.user)
    const alert = useAlert()
    function dashboard(){
      navigate('/admin/dashboard')
    }
    function orders(){
      navigate('/orders')
    }
    function account(){
      navigate('/account')
    }
    function cart(){
      navigate('/cart')
    }
    function logoutUser(){
      navigate('/')
      dispatch(logout())
      alert.success("Logout Successfully")
    }
    const [open, setOpen] = useState(false)
    const options = [
      {icon: <FaListAlt/>, name:"orders" , func: orders},
      {icon: <BsPerson/>, name:"Profile" , func: account},
      {icon: <MdShoppingCart style={{color: cartItems.length>0 ? "tomato" : "unset"}}/>, name:`Cart (${cartItems.length})` , func: cart},
      {icon: <MdExitToApp />, name:"Logout" , func: logoutUser}
    ]
    if(user.role === "admin"){
      options.unshift({icon: <GoDashboard/>, name:"Dashboard" , func: dashboard})
    }
    // console.log(user.avatar.URL)
  return (
    <Fragment>
          <Backdrop open={open} style={{zIndex:"10"}}/>
          <SpeedDial
              ariaLabel="SpeedDial tooltip example"
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              style={{ zIndex: "11" }}
              open={open}
              direction="down"
              className="speedDial"
              icon={
                <img
                  className="speedDialIcon"
                  src={user.avatar.URL ? user.avatar.URL : "/profile.png"}
                  alt="Profile"
                />
              }
            >
           {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
        </SpeedDial>
    </Fragment>
  )
}

export default UserOptions