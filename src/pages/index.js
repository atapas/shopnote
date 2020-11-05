import React, { useEffect, useState } from 'react';    
import axios from "axios";
import { generate } from 'shortid';

import './index.css'

export default () => {    
  const [status, setStatus ] = useState('loading...');    
  const [shopnotes, setShopnotes] = useState(null);

  useEffect(() => {
    if (status !== "loading...") return;
    axios("/api/get-shopnotes").then(result => {
      if (result.status !== 200) {
        console.error("Error loading shopnotes");
        console.error(result);
        return;
      }
      setShopnotes(result.data.shopnotes);
      setStatus("loaded");
    });
  }, [status]);

  const toggleCheck = event => {
    console.log(event.target.value);
  }

  const toggleUrgent = event => {
    console.log(event.target.value);
  }

  return (
    <>
      {shopnotes && shopnotes.map((shopnote, index) => (
        <div className="shopnote" key={ generate() }>
          <span>{ shopnote.name }</span>
          <ul>
              {shopnote.items.data && shopnote.items.data.map((item, index) => (
                <li key={generate()} className="item-list">
                  <input type="checkbox" className="item-list-cb" onChange={(e) => toggleCheck(e)} checked={item.checked} />
                  <span className={item.urgent ? 'urgent' : 'normal'} onClick={(e) => toggleUrgent(e)}></span>
                  <div className="item">
                    <span className="name">{ item.name }</span>
                    {
                            item.quantity ? 
                            <span className="quantity">{' ('}{ item.quantity }{')'}</span> : null
                    }
                  </div>
                  <div className="actions">
                    <a className="edit">e</a> {' '}
                    <a className="delete">d</a>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </>
  );    
}