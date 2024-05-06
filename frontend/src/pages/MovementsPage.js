import '../App.css';
import Stockin from '../components/Stockin';
import StockOut from '../components/stockOut';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
const MovementsPage = () => {
  const history = useNavigate();
  const [stockin, setStockin] = useState([]);
  const [stockout, setStockout] = useState([]);

 useEffect(()=>{
    loadStockin();
    loadStockOut();
 }, [])
  


  const loadStockin = async () =>{
    try {
      const response = await axios.get("http://localhost:5000/get-stockin", { withCredentials: true });
      const stockins = response.data.documents;
      setStockin(stockins);
      
    } catch{
      console.error("Chyba při získávání dodavatelů");
    }
  }

  
  const loadStockOut = async () =>{
    try {
      const response = await axios.get("http://localhost:5000/get-stockout", { withCredentials: true });
      const stockouts = response.data.documents;
      setStockout(stockouts);
      
    } catch{
      console.error("Chyba při získávání dodavatelů");
    }
  }


  return (
    <div className="CategoryPage">
        <div className='CategoryPageHeader'>
        <h2>Pohyby produktů</h2>
        </div>
        <div className='flex movements_flex'>
        <div className='Categories stock flex'>
        <div className='StockHeader'>
        <h2>Naskladnění</h2>
        </div>
        {
          stockin.map((stockin, index) =>{
            return(
            <Stockin name = {stockin.product.name} code = {stockin.product.code} quantity = {stockin.quantity} date={new Date(stockin.stockin.date).toLocaleString().slice(0,11)} supplier = {stockin.stockin.supplier.name}/>
            )
          })
        }
        </div>
        <div className='Categories stock flex'>
        <div className='StockHeader'>
        <h2>Vyskladnění</h2>
        </div>
        {
          stockout.map((stockout, index) =>{
            return(
            <StockOut name = {stockout.product.name} code = {stockout.product.code} quantity = {stockout.quantity} date={new Date(stockout.stockout.date).toLocaleString().slice(0,11)} description = {stockout.stockout.description} />
            )
          })
        }
        </div>
        </div>
        
    </div>
  );
}

export default MovementsPage;