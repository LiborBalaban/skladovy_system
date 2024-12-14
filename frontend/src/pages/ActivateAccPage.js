import '../App.css';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postData } from '../hooks/addToDb';
import useCustomNavigate from '../hooks/navigate';


const ActivateAccount = () => {
  const { goTo } = useCustomNavigate();
  const { token } = useParams();
  
    const onload = () => {
    postData(`http://localhost:5000/activate-user/${token}`);
    goTo('/login')
    };
          
    useEffect(() => {
    onload();
    }, []);
 
  return (
    <div className='ActivatePage flex'>
      <div className='loading'>

      </div>
    </div>
  );
};

export default ActivateAccount;