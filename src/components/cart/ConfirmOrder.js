import { Typography } from '@mui/material'
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'
import './comfirmOrder.css'
const ConfirmOrder = () => {
  const{shippingInfo , cartItems} = useSelector(state=>state.cart)
  const{user} = useSelector(state => state.user)
  const navigate = useNavigate()
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;
  const subtotal = cartItems.reduce((acc,item) => acc+item.price*item.quantity, 0)
  const tax = (subtotal * 0.18).toFixed(2)
  const shippingCharges = subtotal > 1000 ? 0 : 50
  const totalPrice = Math.round((subtotal*1.18 + shippingCharges)*1e2)/1e2
  const handleClick = ()=>{
    const data = {
      subtotal,
      tax,
      totalPrice,
      shippingCharges
    }
    sessionStorage.setItem("orderInfo", JSON.stringify(data))
    navigate('/process/payment')
  }
  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1}/>
      <div className='confirmOrderPage'>
        <div>
          <div className='confirmshippingArea'>
            <Typography>Shipping Area</Typography>
            <div className='confirmshippingAreaBox'>
              <div>
                <p>
                  Name:
                </p>
                <span>
                {user.name}
                </span>
              </div>
              <div>
                <p>
                Phone:
                </p>
                <span>
                  {shippingInfo.phoneNo}
                </span>
              </div>
              <div>
                <p> 
                 Address:
                </p>
                <span>
                  {address}  
                </span>
              </div>
            </div>
          </div>
          <div className='confirmCartItems'>
            <Typography>Your Cart Items:</Typography>
            <div className='confirmCartItemsContainer'>
              {cartItems && cartItems.map((item)=>(
                <div key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <Link to={`/product/${item.id}`} >{item.name}</Link>
                  <span>
                    {item.quantity} X ₹{item.price} = {" "} 
                    <b> ₹{item.price*item.quantity}</b>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='orderSummary'>
          <Typography>Order Summary</Typography>
          <div>
            <div>
                <p>Subtotal:</p>
                <p>₹{subtotal}</p>
            </div>
            <div>
                <p>Shipping Charges:</p>
                <p>₹{shippingCharges}</p>
            </div>
            <div>
                <p>GST:</p>
                <p>₹{tax}</p>
            </div>
          </div>
          <div className='orderSummaryTotal'>
            <p><b>Total:</b></p>
            <span>₹{totalPrice}</span>
          </div>
          <button onClick={handleClick}>Proceed To Payment</button>
        </div>
      </div>
    </Fragment>
  )
}

export default ConfirmOrder