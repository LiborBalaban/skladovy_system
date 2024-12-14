import '../App.css';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Moves from '../components/Moves';
import AddProductForm from '../components/forms/AddProductForm';
import AddImagesForm from '../components/forms/AddImagesForm';

const AddProductPage = () => {
const { id } = useParams();

useEffect(() => {
  if (id) {
     
  }
}, [id]);


  return (
    <div className="AddProductPage flex">
        <AddProductForm/> 
        <AddImagesForm/>
    </div>
  );
}

export default AddProductPage;