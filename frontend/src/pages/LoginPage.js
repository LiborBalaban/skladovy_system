import '../App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';
const LoginPage =()=> {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const history = useNavigate();
  
  function isValidEmail(email) {
    const regex = /\S+@\S+\.\S+/;
    const isValid = regex.test(email);
    return isValid;
  }
  
  const check =()=>{
    if(email === ""){
      alert('Nemáte vyplněný email nebo vám zde chybí @');
    }

    if(password === "" || password.length < 5 ){
      alert('Nemáte správně vyplněné heslo');
    }

    const isValid = isValidEmail(email);
    if (!isValid) {
      alert('Nemáte správně zadaný email');
    }

    else{
      login();
    }

  }
  

  const login = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login-user', {
        email:email, password:password
      });
      const token = response.data.token;
      document.cookie = `token=${token}; path=/; Secure; SameSite=Strict`;
      checkTokenAndRedirect();
  
    } catch (error) {
      console.error('There was an error!', error);
      alert("Zadali jste špatný email nebo heslo");
    }
  };
  

  const checkTokenAndRedirect = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get-checktoken", { withCredentials: true });
      const isAuthenticated = response.data.message;
      
      if (isAuthenticated === 'You are authenticated') {
        history("/fullapp");
      } else {
        history("/login");
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
    }
  };


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
  };

  
  return (
    <div className="LoginPage flex">
        <div className='LoginDiv flex'>
            <h2>Přihlašte se</h2>
            <div className='LoginForm flex'>
                <input type="text" placeholder='Email' value={email} onInput={(e) => {
                  setEmail(e.target.value);
                }}/>
                <input type="password" placeholder='Heslo' value={password} onInput={(e) => {
                  setPassword(e.target.value);
                }}/>
                <span onClick={resetPassword}>Zapomněli jste heslo?</span>
                <input type="submit" value={"Přihlásit se"} onClick={check}/>
            </div>
        </div>
    </div>
  );
}

export default LoginPage;