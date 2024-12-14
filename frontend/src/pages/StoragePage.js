import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import Button from '../components/button';
import axios from 'axios';
import Item from '../components/item';
import useData from '../hooks/loadData';
import useCustomNavigate from '../hooks/navigate';
function StoragePage() {

 const { data:storages, loading, error } = useData('http://localhost:5000/get-warehouses'); 
 const { goTo } = useCustomNavigate();
  return (
    <div className="CategoryPage">
        <div className='CategoryPageHeader'>
        <h2>Sklady</h2>
        <Button style='button addButton' label='Přidat sklad' onClick={()=>goTo('/admin/add-storage')}/>
        </div>
        <div className='Storages flex'>
        {
          storages.map(storage => {
            return(
              <Item name={storage.name} info={storage.city} link={`/admin/add-storage/${storage.id}`}/>
            )
          })
        }
        </div>
    </div>
  );
}

export default StoragePage;