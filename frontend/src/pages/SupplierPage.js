import '../App.css';
import Category from '../components/Category';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import Supplier from '../components/Supplier';
import axios from 'axios';
function SupplierPage() {
  const history = useNavigate();
  const [suppliers, setSuppliers] = useState([]);
  const handleClick = () => {
    history('/fullapp/add-supplier');
  };

 useEffect(()=>{
  loadSuppliers();
 }, [])
  
  const loadSuppliers = async () =>{
    try {
      const response = await axios.get("http://localhost:5000/get-suppliers", { withCredentials: true });
      const suppliers = response.data.suppliers;
      setSuppliers(suppliers);
      
    } catch{
      console.error("Chyba při získávání dodavatelů");
    }
  }
  
  return (
    <div className="CategoryPage">
        <div className='CategoryPageHeader'>
        <h2>Dodavatelé</h2>
       <button className='addButton' onClick={handleClick}>Přidat</button>
        </div>
        <div className='Categories flex'>
        {
        suppliers.map((supplier, index) =>{
        return(
        <Supplier key = {index} name = {supplier.name} phone = {supplier.phone} email = {supplier.email} psc = {supplier.description}  id = {supplier._id} reload = {loadSuppliers}/>
        )
        })
        }
        </div>
    </div>
  );
}

export default SupplierPage;