import React from 'react';
import MainLayoutWrapper from '../MainLayoutWrapper';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm/index';
import { PUBLIC_STRIPE_API_KEY } from '../../constants/apiConstants';

const stripePromise = loadStripe(PUBLIC_STRIPE_API_KEY);

function PurchasePage() {
  return (
    <MainLayoutWrapper pageHeading={'Payment'}
                       pageInfoHeading={'Make payment:'}>
      <Elements stripe={stripePromise}>
        <CheckoutForm/>
      </Elements>
    </MainLayoutWrapper>
  );
}

export default PurchasePage;
