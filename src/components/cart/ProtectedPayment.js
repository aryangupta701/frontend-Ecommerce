import { Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from './Payment';
import React, { useState } from 'react'

const ProtectedPayment = ({stripeKey}) => {

  return (
    <Elements stripe={loadStripe(stripeKey)} >
        <Payment />
    </Elements>
  )
}

export default ProtectedPayment