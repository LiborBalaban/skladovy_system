import '../App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Stockin from './Stockin';
import StockOut from './stockOut';


const Moves = ({productId}) => {
    const [stockin, setStockin] = useState([]);
    const [stockout, setStockout] = useState([]);

    useEffect(() => {
    loadStockin();
    loadStockOut();
    }, []);

    const loadStockin = async () =>{
      try {
        const response = await axios.get(`http://localhost:5000/get-product-stockin/${productId}`, { withCredentials: true });
        const stockins = response.data.documents;
        setStockin(stockins);
        
      } catch{
        console.error("Chyba při získávání dodavatelů");
      }
    }
    
    
  const loadStockOut = async () =>{
    try {
      const response = await axios.get(`http://localhost:5000/get-product-stockout/${productId}`, { withCredentials: true });
      const stockouts = response.data.documents;
      setStockout(stockouts);
      
    } catch{
      console.error("Chyba při získávání dodavatelů");
    }
  }
    return (
        <div className='Moves flex'>
        <div className='MovesContainer flex'>
          <div className='ProductStockHeader'>
            <h2>Naskladnění</h2>
          </div>
        <div className='MovesItems flex'>
        {
          stockin.map((stockin, index) =>{
            return(
            <Stockin name = {stockin.product.name} quantity = {stockin.quantity} date={new Date(stockin.stockin.date).toLocaleString()} supplier = {stockin.stockin.supplier.name}/>
            )
          })
        }
        </div>
        </div>
        <div className='MovesContainer flex'>
        <div className='ProductStockHeader'>
            <h2>Vyskladnění</h2>
          </div>
        <div className='MovesItems flex'>
        {
          stockout.map((stockout, index) =>{
            return(
            <StockOut name = {stockout.product.name} quantity = {stockout.quantity} date={new Date(stockout.stockout.date).toLocaleString()} description = {stockout.stockout.description}/>
            )
          })
        }
        </div>
        </div>

    </div>
      );
    }
    

export default Moves;