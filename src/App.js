import './App.css';
import Header from './components/layout/Header/Header.js';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import webfont from 'webfontloader'
import React, { useState } from 'react'
import Footer from './components/layout/Footer/Footer.js';
import './components/layout/Footer/Footer.css'
import ProductDetails from './components/Product/ProductDetails.js'
import Home from './components/Home/Home.js'
import Products from './components/Product/Products.js'
import Search from './components/Product/Search.js'
import Login from './components/user/Login.js'
import Profile from './components/user/Profile.js'
import store from './store'
import { loadUser } from './actions/userActions';
import UserOptions from './components/layout/Header/UserOptions.js'
import { useSelector } from 'react-redux';
import EditProfile from './components/user/EditProfile.js'
import UpdatePassword from './components/user/UpdatePassword.js'
import ForgotPassword from './components/user/ForgotPassword.js'
import ResetPassword from './components/user/ResetPassword.js'
import Cart from './components/cart/Cart.js'
import Shipping from './components/cart/Shipping.js'
import ConfirmOrder from './components/cart/ConfirmOrder.js'
import axios from 'axios';
import Payment from './components/cart/Payment.js'
import ProtectedPayment from './components/cart/ProtectedPayment.js'
import Success from './components/cart/Success.js'
import MyOrders from './components/Order/MyOrders.js'
import OrderDetails from './components/Order/OrderDetails.js'
import ProtectedRoute from './components/routes/ProtectedRoute';
import AdminDashBoard from './components/admin/AdminDashBoard.js';

function App() {
  // localStorage.clear()
  const [stripeApiKey, setStripeApiKey] = useState("")
  async function getStripeApiKey(){
    const {data} = await axios.get('/api/v1/stripeApiKey')
    setStripeApiKey(`${data.stripeApiKey}`)
  }
  React.useEffect(()=>{
    webfont.load({
      google :{
        families : ['Roboto' , 'Droid Sans' , 'Chilanka']
      }
    })
    store.dispatch(loadUser())
    getStripeApiKey()
  }, [store.dispatch])
  // console.log(stripeApiKey)
  const {isAuthenticated,user} = useSelector(state => state.user)
  return( 
  <Router>
    <Header />
    {isAuthenticated && <UserOptions /> }
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/product/:id" element={<ProductDetails />} />
      <Route exact path="/products" element={<Products />} />
      <Route path="/products/:keyword" element={<Products />} />
      <Route exact path="/search" element={<Search />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/password/reset/:token" element={<ResetPassword />} />
      <Route exact path="/password/forgot" element={<ForgotPassword />} />
      <Route exact path="/cart" element={<Cart />} />
      <Route element={<ProtectedRoute  />} >
        <Route exact path="/account" element={<Profile />} />
        <Route exact path="/profile/update" element={<EditProfile/>}/>
        <Route exact path="/password/update" element={<UpdatePassword />}/>
        <Route exact path="/shipping" element={<Shipping />}/>
        <Route exact path="/order/confirm" element={<ConfirmOrder />}/>
        <Route exact path="/success" element={<Success />}/>
        <Route exact path="/orders" element={<MyOrders />}/>
        <Route exact path="/order/:id" element={<OrderDetails />}/>
        <Route exact path="/admin/dashboard" element={<AdminDashBoard />}/>
        <Route exact path="/process/payment" element={<ProtectedPayment stripeKey={stripeApiKey}/>}/>
      </Route>
    
    </Routes>
    <Footer />
   </Router> 
  ) ;
}

export default App;
