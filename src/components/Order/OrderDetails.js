import React, { useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { clearErrors, orderDetails } from '../../actions/orderActions'
import './OrderDeatils.css'

const OrderDetails = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const alert = useAlert()
    const params = useParams()

    const {loading,order,error} = useSelector(state=>state.orderDetails)
    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(orderDetails(params.id))
    }, [error,alert,dispatch])
    

    return (
    <div>OrderDetails</div>
  )
}

export default OrderDetails