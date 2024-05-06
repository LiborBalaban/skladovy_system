import '../App.css';
import React from "react";
import DeleteButton from '../Images/delete.png';
import SearchButton from '../Images/search-interface-symbol.png';
import EditButton from '../Images/edit.png';
import { useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

const Product = ({name, id, category, quantity, code, pozice, images, reload, position}) => {
  const navigate = useNavigate();

  const navigateLink = () =>{
    navigate(`/fullapp/add-product/${id}`)
  }  
  
  const deleteProduct = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/delete-product/${id}`, { withCredentials: true });
      reload();
    } catch (error) {
      console.error('Chyba při provádění DELETE požadavku:', error);
    }
  };


  useEffect(()=>{
    checkQuantity();
   }, [quantity])

   const checkQuantity = () => {
    const numberQuantity = parseInt(quantity);
    const quantityElement = document.getElementById(`quantity-${id}`);
    if (quantityElement) {
      if (numberQuantity <= 0) {
        quantityElement.style.color = "red";
      } else {
        quantityElement.style.color = "black"; // Reset barvy na černou, pokud quantity není 0
      }
    }
  }

  return (
      <div className = "Product flex">
        <div onClick={navigateLink} className='ProductContainer flex'>
        <div className='ProductName flex'>
        {
  images && images.length > 0 && (
    <img src={require('../Images/' + images[0].url.slice(27))} alt="" />
  )
}
        <span>{name}</span>
        </div>
        <span>{category}</span>
        <span id={`quantity-${id}`}>{quantity}</span>
        <span>{code}</span>
        <span>{position}</span>
        </div>
        <div className='products_icons flex'>
        <Link to={`/fullapp/add-product/${id}`}>
            <img src={EditButton}/>
        </Link>
        <div  className='deleteItemButton'>
        <img src={DeleteButton} alt="" onClick={deleteProduct}/>
        </div>
        </div>
      </div>
  );
};



export default Product;