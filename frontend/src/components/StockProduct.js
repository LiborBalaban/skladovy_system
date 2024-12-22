import '../App.css';
import React, { useState } from "react";

const StockProduct = ({name, id, code, handlePice, handleQuantity}) => {
  return (
       <div className="item">
            <h2>{name}</h2>
            <span>{code}</span>
            <div className='item_icons'>
            <input type="number" placeholder='0' onChange={(e)=>handleQuantity(id ,e.target.value)}/>
            <input type="number" placeholder='0' onChange={(e)=>handlePice(id, e.target.value)}/> 
            </div>
        </div>  
  );
};

export default StockProduct;