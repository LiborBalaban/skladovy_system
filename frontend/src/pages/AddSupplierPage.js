import '../App.css';
import '../responsive.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AddSupplierForm from '../components/forms/AddSupplierForm';
import useData from '../hooks/loadData';
import { postData } from '../hooks/addToDb';
import { updateData } from '../hooks/updatetoDb';

const AddSupplierPage = () => {
  const {id} = useParams();
  const { data:supplier, loading, error } = useData(`http://localhost:5000/get-supplier/${id}`); 
 
  const handleSupplierSave = (formData) => {
    console.log("Data přijatá z formuláře:", formData);

    if(id){
      updateData(`http://localhost:5000/update-supplier/${id}`, formData);
    } else{
      postData('http://localhost:5000/save-supplier', formData);
    }
    };
 

  return (
    <div className="page flex">
       <AddSupplierForm onSubmit={handleSupplierSave} data = {supplier}/>
    </div>
  );
}

export default AddSupplierPage;