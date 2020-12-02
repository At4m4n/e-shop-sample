import React from 'react';
import MainLayoutWrapper from '../MainLayoutWrapper';
import {Container,  Image } from 'react-bootstrap';
import successLogo from '../../images/success.png';
import { createStructuredSelector } from 'reselect';
import { selectCharge } from '../../store/selectors/productSelectors';
import { connect } from 'react-redux';
import './styles.css'

function PurchaseSuccessPage(props) {
  return (
    <MainLayoutWrapper pageHeading={'Success'}
                       pageInfoHeading={'Success!'}>
      <Container className={'center'}>
      <Image src={successLogo} alt="Success"/>
      <div>Your order ID is {props.charge.orderId}</div>
      <div>Your payment ref is {props.charge.id}</div>
      </Container>
    </MainLayoutWrapper>
  );
}

const mapStateToProps = createStructuredSelector({
  charge: selectCharge,
});

export default connect(mapStateToProps)(PurchaseSuccessPage);
