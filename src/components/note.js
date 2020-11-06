import React from 'react'; 
import Card from "react-bootstrap/Card";
import { generate } from 'shortid';

const Note = props => {

    const shopnote = props.data;

    const toggleCheck = event => {
        console.log(event.target.value);
    }

    const toggleUrgent = event => {
        console.log(event.target.value);
    }
    

    return (
      <Card bg="dark" text="white" className="mb-2">
        <Card.Body>
          <Card.Title>{shopnote.name}</Card.Title>
          <Card.Text>Manage your shopping items</Card.Text>
          <ul className="item-container">
            {shopnote.items.data &&
              shopnote.items.data.map((item, index) => (
                <li key={generate()} className="item-list">
                  <input
                    type="checkbox"
                    className="item-list-cb"
                    onChange={(e) => toggleCheck(e)}
                    checked={item.checked}
                  />
                  <span
                    className={item.urgent ? "urgent" : "normal"}
                    onClick={(e) => toggleUrgent(e)}
                  ></span>
                  <div className="item">
                    <span className="name">{item.name}</span>
                    {item.quantity ? (
                      <span className="quantity">
                        {" ("}
                        {item.quantity}
                        {")"}
                      </span>
                    ) : null}
                  </div>
                  <div className="actions">
                    <a className="edit">e</a> <a className="delete">d</a>
                  </div>
                </li>
              ))}
          </ul>
        </Card.Body>

        <Card.Footer>
          <small className="text-muted">Last updated on today</small>
        </Card.Footer>
      </Card>
    );
}

export default Note;