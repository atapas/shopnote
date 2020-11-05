import React, { useEffect, useState } from 'react';    
import axios from "axios";
import { generate } from 'shortid';

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

 

  return (
    <>
      {shopnotes && shopnotes.map((shopnote, index) => (
        <div key={ generate() }>
          <div className="shopnote">
            <span>{ shopnote.name }</span>
            <ul>
                {shopnote.items.data && shopnote.items.data.map((item, index) => (
                    <li key={generate()}>
                        <span className="name">{ item.name }</span>
                        {
                            item.quantity ? 
                            <span className="quantity">{'  '}{ item.quantity }</span> : null
                        }
                        
                    </li>
                ))}
            </ul>
          </div>
        </div>
      ))}
    </>
  );    
}