import React, { useEffect, useState } from 'react';    
import axios from "axios";

import Shopnotes from '../components/shopnotes';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

export default () => {    
  const [status, setStatus ] = useState(false);    
  const [shopnotes, setShopnotes] = useState(null);

  useEffect(() => {
    // if (status !== "loading...") return;
    axios("/api/get-shopnotes").then(result => {
      if (result.status !== 200) {
        console.error("Error loading shopnotes");
        console.error(result);
        return;
      }
      setShopnotes(result.data.shopnotes);
      setStatus(true);
    });
  }, [status]);

  
  return (
    <div className="main">
      <h1>Shopnote - An easy way to manage your shopping needs</h1>
      {
        status ? <Shopnotes data = { shopnotes } /> : <h1>Loading...</h1>
      }
    </div>
  );    
}