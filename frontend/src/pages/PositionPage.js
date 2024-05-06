import '../App.css';
import Category from '../components/Category';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Position from '../components/Position';
function PositionPage() {
  const history = useNavigate();
  const [position, setPosition] = useState([]);
  const [name, setName] = useState("");
  const [positions, setPositions] = useState([]);
  const [storages, setStorages] = useState([]);
  const [storageID, setStorageID] = useState([]);
  const handleClick = () => {
    history('/fullapp/addcategory');
  };

 useEffect(()=>{
  loadPositions();
 }, [])
 

  const loadPositions = async () =>{
    try {
      const response = await axios.get('http://localhost:5000/get-positions', { withCredentials: true });
      const positions = response.data.documents;
      setPositions(positions);
      
    } catch{
      console.error("Chyba při získávání dodavatelů");
    }
  }
  
  
  const addToDB = async () => {
    try {
      const response = await axios.post('http://localhost:5000/save-position', {
        name:name
      }, {
        withCredentials: true
      });
      console.log('Úspěšně uloženo:', response.data.msg);
      loadPositions();
  
    } catch (error) {
      console.error('Chyba při ukládání:', error);
    }
  };


  return (
    <div className="CategoryPage PositionPage">
        <div className='PositionPageHeader'>
        <h2>Pozice skladů</h2>
        <div className='flex positiondAdd'>
        <div className='editInput positionInput'>
            <label htmlFor="">Přidat pozici</label>
            <input type="text" placeholder='Zadej název skladu' value={name} onInput={(e) => {
                  setName(e.target.value);
                }}/>
        </div>  
        <button className='addButton' onClick={addToDB}>Přidat</button>
        </div>
        </div>
        <div className='Positions flex'>
        {
          positions.map((position, index) =>{
            return(
            <Position key = {index} name = {position.name} id = {position._id}/>
            )
          })
        }
        </div>
    </div>
  );
}

export default PositionPage;