import React, { useState } from 'react';
import { PlusCircle, XCircle, Save, Trash2 } from 'react-feather';
import Alert from 'react-bootstrap/Alert';

const Item = props => {
    const [show, setShow] = useState(false);
    const [item, setItem] = useState(props.data);
    const [name, setName] = useState(item.name);
    
    const changeItemName = newName => {
      const changed = {...item, name: newName};
      setItem(changed);
    }

    if (show) {
      return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>I get that! You are trying to delete an Item.</Alert.Heading>
          <p>
            This is running from the demo branch where the delete capability is not
            available. You can <a href="https://github.com/atapas/shopnote" target="_blank">checkout the master branch</a> and run the app locally
            by following the instractions. You get to do All there!
          </p>
        </Alert>
      );
    }

    return (
      <>
      {
        item.toSave ?
        <li key={item['_id']} className="item-list">
          <div className="item">
            <input
              className="input"
              type="text" 
              value={item.name}
              onChange={(event) => changeItemName(event.target.value)}
            />
          </div>
        
          <div className="actions">
            <span>
              <Save className="add" onClick={() => props.saveItem(item)}></Save>
            </span> 
            <span>
              <XCircle className="delete" onClick={() => props.cancelSave(item['_id'])}></XCircle>
            </span>
          </div>
        </li>
        :
        <li key={item['_id']} className="item-list">
          <input
            type="checkbox"
            className="item-list-cb"
            onChange={() => props.toggle(item['_id'], 'checked')}
            defaultChecked={item.checked || false} 
          />

          <span
            className={item.urgent ? "urgent" : "normal"}
            onClick={() => props.toggle(item['_id'], 'urgent')}
          ></span>
        
          <div className="item">
            <input
              type="text" 
              value={name} 
              className={item.checked ? "input checked" : "input unchecked"} 
              disabled={item.checked}
              onChange={(event) => setName(event.target.value)}
              onKeyUp={(event) => props.rename(event, item['_id'], name)} />
          </div>
        
          <div className="actions">
            <span>
              <PlusCircle className="add" onClick={props.addItem}></PlusCircle>
            </span>
            <span>
              <Trash2 className="delete" onClick={() => setShow(true)}></Trash2>
            </span>
          </div>
        </li>
      }
    </>  
    );
}

export default Item;