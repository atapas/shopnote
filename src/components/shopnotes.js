import React, { useState, useEffect } from 'react';    
import axios from "axios";
import { generate } from 'shortid';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import _ from 'lodash';

import Note from './note';

const Shopnotes = props => {

    const [shopnotes, setShopnotes] = useState(props.data);
    const [brokenEdges, setBrokenEdges]  = useState(_.chunk(shopnotes, 3));

    useEffect(() => {
        const updatedEdges = _.chunk(shopnotes, 3);
        setBrokenEdges(updatedEdges);
    }, [shopnotes]);

    const deleteNote = async id => {
        const payload = {};
        payload['id'] = id;
        const deleted = await axios.post('/api/delete-shopnote', payload);
        const deletedNote = deleted.data.shopnote;
        if (deletedNote) {
          console.log('deleted', deletedNote);
          const remainingNotes = shopnotes.filter(note => id !== note['_id']);
          setShopnotes(remainingNotes);
        }
    }

    return (
      <Container>
        {
            brokenEdges &&
            brokenEdges.map((edges, index) => (
                <Row key={generate()}>
                    {
                        edges.map((shopnote, findex) =>(
                            <Col sm key={generate()}>
                                <Note 
                                    data = { shopnote } 
                                    key = {generate()} 
                                    deleteNote={deleteNote} />
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