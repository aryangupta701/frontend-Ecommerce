import React, { Fragment, useEffect } from 'react'
import Carousel from 'react-material-ui-carousel'
import {useSelector, useDispatch} from 'react-redux'
import './ProductDetails.css'
import {clearErrors, getProductDetails} from '../../actions/productActions'
import { useParams } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import ReviewCard from './ReviewCard.js'
import Loader from './../loader/Loader'
import {useAlert} from 'react-alert'
import MetaData from '../layout/MetaData'

const ProductDetails = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const {id} = useParams()
    const {product,loading,error} = useSelector(state => state.productDetails)
    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch(clearErrors) 
        }
        dispatch(getProductDetails(id))
    },[dispatch,id,alert,error])
    // console.log(id)
    const stars = {
        edit : false, 
        color : "rgba(20,20,20,0,1)",
        activeColor: "tomato",
        value:product && product.ratings,
        isHalf: true,
        size : window.innerWidth < 600 ? 20 : 25
    }
    // console.log(product.reviews)
    return (
     <Fragment>
        {loading ? <Loader /> : 
        <Fragment>
            <MetaData title={`${product.name} -- ECOMMERCE`} />
            <div className='productDetails'>
                <div className='casousel-container'> 
                    <Carousel>
                        {product && product.images &&
                        product.images.map((item,i)=>{
                            return <img 
                            className='carousel-img'
                            key = {item.URL}
                            src = {item.URL}
                            alt = {`${i}-product`} />
                        })
                        }   
                    </Carousel>
                </div>
                <div className='details-block'>
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

            <div className='reviewsHeading'>Reviews</div>
            {
                product.reviews && product.reviews[0]? (
                <div className='review' >
                    {product.reviews.map(item => <ReviewCard review={item} />)}
                </div>):
                (<p className='noReviews'>No Reviews Yet</p>) 
            }
        </Fragment>
        }
    </Fragment>
                    
  )
}

export default ProductDetails