import '../App.css';
import React, { useState } from "react";
import Product from '../components/Product';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import searchbar from '../Images/search-interface-symbol.png'

const ProductPage = () => {
const [products, setProducts] = useState([]);
const [query, setQuery] = useState('');
const history = useNavigate();

const buttonAdd =() =>{
  history('/fullapp/add-product');
};

useEffect(()=>{
  loadProducts();
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

  const loadSearchedProduct = async (event) => {
    try {
        const response = await axios.get(`http://localhost:5000/searched-product?q=${query}`, {withCredentials: true});
        setProducts(response.data.documents);
        console.log(products);
    } catch (error) {
        console.error('Error searching:', error);
    }
};

const emptyQuery =()=>{
  if(query.length === 0){
    loadProducts();
  }
}

return (
  <div className="ProductPage">
    <div className='CategoryPageHeader'>
      <h2>Produkty</h2>
      <button className='addButton' onClick={buttonAdd}>Přidat</button>
    </div>
    <div className='ProductPageNav flex'>
      <div className='flex ProductPageNavTitles'>
        <span>Název</span>
        <span>Kategorie</span>
        <span>Počet</span>
        <span>Kód</span>
        <span>Pozice</span>
      </div>
      <div className='searchbarHeader'>
        <div className='searchbarContainer flex'>
          <input type="text" className='searchbar' placeholder='Zadej hledaný výraz...' value={query} onInput={(e) => {
            setQuery(e.target.value);
          }}/>
          <img src={searchbar} alt="" onClick={loadSearchedProduct}/>
        </div>
      </div>
    </div>
    <div className='Products flex'>
      {products.map((product, index) => (
        <Product key={index} name={product.name} id={product._id} category={product.category ? product.category.name : "Nedefinováno"} code={product.code} images={product.images} quantity={product.quantity} reload={loadProducts} position = {product.category ? product.category.position.name : "Nedefinováno"}/>
      ))}
    </div>
  </div>
);
};

export default ProductPage;