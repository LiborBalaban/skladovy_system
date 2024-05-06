import '../App.css';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const ActivateAccount = () => {
  const [code, setCode] = useState(0);
  const history = useNavigate();
  const { userId } = useParams();
  
  
  const activateUser = async () => {
    try {
      const response = await axios.post('http://localhost:5000/activate-user', {
        userId:userId, code:code
      });
      console.log(response.data.message);
      alert(response.data.message);
      history('/login');

    } catch (error) {
      console.error('There was an error!', error);
    }
  };
 
  return (
    <div className='ActivatePage flex'>
      <div className='ActivatePageContainer flex'>
      <h2>Aktivace účtu</h2>
      <div className='ActivatePageInput'>
        <label htmlFor="">Ověřovací kod</label>
        <input type="number" placeholder='Zadejte váš ověřovací kód' value={code} onInput={(e) => {
                  setCode(e.target.value);
                }}/>
      </div>
      <button onClick={activateUser} >Odeslat</button>
      </div>
    </div>
  );
};

export default ActivateAccount;