import React from 'react';
import MainLayoutWrapper from '../MainLayoutWrapper';
import { Image } from 'react-bootstrap';
import successLogo from '../../images/success.jpg';
import { createStructuredSelector } from 'reselect';
import { selectCharge } from '../../selectors/productSelectors';
import { connect } from 'react-redux';
import './styles.css';

function PurchaseSuccessPage(props) {
  return (
    <MainLayoutWrapper pageHeading={'Success'}
                       pageInfoHeading={'Success!'}>
      <div className={'center m-tb'}>
        <Image src={successLogo} alt="Success" fluid={true} className={'m-tb'}/>
        <div>Your order ID is: <strong>{props.charge.orderId.toUpperCase()}</strong></div>
        <div>Your payment ref is: <strong>{props.charge.paymentRef}</strong></div>
      </div>
    </MainLayoutWrapper>
  );
}

const mapStateToProps = createStructuredSelector({
  charge: selectCharge,
});

export default connect(mapStateToProps)(PurchaseSuccessPage);
