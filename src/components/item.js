import React, { useState } from 'react';
import { PlusCircle, XCircle, Save, Trash2 } from 'react-feather';

const Item = props => {

    const [item, setItem] = useState(props.data);
    const [name, setName] = useState(item.name);
    
    const changeItemName = newName => {
      const changed = {...item, name: newName};
      setItem(changed);
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
              <Trash2 className="delete" onClick={() => props.deleteItem(item['_id'])}></Trash2>
            </span>
          </div>
        </li>
      }
    </>  
    );
}

export default Item;