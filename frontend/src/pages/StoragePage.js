import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import Button from '../components/button';
import axios from 'axios';
import Item from '../components/item';
import useData from '../hooks/loadData';
import useCustomNavigate from '../hooks/navigate';
import List from '../components/List';
import Header from '../components/Header';
function StoragePage() {

 const { data:storages, loading, error } = useData('http://localhost:5000/get-warehouses'); 
 const { goTo } = useCustomNavigate();

 const [filtredStorages, setFiltredStorages] = useState([]);

 useEffect(() => {
  setFiltredStorages(storages || []);
}, [storages]); 


const hadnleFilteredData =(data)=>{
  setFiltredStorages(data);
}

 const HeaderTitles = [
  {name:'Název skladu'},
  {name:'Město'},
  {name:'Akce'},
]

  return (
    <div className="page">
        <div className='page-header'>
        <h2>Sklady</h2>
        <Button style='button addButton' label='Přidat sklad' onClick={()=>goTo('/admin/add-storage')}/>
        </div>
        <Header data={storages} getFiltred={hadnleFilteredData} label={'Vyhledat sklad'}/>
        <List data={filtredStorages} titles={HeaderTitles} type={'storage'}/>
    </div>
  );
}

export default StoragePage;