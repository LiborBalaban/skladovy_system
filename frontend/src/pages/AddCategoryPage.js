import '../App.css';
import { useState, useEffect } from 'react';
import {useParams } from 'react-router-dom';
import AddCategoryForm from '../components/forms/AddCategoryForm';
import { postData } from '../hooks/addToDb';
import { updateData } from '../hooks/updatetoDb';
import useData from '../hooks/loadData';


const AddCategoryPage = () => {
  const {id} = useParams();
  const { data:category, loading, error } = useData(`http://localhost:5000/get-category/${id}`); 
  
  const handleAddCategory = (formData) => {
    console.log("Data přijatá z formuláře:", formData);

    if(id){
      updateData(`http://localhost:5000/update-category/${id}`, formData);
    } else{
      postData('http://localhost:5000/save-category', formData);
    }
  };
 
  return (
    <div className="AddCategoryPage flex">
    <AddCategoryForm onSubmit={handleAddCategory} data={category}/>       
    </div>
  );
}

export default AddCategoryPage;