import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import Item from '../components/item';
import useData from '../hooks/loadData';
import Button from '../components/button';
import useCustomNavigate from '../hooks/navigate';
function EmployeePage() {

 const { data:employees, loading, error } = useData('http://localhost:5000/get-users'); 
 const { goTo } = useCustomNavigate();
  return (
    <div className="CategoryPage">
        <div className='CategoryPageHeader'>
        <h2>Zaměstnanci</h2>
       <Button label='Přidat' style='button addButton' onClick={()=>goTo('/admin/add-employee')}/>
        </div>
        <div className='Categories flex'>
        {
          employees.map((employee, index) =>{
            return(
            <Item info={employee.email} name={employee.name} link={`/admin/add-employee/${employee.id}`}/>
            )
          })
        }
        </div>
    </div>
  );
}

export default EmployeePage;