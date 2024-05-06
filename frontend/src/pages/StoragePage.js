import '../App.css';
import Storage from '../components/Storage';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
function StoragePage() {
 const history = useNavigate();
 const [storages, setStorages] = useState([]);
  const handleClick = () => {
   history('/fullapp/add-storage');
  };

 useEffect(()=>{
 loadStorages();
 }, [])
  
  
  const loadStorages = async () =>{
    try {
      const response = await axios.get("http://localhost:5000/get-storages", { withCredentials: true });
      const storages = response.data.documents;
      setStorages(storages);
      
    } catch{
      console.error("Chyba při získávání skladů");
    }
  }


  return (
    <div className="CategoryPage">
        <div className='CategoryPageHeader'>
        <h2>Sklady</h2>
        </div>
        <div className='Storages flex'>
       
        <Storage key = {storages.index} name = {storages.name} phone = {storages.phone} address = {storages.address} psc = {storages.psc} city = {storages.city} id = {storages._id}/>
        
        
        </div>
    </div>
  );
}

export default StoragePage;