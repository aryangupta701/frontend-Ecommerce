import React, { Fragment, useEffect } from 'react'
import {CgMouse} from 'react-icons/all'
import './Home.css'
import Product from './Product.js'
import MetaData from '../layout/MetaData'
import { getProduct } from '../../actions/productActions'
import { useSelector, useDispatch } from 'react-redux'
const Home = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getProduct())
    },[])
    const prod = {
        name: "shoes",
        images : [{
            url: "https://imgs.search.brave.com/AHMsxuX41nEX07UUSviq2j8ErAwqhyV1jKJwNVfryB8/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5S/VnQwc0pka0ppYmhh/ektyT21UVUVBSGFI/YSZwaWQ9QXBp"
        }],
        price: "1000",
        _id: "asgasg",
        rating : 4
    }
  return (
    <Fragment>
        <MetaData title="Ecommerce" />
        <div className="banner">
            <p>Welcome To Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href='#container'>
                <button>
                    Scroll <CgMouse />
                </button>
            </a>
        </div>
        <h2 className='homeHeading'> Featured Products</h2>
        <div className='container' id='container'> 
            <Product product={prod}/>
            <Product product={prod}/>
            <Product product={prod}/>
            <Product product={prod}/>
            <Product product={prod}/>
            <Product product={prod}/>
            <Product product={prod}/>
            <Product product={prod}/>
        </div>
    </Fragment>
  )
}

export default Home