import '../App.css';
import Category from '../components/Category';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import Item from '../components/item';
import Button from '../components/button';
import useData from '../hooks/loadData';
import useCustomNavigate from '../hooks/navigate';

function SupplierPage() {
const { goTo } = useCustomNavigate();
 const { data:suppliers, loading, error } = useData('http://localhost:5000/get-suppliers'); 
  
  return (
    <div className="CategoryPage">
        <div className='CategoryPageHeader'>
        <h2>Dodavatelé</h2>
       <Button label='Přidat' style='button addButton' onClick={()=>goTo('/admin/add-supplier')}/>
        </div>
        <div className='Categories flex'>
        {
        suppliers.map((supplier, index) =>{
        return(
        <Item name={supplier.name} info={supplier.email} link={`/admin/add-supplier/${supplier.id}`}/>
        )
        })
        }
        </div>
    </div>
  );
}

export default SupplierPage;