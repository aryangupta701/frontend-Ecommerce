import { Rating } from '@mui/material'
import React from 'react'
import profilePicture from '../../images/Profile.png'

const ReviewCard = ({review}) => {
    const stars = {
        value:review.rating,
        precision: 0.5,
        size : "large",
        readOnly: true
    }
    // console.log(review)
    // console.log(review.rating)

  return (
    <div className='reviewCard'>
        <img src={review.profile ? review.profile: profilePicture} alt='user' />
        <p>{review.name}</p>
        <Rating {...stars} />
        <span className='reviewCardComment'>{review.comment}</span>
    </div>
  )
}

export default ReviewCard