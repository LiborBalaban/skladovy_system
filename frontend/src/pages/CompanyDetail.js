import '../App.css';
import '../responsive.css';
import { useState, useEffect } from 'react';
import {useParams } from 'react-router-dom';
import AddCategoryForm from '../components/forms/AddCategoryForm';
import { postData } from '../hooks/addToDb';
import { updateData } from '../hooks/updatetoDb';
import useData from '../hooks/loadData';
import CompanyForm from '../components/forms/CompanyForm';


const CompanyDetail = () => {
  
const { data:company, loading, error } = useData(`http://localhost:5000/get-company`); 
  
  const handleUpdateCompany = (formData) => {
    console.log("Data přijatá z formuláře:", formData);
    updateData(`http://localhost:5000/update-company`, formData);
  };
 
  return (
    <div className="page flex">     
    <CompanyForm onSubmit = {handleUpdateCompany} data={company}/>       
    </div>
  );
}

export default CompanyDetail;