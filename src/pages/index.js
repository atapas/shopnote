import React, { useEffect, useState } from 'react';    
import axios from "axios";
import Header from '../components/header';
import Shopnotes from '../components/shopnotes';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

export default () => {    
  const [loading, setLoading ] = useState(false);    
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
      setLoading(true);
    });
  }, [loading]);

  
  return (
    <div className="main">
      <Header />
      {
        loading ? <Shopnotes data = { shopnotes } /> : <h1>Loading...</h1>
      }
    </div>
  );    
}