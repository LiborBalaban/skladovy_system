import '../App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AddEmployeeForm from '../components/forms/AddEmployeeForm';
import { postData } from '../hooks/addToDb';
import useData from '../hooks/loadData';
import {useParams } from 'react-router-dom';

const AddEmployeePage = () => {
  const {id} = useParams();
  const { data:user, loading, error } = useData(`http://localhost:5000/get-user/${id}`); 
  const handleAddEmployee = (formData) => {
      console.log("Data přijatá z formuláře:", formData);
      postData('http://localhost:5000/invite-employee', formData);
    };

    

  return (
    <div className="AddSupplierPage flex">
     <AddEmployeeForm onSubmit={handleAddEmployee} data={user}/>   
    </div>
  );
}

export default AddEmployeePage;