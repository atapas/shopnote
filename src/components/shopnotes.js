import React from 'react';    

import { generate } from 'shortid';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import _ from 'lodash';

import Note from './note';

const Shopnotes = props => {

    const shopnotes = props.data;
    const brokenEdges  = _.chunk(shopnotes, 2);
    console.log(shopnotes);
    console.log(brokenEdges);

    return (
      <Container>
        {
            brokenEdges &&
            brokenEdges.map((edges, index) => (
                <Row key={generate()}>
                    {
                        edges.map((shopnote, findex) =>(
                            <Col sm key={generate()}>
                                <Note data = { shopnote } key = {generate()} />
                            </Col>
                        ))
                    }
                </Row>
            ))
        }
      </Container>
    );
};

export default Shopnotes;