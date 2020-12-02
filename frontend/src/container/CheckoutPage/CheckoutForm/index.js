import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import './styles.css';
import { createStructuredSelector } from 'reselect';
import { selectCurrentProduct } from '../../../store/selectors/productSelectors';
import { connect } from 'react-redux';
import * as productActions from '../../../store/actions/productActions';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#292929',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#fce883',
      },
      '::placeholder': {
        color: '#87bbfd',
      },
    },
    invalid: {
      iconColor: 'crimson',
      color: 'crimson',
    },
  },
};

const CardField = ({ onChange }) => (
  <div className="FormRow">
    <CardElement options={CARD_OPTIONS} onChange={onChange}/>
  </div>
);

const SubmitButton = ({ processing, error, children, disabled }) => (
  <button
    className={`SubmitButton ${error ? 'SubmitButton--error' : ''}`}
    type="submit"
    disabled={processing || disabled}
  >
    {processing ? 'Processing...' : children}
  </button>
);

const ErrorMessage = ({ children }) => (
  <div className="ErrorMessage" role="alert">
    {children}
  </div>
);

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [billingAddress, setBillingAddress] = useState({
    line1: '',
    state: '',
    city: '',
    postal_code: '',
  });
  const [billingDetails, setBillingDetails] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    if (error) {
      elements.getElement('card').focus();
      return;
    }

    if (cardComplete) {
      setProcessing(true);
    }

    setBillingDetails({ address: billingAddress });

    const payload = await stripe.createToken(elements.getElement(CardElement));



    if (payload.error) {
      setError(payload.error);
    }
    else {
      props.charge({token: payload.token.id, amount: props.product.price});
      setProcessing(false);
    }
  };

  return (
    <form className="Form" onSubmit={handleSubmit}>
      <fieldset className="FormGroup">
        <input
          className="FormRowInput"
          id={'address'}
          type={'text'}
          placeholder={'Address'}
          required={'required'}
          autoComplete={'autoComplete'}
          onChange={(e) => {
            setBillingAddress({ ...billingAddress, line1: e.target.value });
          }}
        />
        <fieldset className={'FormGroup'}>
          <div className="FormRow">
            <input
              className="FormRowInput"
              id={'city'}
              type={'text'}
              placeholder={'City'}
              required={'required'}
              autoComplete={'autoComplete'}
              onChange={(e) => {
                setBillingAddress({ ...billingAddress, city: e.target.value });
              }}
            />
            <input
              className="FormRowInput"
              id={'state'}
              type={'text'}
              placeholder={'State'}
              required={'required'}
              autoComplete={'autoComplete'}
              onChange={(e) => {
                setBillingAddress({ ...billingAddress, state: e.target.value });
              }}
            />
            <input
              className="FormRowInput"
              id={'index'}
              type={'number'}
              placeholder={'Index'}
              required={'required'}
              autoComplete={'autoComplete'}
              onChange={(e) => {
                setBillingAddress({ ...billingAddress, postal_code: e.target.value });
              }}
            />
          </div>
        </fieldset>
        <fieldset className={'card-input'}>
          <CardField
            onChange={(e) => {
              setError(e.error);
              setCardComplete(e.complete);
            }}
          />
        </fieldset>
      </fieldset>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <SubmitButton processing={processing} error={error} disabled={!stripe}>
        Pay ${props.product.price}
      </SubmitButton>
    </form>
  );
};

const mapStateToProps = createStructuredSelector({
  product: selectCurrentProduct,
});

const mapDispatchToProps = (dispatch) => ({
  charge: (request) => dispatch(productActions.chargeProductPrice(request)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
