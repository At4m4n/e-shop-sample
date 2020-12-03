import React, { useEffect } from 'react';
import MainLayoutWrapper from '../MainLayoutWrapper';
import { CardGroup, Container, Row } from 'react-bootstrap';
import ProductTile from './ProductTile';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import * as productActions from '../../actions/productActions';
import { selectAllProducts } from '../../selectors/productSelectors';

function ViewProductsPage(props) {

  const { products } = props;

  function sliceArray(array) {
    let result = [];
    let chunkSize = 3;
    for (let i = 0; i < Math.ceil(array.length / chunkSize); i++) {
      result[i] = array.slice((i * chunkSize), (i * chunkSize) + chunkSize);
    }
    return result;
  }

  useEffect(() => {
    props.fetchProducts();
  }, []);

  return (
    <MainLayoutWrapper pageHeading={'Product Selection'}
                       pageInfoHeading={'Select a Product:'}>
      <Container fluid={true}>
        {sliceArray(products).map((chunk, index) => (
          <Row key={index}>
            <CardGroup>
              {chunk.map((product, index) => (
                <ProductTile key={index} product={product}/>
              ))}
            </CardGroup>
          </Row>
        ))}
      </Container>
    </MainLayoutWrapper>
  );
}

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => dispatch(productActions.fetchProducts()),
});

const mapStateToProps = createStructuredSelector({
  products: selectAllProducts,
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewProductsPage);
