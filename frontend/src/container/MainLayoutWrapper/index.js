import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import './styles.css'

function MainLayout(props) {
  return (
      <Container fluid={true} id={'outer-container'}>
        <Row>
          <Col>
            <h1>{props.pageHeading}</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Container fluid={true} id={'inner-container'}>
              <Row>
                <h2>{props.pageInfoHeading}</h2>
              </Row>
              <Row>
                <Container fluid={true}><div>{props.children}</div></Container>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
  );
}

export default MainLayout;
