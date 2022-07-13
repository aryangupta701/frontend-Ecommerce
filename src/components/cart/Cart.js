import { Typography } from '@mui/material'
import React, { Fragment } from 'react'
import { useAlert } from 'react-alert'
import { MdRemoveShoppingCart, MdShoppingBasket } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { addItemsToCart, removeCartItem } from '../../actions/cartActions'
import './Cart.css'
import CartItemCard from './CartItemCard.js'

const Cart = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()
    const {cartItems} = useSelector(state => state.cart)
    const deleteItem = (id)=>{
        dispatch(removeCartItem(id))
        alert.success("Removed Item Successfully")
    }
    const decreaseQuantity = (id,quantity,stock) => {
        if(quantity == 1){
            return ;
        } 
        dispatch(addItemsToCart({id,quantity: quantity-1}))
    }
    const increaseQuantity = (id,quantity,stock) => {
        if(quantity == stock) {
            alert.success("Order Limit Reached !!")
            return ;
        } 
        dispatch(addItemsToCart({id,quantity: quantity+1}))
    }
    const checkoutHandler = ()=>{
        navigate('/login?redirect=shipping')
    }

  return (<Fragment>{
    cartItems.length === 0 ? 
    <div className='emptyCart'> 
        <MdRemoveShoppingCart />
        <Typography>No Product in Your Cart</Typography>
        <Link to="/products">View Products</Link>
    </div>:
    <Fragment>
        <div className='cartPage'>
            <div className='cartHeader'>
                <p>Product</p>
                <p>Quantity</p>
                <p>Subtotal</p>
            </div>
            {cartItems && cartItems.map(item => {
                return (
                    <div className='cartContainer' key={item.id}>
                        <CartItemCard 
                            item={item}  
                            deleteCartItems = {()=>deleteItem(item.id)}
                        />
                        <div className='cartInput'>
                            <button onClick ={()=>{decreaseQuantity(item.id,item.quantity,item.stock)}}>-</button>
                            <input type="number" value={item.quantity} readOnly />
                            <button onClick ={()=>{increaseQuantity(item.id,item.quantity,item.stock)}}>+</button>
                        </div>
                        <p className="cartSubtotal">{`₹${item.price * item.quantity}`}</p>
                    </div>
                )
            })
            }
            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
            </div>
        </div>
    </Fragment>
    }</Fragment>)
}

export default Cart