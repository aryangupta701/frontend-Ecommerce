import React, { Fragment, useEffect } from 'react'
import Carousel from 'react-material-ui-carousel'
import {useSelector, useDispatch} from 'react-redux'
import './ProductDetails.css'
import {getProductDetails} from '../../actions/productActions'
import { useParams } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'

const ProductDetails = ({match}) => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const {product,loading,error} = useSelector(state => state.productDetails)
    useEffect(()=>{
        dispatch(getProductDetails(id))
    },[dispatch,id])
    // console.log(id)
    const stars = {
        edit : false, 
        color : "rgba(20,20,20,0,1)",
        activeColor: "tomato",
        value:product && product.ratings,
        isHalf: true,
        size : window.innerWidth < 600 ? 20 : 25
    }
    return (
     <Fragment>
        {product && 
        <Fragment>
            <div className='productDetails'>
                <div>
                    <Carousel>
                        {product && product.images &&
                        product.images.map((item,i)=>{
                            return <img 
                            className='carousel-img'
                            key = {item.URL}
                            src = {item.URL}
                            alt = {`${i} image`} />
                        })
                        }   
                    </Carousel>
                </div>
                <div>
                    <div className='details-block-one'>
                        <h2>{product.name}</h2>
                        <p>Product #{product._id}</p>
                    </div>
                    <div className='details-block-two'>
                        <ReactStars {...stars} />
                        <span className="detailsBlock-2-span">
                            {" "}
                            ({product.numOfReviews} Reviews)
                        </span>
                    </div>
                    <div className='details-block-three'>
                        <h1>{`₹${product.price}`}</h1>
                        <div className='details-block-three-one'>
                            <div className='details-block-three-one-one'>
                                <button>-</button>
                                <input value="1" type="number"/>
                                <button>+</button>
                            </div>
                            {" "}<button className='add-to-cart-button'>Add to Cart</button>
                            <p>
                                Status:{" "}
                                <b className={product.stock < 1 ? 'redColor' : 'greenColor'}>
                                    {product.stock<1 ? "OutOfStock" : "InStock"}
                                </b>
                            </p>
                        </div>
                        <div className='details-block-four'>
                            Description : <p>{product.description}</p>
                        </div>
                        <button className='submit-button'>Submit Review</button>
                    </div>
                </div>
            </div>
        </Fragment>
        }
    </Fragment>
                    
  )
}

export default ProductDetails