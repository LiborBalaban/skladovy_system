import '../App.css';
import React, { useState } from "react";
import Product from '../components/Product';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import searchbar from '../Images/search-interface-symbol.png';
import useData from '../hooks/loadData';
import Button from '../components/button';
import useCustomNavigate from '../hooks/navigate';

const ProductPage = () => {
  const { goTo } = useCustomNavigate();
 const { data:products, loading, error } = useData('http://localhost:5000/get-products'); 

 products.forEach(element => {
  let elementKOkot = element.images.url;
  console.log(elementKOkot)
});

 

return (
  <div className="ProductPage">
    <div className='CategoryPageHeader'>
      <h2>Produkty</h2>
      <Button label={'Přidat produkt'} style={'button addButton'} onClick={()=>goTo('/fullapp/add-product')}/>
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
          <input type="text" className='searchbar' placeholder='Zadej hledaný výraz...'/>
          <img src={searchbar} alt=""/>
        </div>
      </div>
    </div>
    <div className='Products flex'>
      {products.map((product, index) => (
        <Product key={index} name={product.name} category={product.category ? product.category.name : "Nedefinováno"} code={product.code} quantity={product.quantity} link={`/fullapp/add-product/${product.id}`} position={product.position.name} image={`http://localhost:5000${product.images[0].url.substring(2).replace(/\\/g, '/')}`}/>
      ))}
    </div>
  </div>
);
};

export default ProductPage;