import '../App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import LoginForm from '../components/forms/LoginForm';
import { postData } from '../hooks/addToDb';
import useCustomNavigate from '../hooks/navigate';

const LoginPage =()=> {

const { goTo } = useCustomNavigate();
const { loginUser } = useUser(); 


const handleLogin = async(formData) => {
        const result = await postData('http://localhost:5000/login-user', formData);
        loginUser(result);
        goTo('/fullapp');
      };


  
/*
  const resetPassword = async () => {
    try {
      if (email === "") {
        alert("Vyplňte email a zkuste to znovu");
      } else {
        const response = await axios.post('http://localhost:5000/send-resetpassword-email', {
          email: email
        });
        console.log(response.data.msg);
        alert(response.data.msg);
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };*/

  
  return (
    <div className="LoginPage flex">
        <div className='LoginDiv flex'>
            <h2>Přihlašte se</h2>
            <LoginForm onSubmit={handleLogin}/>
        </div>
    </div>
  );
}

export default LoginPage;