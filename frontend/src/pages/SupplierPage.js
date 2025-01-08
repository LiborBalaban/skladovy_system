import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import Item from '../components/item';
import Button from '../components/button';
import useData from '../hooks/loadData';
import useCustomNavigate from '../hooks/navigate';
import List from '../components/List';
import Header from '../components/Header';

function SupplierPage() {
const { goTo } = useCustomNavigate();
 const { data:suppliers, loading, error } = useData('http://localhost:5000/get-suppliers'); 

 const [filtredSupliers, setFiltredSuppliers] = useState([]);

 useEffect(() => {
  setFiltredSuppliers(suppliers || []);
}, [suppliers]); 


const hadnleFilteredData =(data)=>{
  setFiltredSuppliers(data);
}

 const HeaderTitles = [
  {name:'Název'},
  {name:'Email'},
  {name:'Akce'},
]
  
  return (
    <div className="page">
        <div className='page-header'>
        <h2>Dodavatelé</h2>
       <Button label='Přidat' style='button addButton' onClick={()=>goTo('/admin/add-supplier')}/>
        </div>
        <Header  data={suppliers} getFiltred={hadnleFilteredData} label={'Vyhledat dodavatele'}/>
        <List data={filtredSupliers} titles={HeaderTitles} type={'supplier'}/>
    </div>
  );
}

export default SupplierPage;