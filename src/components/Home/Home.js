import React, { Fragment, useEffect } from 'react'
import {CgMouse} from 'react-icons/all'
import './Home.css'
import ProductCard from './ProductCard.js'
import MetaData from '../layout/MetaData'
import { clearErrors, getProduct } from '../../actions/productActions'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../loader/Loader'
import {useAlert} from 'react-alert'

const Home = () => {
    const alert = useAlert()
    const dispatch = useDispatch()
    const {products,error,loading,productCount} = useSelector(state => state.products)
    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch(clearErrors()) 
        }
        dispatch(getProduct())
    },[dispatch,error,alert])
    // console.log(products)
   return (
    <Fragment>
        {
            loading ? <Loader /> : 
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
                    {products && products.map(item => <ProductCard product ={item} key={item._id}/>) }
                </div>
            </Fragment>
        }
    </Fragment>
  )
}

export default Home