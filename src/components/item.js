import React from 'react';

import { generate } from 'shortid';

const Item = props => {

    const item = props.data;

    return (
      <li key={generate()} className="item-list">
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
        
        <div className={item.checked ? "item checked" : "item unchecked"}>
          <span className="name">{item.name}</span>
        </div>
        
        <div className="actions">
          <a className="add">A</a> <a className="delete">D</a>
        </div>
      </li>
    );
}

export default Item;