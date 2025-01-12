import '../App.css';
import React, { useState } from "react";
import Input from './inputs/input';

const StockProduct = ({name, id, code, handlePice, handleQuantity}) => {
  return (
       <div className="item">
         <div className='checkbox-input'>
        <Input type={'checkbox'}/>
        </div>
            <h2 className='stockName'>{name}</h2>
            <span className='stockInfo'>{code}</span>
            <div className='item_inputs'>
            <input type="text" placeholder='0' onChange={(e)=>handleQuantity(id ,e.target.value)}/>
            <input type="text" placeholder='0' onChange={(e)=>handlePice(id, e.target.value)}/> 
            </div>
        </div>  
  );
};

export default StockProduct;