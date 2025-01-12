import '../App.css';
import React from "react";
import DeleteButton from '../Images/delete.png';
import SearchButton from '../Images/search-interface-symbol.png';
import EditButton from '../Images/edit.png';
import { useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Input from './inputs/input';

const Product = ({name, id, category, quantity, code, image, position, link, deleteFunction}) => {
  const navigate = useNavigate();

  const navigateLink = () =>{
    navigate(`/fullapp/add-product/${id}`)
  }  

  useEffect(()=>{
    checkQuantity();
   }, [quantity])

   const checkQuantity = () => {
    const numberQuantity = parseInt(quantity);
    const quantityElement = document.getElementById(`quantity-${id}`);
  
    if (quantityElement) {
      if (numberQuantity <= 0) {
        quantityElement.style.color = "red";
      }
      else {
        quantityElement.style.color = "white"; // Reset barvy na černou, pokud quantity není 0
      }
    }
  }

  return (
      <div className = "Product flex">
        <div className='checkbox-input'>
        <Input type={'checkbox'}/>
        </div>
        <div className='ProductName flex'>
        <img src={image} alt="" />
        <h3>{name}</h3>
        </div>
        <span>{category}</span>
        <span id={`quantity-${id}`}>{quantity || 0}</span>
        <span>{code}</span>
        <span>{position}</span>
        <div className='products_icons flex'>
        <Link to={link} className='editButton flex'>
            <img src={EditButton}/>
            <span>Editovat</span>
        </Link>
        <div  className='deleteItemButton editButton flex' onClick={deleteFunction}>
        <img src={DeleteButton} alt=""/>
        <span>Smazat</span>
        </div>
        </div>
      </div>
  );
};



export default Product;