import React, { useState } from 'react';

const Item = props => {

    const item = props.data;
    const [name, setName] = useState(item.name);

    return (
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
            onChange={(event) => setName(event.target.value || item.name)}
            onKeyUp={(event) => props.rename(event, item['_id'], name)} />
        </div>
        
        <div className="actions">
          <a className="add">A</a> <a className="delete">D</a>
        </div>
      </li>
    );
}

export default Item;