import { Rating } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'


const ProductCard = ({product}) => {
    const stars = {
        value:product.ratings,
        precision: 0.5,
        size : "large",
        readOnly: true
    }

  return (
    <Link className='productCard' to={`/product/${product._id}`}>
        <img src={product.images[0].URL} alt={product.name} />
        <p>{product.name}</p>
        <div> 
            <Rating {...stars} />
            <span className='productCardSpan'>({product.numOfReviews} Reviews)</span>
        </div>
        <span>{`₹${product.price}`}</span>
    </Link>
  )
}

export default ProductCard