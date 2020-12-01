import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import './style.css';
import { HOST_ADDRESS } from '../../../api/apiEndpoints';

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
        <Button variant="primary" className={'stick-bottom'}>Purchase</Button>
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

export default ProductTile;
