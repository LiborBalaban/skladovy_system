import '../App.css';
import React, { useState } from "react";

const StockProduct = ({name, id, category, count, code, pozice, images, AddToStock}) => {
  const [visible, setVisible] = useState(false);
  const [productId, setProductId] = useState(null);
  const [quantity, setQuantity] = useState("");

  const toggleVisible = () => {
    setVisible(!visible);
    if (!visible) {
      setProductId(id);
    } else {
      setProductId(null);
    }
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAddToStock = () => {
    AddToStock(productId, quantity);
  };

  
  return (
    <div className='FullStock flex'>
      <div className='FullStockProduct flex'>
        <div className='ProductStockName flex'>
          { images && images.length > 0 && (
    <img src={require('../Images/' + images[0].url.slice(27))} alt="" />
  )}
          <span>{name}</span>
        </div>
        <div>
          <button className='stockButton' onClick={toggleVisible}>+</button>
        </div>
      </div>
      {visible && (
        <div className='addProductInput'>
          <label htmlFor="">Množství</label>
          <input type="number" placeholder='Množství...' value={quantity} onChange={(e) => {
    handleQuantityChange(e);
  }} onBlur={handleAddToStock}/>
        </div>
      )}
    </div>   
  );
};

export default StockProduct;