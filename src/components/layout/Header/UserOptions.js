import React, { Fragment, useState } from 'react'
import {SpeedDial,SpeedDialAction,speedDialAction} from '@material-ui/lab'
import { GoDashboard } from 'react-icons/go'
import { BsPerson } from 'react-icons/bs'
import { MdExitToApp } from 'react-icons/md'
import './Header.css'
import { FaListAlt } from 'react-icons/fa'
import { useNavigate} from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch } from 'react-redux'
import {logout} from '../../../actions/userActions'
import Backdrop from '@material-ui/core/Backdrop'
const UserOptions = ({user}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const alert = useAlert()
    function dashboard(){
      navigate('/dashboard')
    }
    function orders(){
      navigate('/orders')
    }
    function account(){
      navigate('/account')
    }
    function logoutUser(){
      // navigate('/home')
      dispatch(logout())
      alert.success("Logout Successfully")
    }
    const [open, setOpen] = useState(false)
    const options = [
      {icon: <FaListAlt/>, name:"orders" , func: orders},
      {icon: <BsPerson/>, name:"Profile" , func: account},
      {icon: <MdExitToApp />, name:"Logout" , func: logoutUser}
    ]
    if(user.role == "admin"){
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