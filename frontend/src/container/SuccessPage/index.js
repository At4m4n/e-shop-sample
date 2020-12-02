import React from 'react';
import MainLayoutWrapper from '../MainLayoutWrapper';
import { Image } from 'react-bootstrap';
import successLogo from '../../images/success.png';
import { createStructuredSelector } from 'reselect';
import { selectCharge } from '../../store/selectors/productSelectors';
import { connect } from 'react-redux';
import './styles.css';

function PurchaseSuccessPage(props) {
  return (
    <MainLayoutWrapper pageHeading={'Success'}
                       pageInfoHeading={'Success!'}>
      <div className={'center'}>
        <Image src={successLogo} alt="Success" width={'300px'}/>
        <div>Your order ID is: <strong>{props.charge.orderId.toUpperCase()}</strong></div>
        <div>Your payment ref is: <strong>{props.charge.id}</strong></div>
      </div>
    </MainLayoutWrapper>
  );
}

const mapStateToProps = createStructuredSelector({
  charge: selectCharge,
});

export default connect(mapStateToProps)(PurchaseSuccessPage);
