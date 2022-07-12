import './App.css';
import Header from './components/layout/Header/Header.js';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import webfont from 'webfontloader'
import React from 'react'
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

function App() {
  React.useEffect(()=>{
    webfont.load({
      google :{
        families : ['Roboto' , 'Droid Sans' , 'Chilanka']
      }
    })
    store.dispatch(loadUser())
  }, [store.dispatch])
  const {isAuthenticated,user} = useSelector(state => state.user)
  return( 
  <Router>
    <Header />
    {isAuthenticated && <UserOptions user={user}/> }
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
      {isAuthenticated && <Route exact path="/account" element={<Profile />} />}
      {isAuthenticated && <Route exact path="/profile/update" element={<EditProfile/>}/>}
      {isAuthenticated && <Route exact path="/password/update" element={<UpdatePassword />}/>}
      
    </Routes>
    <Footer />
   </Router> 
  ) ;
}

export default App;
