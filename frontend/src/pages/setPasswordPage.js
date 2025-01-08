import '../App.css';
import '../responsive.css';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const SetPasswordPage = () => {
  const [password, setPassword] = useState(''); // Stavová proměnná pro zprávu
  const history = useNavigate(); // Instance pro historii navigace
  const { userId } = useParams();
 
 
  const check =()=>{
    if (password.length < 5){
        alert('Vaše heslo je příliš krátké!')
    }
    else{
      resetPassword();
    }

  }
  
  

  const resetPassword = async () => {
    try {
      console.log(userId + password);
      const response = await axios.put('http://localhost:5000/reset-password', {
        userId:userId, password:password
      });
      console.log(response.data.msg);
      alert(response.data.msg);
      history('/login');

    } catch (error) {
      console.error('There was an error!', error);
    }
  };
 
  return (
    <div className='ActivatePage flex'>
      <div className='ActivatePageContainer flex'>
      <h2>Změna hesla</h2>
      <div className='ActivatePageInput'>
        <label htmlFor="">Nové heslo:</label>
        <input type="password" placeholder='Zadejte nové heslo...' value={password} onInput={(e) => {
                  setPassword(e.target.value);
                }}/>
      </div>
      <button onClick={check} >Odeslat</button>
      </div>
    </div>
  );
};

export default SetPasswordPage;