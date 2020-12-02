import React from 'react';
import MainLayoutWrapper from '../MainLayoutWrapper';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm/index';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  'pk_test_51HtcTCEHNNONHrbNxm3Sac8tF3uAqjaH4ZCuZkP1yZi6MXBEGpsxhl5GvPaUl15dma3xNQ9k9AV4lu0oVItLSNUf00YPqoOV4u');

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
