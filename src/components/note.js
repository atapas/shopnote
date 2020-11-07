import React, { useState } from 'react';
import axios from "axios";
import Card from "react-bootstrap/Card";
import { generate } from 'shortid';

import Item from './item';

const Note = props => {
    const shopnote = props.data;
    const sortedByChecked = shopnote.items.data.sort((a,b) => a.checked - b.checked);
    const [items, setItems] = useState(sortedByChecked);

    const updateItemCheck = (id, type, updatedName) => {
      const updatedItems = items.map(item => {
        // if this item has the same ID as the checked item
        if (id === item['_id']) {
          // use object spread to make a new object
          // whose `checked` prop has been inverted
          if (type === 'checked') {
            return {...item, checked: !item.checked};
          } else if (type === 'urgent') {
            return {...item, urgent: !item.urgent}
          } else if (type === 'name') {
            return {...item, name: updatedName}
          }
          return item;
        }
        return item;
      });

      if (type === 'checked') {
        updatedItems.sort((a,b) => a.checked - b.checked);
      }
      return updatedItems;
    }

    const findItemToUpdate = id => {
      const foundItem = items.filter(item => {
        // if this item has the same ID as the checked item
        return (id === item['_id']) 
      });
      return foundItem[0];
    }
    
    const update = async (id, type, updatedName) => {
        console.log('update check', id);
        const foundItem = findItemToUpdate(id);
        if (foundItem) {
          let payload = foundItem;
          if (type === 'checked') {
            payload = {...foundItem, 
              checked: !foundItem.checked, 
              id: foundItem['_id'],
              urgent: foundItem.urgent || false
            }
          } else if (type === 'urgent') {
            payload = {...foundItem, 
              checked: foundItem.checked || false, 
              id: foundItem['_id'],
              urgent: !foundItem.urgent
            }
          } else if (type === 'name') {
            payload = {...foundItem, 
              checked: foundItem.checked, 
              id: foundItem['_id'],
              urgent: foundItem.urgent,
              name: updatedName
            }
          }
          
          const updated = await axios.post('/api/update-item', payload);
          console.log(updated);
          setItems(updateItemCheck(updated.data.item['_id'], type, updatedName));
        }
        
    }

    const renameItem = (event, id, updatedName) => {
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        console.log('rename triggered for', updatedName);
        update(id, 'name', updatedName);
      }
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
                  toggle={update}
                  rename={renameItem}
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