import React from 'react'
import ReactStars from 'react-rating-stars-component'
import profilePicture from '../../images/Profile.png'

const ReviewCard = ({review}) => {
    const stars = {
        edit : false, 
        color : "rgba(20,20,20,0,1)",
        activeColor: "tomato",
        value:review.rating,
        isHalf: true,
        size : window.innerWidth < 600 ? 20 : 25
    }
    console.log(review.rating)

  return (
    <div className='reviewCard'>
        <img src={profilePicture} alt='user' />
        <p>{review.name}</p>
        <ReactStars {...stars} />
        <span>{review.comment}</span>
    </div>
  )
}

export default ReviewCard