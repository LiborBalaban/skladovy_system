import '../App.css';
import { useState, useEffect } from 'react';
import {useParams } from 'react-router-dom';
import { postData } from '../hooks/addToDb';
import { updateData } from '../hooks/updatetoDb';
import useData from '../hooks/loadData';
import AddWarehouseForm from '../components/forms/AddWarehouseForm';

const StorageDetailPage = () => {
  const { id } = useParams();
  const { data:storage, loading, error } = useData(`http://localhost:5000/get-warehouse/${id}`); 

  const handleAddWarehouse = (formData) => {
    console.log("Data přijatá z formuláře:", formData);

    if(id){
      updateData(`http://localhost:5000/update-warehouse/${id}`, formData);
    } else{
      postData('http://localhost:5000/save-warehouse', formData);
    }
    };

  return (
    <div className="AddStoragePage flex">
        <AddWarehouseForm onSubmit={handleAddWarehouse} data = {storage}/>
    </div>
  );
}

export default StorageDetailPage;