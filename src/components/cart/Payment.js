import './Payment.css'
import React, { Fragment, useEffect, useRef } from 'react'
import {CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements} from '@stripe/react-stripe-js'
import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'
import { Typography } from '@mui/material'
import { BiCreditCard } from 'react-icons/bi'
import { MdEvent, MdVpnKey } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { clearErrors, createOrder } from '../../actions/orderActions'

const Payment = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo') )
    const elements = useElements()
    const dispatch = useDispatch()
    const alert = useAlert()
    const {shippingInfo, cartItems} = useSelector(state => state.cart)
    const {user} = useSelector(state => state.user)
    const {error} = useSelector(state => state.newOrder) 
    const stripe = useStripe()
    const payBtn = useRef(null)
    const navigate = useNavigate()

    const paymentData = {
        amount : Math.round(orderInfo.totalPrice*100)
    }
    
    const order = {
      shippingInfo,
      orderItems: cartItems,
      itemsPrice: orderInfo.subtotal,
      taxPrice: orderInfo.tax,
      shippingPrice: orderInfo.shippingCharges,
      totalPrice: orderInfo.totalPrice,
    };
  
    const submitHandler = async(e) => {
        e.preventDefault()
        payBtn.current.disabled = true        
        try{    
            const config = {headers:{ "Content-Type": "application/json"}}
            const {data} = await axios.post("/api/v1/payment/process" , paymentData, config)
            const client_secret = data.client_secret
            if(!stripe || !elements){
                return ;
              }
            // console.log(client_secret)
            const result = await stripe.confirmCardPayment(client_secret, {
              payment_method: {
                card: elements.getElement(CardNumberElement),
                billing_details: {
                  name: user.name,
                  email: user.email,
                  address: {
                    line1: shippingInfo.address,
                    city: shippingInfo.city,
                    state: shippingInfo.state,
                    postal_code: shippingInfo.pinCode,
                    country: shippingInfo.country,
                  },
                },
              },
            });

              // console.log(result)
            if(result.error){
                payBtn.current.disabled = false
                alert.error(result.error.message)
                return;
            }
            if(result.paymentIntent.status === "succeeded"){
                order.paymentInfo = {
                  id: result.paymentIntent.id,
                  status: result.paymentIntent.status,
                };
                // console.log(order)
                dispatch(createOrder(order));

                navigate("/success")
            }

        }catch(err){
            payBtn.current.disabled = false
            console.log(err)
        }
    }

    useEffect(()=>{
      if(error){
        alert.error(error)
        dispatch(clearErrors())
      }
    }, [error,alert,dispatch])

  return (
    
    <Fragment>
    <MetaData title="Payment" />
    <CheckoutSteps activeStep={2} />
    <div className="paymentContainer">
      <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
        <Typography>Card Info</Typography>
        <div>
          <BiCreditCard />
          <CardNumberElement className="paymentInput" />
        </div>
        <div>
          <MdEvent />
          <CardExpiryElement className="paymentInput" />
        </div>
        <div>
          <MdVpnKey />
          <CardCvcElement className="paymentInput" />
        </div>

        <input
          type="submit"
          value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
          ref={payBtn}
          className="paymentFormBtn"
        />
      </form>
    </div>
  </Fragment>
  )
}

export default Payment