import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'

const Product = ({product}) => {
    const stars = {
        edit : false, 
        color : "rgba(20,20,20,0,1)",
        activeColor: "tomato",
        value:product.ratings,
        isHalf: true,
        size : window.innerWidth < 600 ? 20 : 25
    }

  return (
    <Link className='productCard' to={`product/${product._id}`}>
        <img src={product.images[0].URL} alt={product.name} />
        <p>{product.name}</p>
        <div> 
            <ReactStars {...stars} />
            <span className='productCardSpan'>({product.numOfReviews} Reviews)</span>
        </div>
        <span>{`₹${product.price}`}</span>
    </Link>
  )
}

export default Product