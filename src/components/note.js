import React, { useState } from 'react';
import axios from "axios";
import Card from "react-bootstrap/Card";
import { generate } from 'shortid';

import Item from './item';

const Note = props => {
    const shopnote = props.data;
    const [items, setItems] = useState(shopnote.items.data);

    const updateItemCheck = id => {
      const updatedItems = items.map(item => {
        // if this item has the same ID as the checked item
        if (id === item['_id']) {
          // use object spread to make a new object
          // whose `checked` prop has been inverted
          
          
          return {...item, checked: !item.checked}
        }
        return item;
      });
      return updatedItems;
    }

    const findItemToUpdate = id => {
      const foundItem = items.filter(item => {
        // if this item has the same ID as the checked item
        return (id === item['_id']) 
      });

      return foundItem[0];
    }
    
    const toggleCheck = async id => {
        console.log('toggle check', id);
        const foundItem = findItemToUpdate(id);
        if (foundItem) {
          const payload = {...foundItem, 
                            checked: !foundItem.checked, 
                            id: foundItem['_id'],
                            urgent: foundItem.urgent || false,
                            quantity: foundItem.quantity || ""
                          }
          const updated = await axios.post('/api/update-item', payload);
          console.log(updated);
          setItems(updateItemCheck(updated.data.item['_id']));
        }
        
    }

    const toggleUrgent = () => {
        console.log('toggle urgent');
    }
    

    return (
      <Card bg="dark" text="white" className="mb-2">
        <Card.Body>
          <Card.Title>{ shopnote.name }</Card.Title>
          <Card.Text>{ shopnote.description }</Card.Text>
          <ul className="item-container">
            {items &&
              items.map((item, index) => (
                <Item 
                  data={item} 
                  key= {generate()} 
                  toggleCheck={toggleCheck}
                  toggleUrgent = {toggleUrgent}
                  />
              ))}
          </ul>
        </Card.Body>

        <Card.Footer>
          <small className="text-muted">Last updated: { shopnote.updatedAt }</small>
        </Card.Footer>
      </Card>
    );
}

export default Note;