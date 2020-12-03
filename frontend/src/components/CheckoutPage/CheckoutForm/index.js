import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { createStructuredSelector } from 'reselect';
import { selectCurrentProduct } from '../../../selectors/productSelectors';
import { connect } from 'react-redux';
import * as productActions from '../../../actions/productActions';
import './styles.css';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#292929',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
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
  const [addressDetails, setAddressDetails] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (error) {
      elements.getElement('card').focus();
      return;
    }

    if (cardComplete) {
      setProcessing(true);
    }

    const payload = await stripe.createToken(elements.getElement(CardElement), addressDetails);

    if (payload.error) {
      setError(payload.error);
    }
    else {
      props.charge({
        token: payload.token.id,
        amount: props.product.price,
        address: addressDetails.address_line1,
        city: addressDetails.address_city,
        state: addressDetails.address_state,
        zip: addressDetails.address_zip,
      });
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
            setAddressDetails({...addressDetails, address_line1: e.target.value})
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
              maxLength={20}
              onChange={(e) => {
                setAddressDetails({...addressDetails, address_city: e.target.value})
              }}
            />
            <input
              className="FormRowInput"
              id={'state'}
              type={'text'}
              placeholder={'State'}
              required={'required'}
              autoComplete={'autoComplete'}
              maxLength={20}
              onChange={(e) => {
                setAddressDetails({...addressDetails, address_state: e.target.value})
              }}
            />
            <input
              className="FormRowInput"
              id={'index'}
              type={'text'}
              placeholder={'ZIP'}
              required={'required'}
              autoComplete={'autoComplete'}
              maxLength={5}
              onChange={(e) => {
                setAddressDetails({...addressDetails, address_zip: e.target.value})
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
