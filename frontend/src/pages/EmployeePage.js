import '../App.css';
import '../responsive.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import Item from '../components/item';
import useData from '../hooks/loadData';
import Button from '../components/button';
import useCustomNavigate from '../hooks/navigate';
import List from '../components/List';
import Header from '../components/Header';
function EmployeePage() {

 const { data:employees, loading, error } = useData('http://localhost:5000/get-users'); 

 const [filtredEmployee, setFiltredEmployee] = useState([]);

 useEffect(() => {
  setFiltredEmployee(employees || []);
}, [employees]); 


const hadnleFilteredData =(data)=>{
  setFiltredEmployee(data);
}

 const { goTo } = useCustomNavigate();
 const HeaderTitles = [
  {name:'Jméno zaměstnance'},
  {name:'Email'},
  {name:'Akce'},
]
  return (
    <div className="page">
        <div className='page-header'>
        <h2>Zaměstnanci</h2>
       <Button label='Přidat' style='button addButton' onClick={()=>goTo('/admin/add-employee')}/>
        </div>
        <Header data={employees} getFiltred={hadnleFilteredData} label={'Vyhledat zaměstnance'}/>
        <List data={filtredEmployee} titles={HeaderTitles} type={'employee'}/>
    </div>
  );
}

export default EmployeePage;