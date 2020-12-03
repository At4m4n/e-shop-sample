import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import './styles.css';
import { HOST_ADDRESS } from '../../../api/apiEndpoints';
import history from '../../../history';
import { CHECKOUT_PATH } from '../../../constants/apiConstants';
import { connect } from 'react-redux';
import { FIND_PRODUCT_BY_ID } from '../../../actions/types/productActionTypes';

function ProductTile(props) {
  const { product } = props;
  return (
    <Card className={'mb-3'} id={'card-container'}>
      <Card.Img variant={'top'}
                src={`${HOST_ADDRESS}/${product.imagePath}`}
                alt={product.name}/>
      <Card.Body>
        <Row>
          <Col><Card.Title>{product.title}</Card.Title></Col>
          <Col><Card.Title className={'stick-right'}>$ {product.price}</Card.Title></Col>
        </Row>
        <Card.Text>{product.description}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button onClick={() => {
          props.getProductById(product.id)
          history.push(CHECKOUT_PATH.replace(':id', product.id))
        }} variant="primary" className={'stick-bottom'}>Purchase</Button>
      </Card.Footer>
    </Card>
  );
}

ProductTile.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    imagePath: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
  }),
};

const mapDispatchToProps = (dispatch) => ({
  getProductById: (id) => dispatch({type: FIND_PRODUCT_BY_ID, payload: id}),
});

export default connect(null, mapDispatchToProps)(ProductTile);

