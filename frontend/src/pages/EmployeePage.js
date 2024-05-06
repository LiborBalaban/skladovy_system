import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Employee from '../components/Employee';
function EmployeePage() {
  const history = useNavigate();
  const [storages, setStorages] = useState([]);
  const [employees, setEmployees] = useState([]);
  const handleClick = () => {
    history('/fullapp/addemployee');
  };

 useEffect(()=>{
  loadEmployee();
 }, [])
  
  

  const loadEmployee = async () =>{
    try {
      const response = await axios.get("http://localhost:5000/get-employee");
      const employees = response.data.documents;
      setEmployees(employees);
      
    } catch{
      console.error("Chyba při získávání dodavatelů");
    }
  }

  


  return (
    <div className="CategoryPage">
        <div className='CategoryPageHeader'>
        <h2>Zaměstnanci</h2>
       <button className='addButton' onClick={handleClick}>Přidat</button>
        </div>
        <div className='Categories flex'>
        {
          employees.map((employee, index) =>{
            return(
            <Employee key = {index} name = {employee.name} surname = {employee.surname} id = {employee._id} email = {employee.email} storage = {employee.storage_id.name}/>
            )
          })
        }
        </div>
    </div>
  );
}

export default EmployeePage;