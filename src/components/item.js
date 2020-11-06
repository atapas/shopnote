import React from 'react';

import { generate } from 'shortid';

const Item = props => {

    const item = props.data;

    return (
      <li key={generate()} className="item-list">
        <input
          type="checkbox"
          className="item-list-cb"
          onChange={() => props.toggleCheck(item['_id'])}
          defaultChecked={item.checked || false}
        />

        <span
          className={item.urgent ? "urgent" : "normal"}
          onClick={props.toggleUrgent || false}
        ></span>
        
        <div className={item.checked ? "item checked" : "item unchecked"}>
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
    );
}

export default Item;