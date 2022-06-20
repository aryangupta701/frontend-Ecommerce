import React, { Fragment, useEffect } from 'react'
import Carousel from 'react-material-ui-carousel'
import {useSelector, useDispatch} from 'react-redux'
import './ProductDetails.css'
import {getProductDetails} from '../../actions/productActions'
import { useParams } from 'react-router-dom'

const ProductDetails = ({match}) => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const {product} = useSelector(state => state.productDetails)
    useEffect(()=>{
        dispatch(getProductDetails(id))
    },[dispatch,id])
    console.log(id)
    return (
        <Fragment>
            <div className='productDetails'>
                <div>
                    <Carousel>
                        {product && product.images &&
                        product.images.map((item,i)=>{
                            <img 
                            className='carousel-img'
                            key = {item.url}
                            src = {item.url}
                            alt = {`${i} image`} />
                        })
                        }   
                    </Carousel>
                </div>
            </div>
        </Fragment>
  )
}

export default ProductDetails