import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form';
import { ShoppingBag } from 'react-feather';

const Header = props => {

    return (
      <Navbar bg="dark" variant="dark" className="header">
        <Navbar.Brand href="#home">
            <ShoppingBag size={32}/>
            {" "}
            <span>Shopnote</span>
        </Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        <Form inline>
            <Button variant="outline-info">Add</Button>
        </Form>
      </Navbar>
    );
}

export default Header;