import '../App.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SingUpForm from '../components/forms/SingUpForm';
import { postData } from '../hooks/addToDb';

const SingupPage = () => {


  const handleSingUp = (formData) => {
        postData('http://localhost:5000/save-user', formData);
      };

  return (
    <div className="LoginPage flex">
        <div className='LoginDiv flex'>
            <h2>Založte si účet</h2>
            <SingUpForm onSubmit={handleSingUp}/>
        </div>
    </div>
  );
}

export default SingupPage;