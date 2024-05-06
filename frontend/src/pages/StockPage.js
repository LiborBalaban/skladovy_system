import '../App.css';
import React, { useState } from "react";
import StockProduct from '../components/StockProduct';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

const StockPage = () => {
const [products, setProducts] = useState([]);
const [suppliers, setSuppliers] = useState([]);
const [supplierID, setSupplierID] = useState('');
const [stockData, setStockData] = useState([]);
const [documentNumber, setDocumentNumber] = useState('');
const [description, setDescription] = useState('');
const [storageId, setStorageId] = useState('');
 


const history = useNavigate();
const today = new Date();

// Získání jednotlivých částí dnešního data
const day = today.getDate();
const month = today.getMonth() + 1; // Měsíce jsou indexovány od 0, proto přidáme 1
const year = today.getFullYear();

// Sestavení textu s dnešním datem
const formattedDate = `${day}.${month}.${year}`;


const addToDB = async () => {
  try {
    const response = await axios.post('http://localhost:5000/save-stockin', {
      document: documentNumber,
      supplier: supplierID,
      description: description,
      stockData: stockData
    }, {
      withCredentials: true
    });
    console.log('Úspěšně uloženo:', response.data.msg);

  } catch (error) {
    console.error('Chyba při ukládání:', error);
  }
};



const handleAddToStock = (productId, quantity) => {
  const newData = { productId, quantity };
  setStockData([...stockData, newData]);
  console.log("Nová data vložena do stavu:", newData);
};


useEffect(()=>{
  loadProducts();
  loadSuppliers();
 }, [])
  
 const loadProducts = async () =>{
  try {
    const response = await axios.get("http://localhost:5000/get-products", { withCredentials: true });
    const products = response.data.documents;
    setProducts(products);
    
  } catch{
    console.error("Chyba při získávání dodavatelů");
  }
}

const loadSuppliers = async () =>{
  try {
    const response = await axios.get("http://localhost:5000/get-suppliers", { withCredentials: true });
    const suppliers = response.data.suppliers;
    setSuppliers(suppliers);
    
  } catch{
    console.error("Chyba při získávání dodavatelů");
  }
}

 


  return (
    <div className="ProductPage">
    <div className='CategoryPageHeader'>
    <h2>Produkty</h2>
    </div>
    <div className='StockPageNav'>
        <div className='flex stockHeader'>
            <span>{"Dnešní datum: " + formattedDate}</span>
            <span>Naskladnění</span>
        </div>
     </div>
     <div className='flex StorckProductsEdit'>
     <div className='StockProducts flex'>
     {
          products.map((product, index) =>{
            return(
            <StockProduct key = {index} name = {product.name} id = {product._id} category = {product.category.name} code = {product.code} images={product.images} AddToStock={handleAddToStock}/>
            )
          })
        }
     </div>
     <div className='StockForm flex'>
        
        <div className='inputStock flex'>
        <label htmlFor="">Dodavatel</label>
        <select name="" id=""  onChange={(e) => setSupplierID(e.target.value)}>
        {
          suppliers.map((supplier, index) =>{
            return(
              <option key={index} value={supplier._id} className='storageOption optionText'>
              {supplier.name}
            </option>
            )
          })
        }
        </select>
        </div>

        <div className='inputStock flex'>
        <label htmlFor="">Popis</label>
        <textarea name="" id="" cols="30" rows="10" placeholder='Popis' value={description} onInput={(e) => {
                  setDescription(e.target.value);
                }}></textarea>
        </div>

        <div className='inputStock flex'>
        <label htmlFor="">Číslo dokladu</label>
        <input type="number" value={documentNumber} onInput={(e) => {
                  setDocumentNumber(e.target.value);
                }}/>
        </div>
        <button className='saveProductButton' onClick={addToDB}>Uložit</button>
     </div>
     </div>
    </div>
  );
};

export default StockPage;