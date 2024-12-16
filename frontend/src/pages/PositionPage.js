import '../App.css';
import Category from '../components/Category';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Position from '../components/Position';
import useData from '../hooks/loadData';
import { postData } from '../hooks/addToDb';
import Input from '../components/inputs/input';
import Button from '../components/button';
import Select from '../components/inputs/select';
import Item from '../components/item';

function PositionPage() {
  const [formData, setFormData] = useState({
    positionName:'',
    storageId:''
  });
  //const [positions, savePositions] = useState([]);

const savePosition =()=>{
  console.log(formData);
  postData('http://localhost:5000/save-position', formData);
}

const handleInputChange = (name, value) => {
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

const handleSelect = (selectedId) => {
  setFormData((prevData) => ({
    ...prevData,
    storageId: selectedId,
  }));
};
  
  const { data:storages, loading, error } = useData('http://localhost:5000/get-warehouses'); 
  const { data:positions } = useData('http://localhost:5000/get-positions'); 
  

  return (
    <div className="CategoryPage PositionPage">
        <div className='PositionPageHeader'>
        <h2>Pozice skladů</h2>
        <div className='flex positiondAdd'>
        <Input placeholder={'Zadejte název pozice...'} label={'Přidat pozici'} name={'positionName'} onChange={handleInputChange}/>
        <Select data={storages} label={'Vyberte sklad'} onSelect={handleSelect}/>
        <Button style={'button addButton'} label={'Přidat pozici'} onClick={savePosition}/>
        </div>
        </div>
        <div className='Positions flex'>
        <h2>Pozice</h2>
      {
        positions.map(position =>{
          return (
            <Item name={position.name}/>
          )
        })
      }
        </div>
    </div>
  );
}

export default PositionPage;