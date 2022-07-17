import React, { Fragment, useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import {useSelector, useDispatch} from 'react-redux'
import './ProductDetails.css'
import {clearErrors, getProductDetails, newReview} from '../../actions/productActions'
import { useParams } from 'react-router-dom'
import ReviewCard from './ReviewCard.js'
import Loader from '../layout/loader/Loader'
import {useAlert} from 'react-alert'
import MetaData from '../layout/MetaData'
import { addItemsToCart } from '../../actions/cartActions'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Rating
} from '@mui/material'
import { NEW_REVIEW_RESET } from '../../constants/productConstant'

const ProductDetails = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const {id} = useParams()
    const {product,loading,error} = useSelector(state => state.productDetails)
    const {isAuthenticated,user} = useSelector(state => state.user)
    const[quantity, setQuantity] = useState(1)
    const[open, setOpen] = useState(false)
    const[rating, setRating] = useState(0)
    const [comment, setComment] = useState("")
    const {success, error: reviewError} = useSelector(state=> state.newReview)

    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch(clearErrors()) 
        }
        if(reviewError){
            alert.error(reviewError)
            dispatch(clearErrors()) 
        }
        if(success){
            alert.success("Review Submitted Successfully")
            dispatch({type: NEW_REVIEW_RESET})
        }
        dispatch(getProductDetails(id))
    },[dispatch,id,alert,error,reviewError,success])
    // console.log(id)
    const submitReviewToggle = ()=>{
        setOpen(prev => !prev )
    }
    const reviewSubmitHandler = ()=>{
        const data = {
            productId : id, 
            rating, 
            comment,
            user
        }
        dispatch(newReview(data))
        submitReviewToggle()
    }
    const stars = {
        value:product && product.ratings,
        precision: 0.5,
        size : "large",
        readOnly: true
    }
    // console.log(product.reviews)
    const decreaseQuantity = ()=>{
        if(quantity<=1) return ;
        setQuantity(prev => prev-1)
    }
    const increaseQuantity = ()=>{
        if(product.stock <= quantity) return;
        setQuantity(prev => prev+1)
    }
    const addToCart = ()=>{
        if(!isAuthenticated)
        {
            alert.error("Please Login to Add to Cart")
            return
        }
        const prod = {  
            id,
            quantity
        }
        dispatch(addItemsToCart(prod))
        alert.success("Product Added to Cart Successfully")
    }
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
                        <Rating {...stars} />
                        <span className="detailsBlock-2-span">
                            {" "}
                            ({product.numOfReviews} Reviews)
                        </span>
                    </div>
                    <div className='details-block-three'>
                        <h1>{`₹${product.price}`}</h1>
                        <div className='details-block-three-one'>
                            <div className='details-block-three-one-one'>
                                <button onClick={decreaseQuantity}>-</button>
                                <input readOnly value={quantity} type="text"/>
                                <button onClick={increaseQuantity}>+</button>
                            </div>
                            {" "}<button disable={product.stock<1?true:false} className='add-to-cart-button' onClick={addToCart}>Add to Cart</button>
                        </div>
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
                        <button onClick={submitReviewToggle} className='submit-button'>Submit Review</button>
                </div>
            </div>

            <div className='reviewsHeading'>Reviews</div>
                <Dialog
                aria-labelledby="simple-dialog-title"
                open={open}
                onClose={submitReviewToggle}
                >
                <DialogTitle>Submit Review</DialogTitle>
                <DialogContent className="submitDialog">
                <Rating
                    onChange={(e) => setRating(e.target.value)}
                    value={rating}
                    size="large"
                />

                <textarea
                    className="submitDialogTextArea"
                    cols="30"
                    rows="5"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>
                </DialogContent>
                <DialogActions>
                <Button onClick={submitReviewToggle} color="secondary">
                    Cancel
                </Button>
                <Button onClick={reviewSubmitHandler} color="primary">
                    Submit
                </Button>
                </DialogActions>
            </Dialog>
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