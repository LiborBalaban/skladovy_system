import '../App.css';
import logo from '../Images/logo.png';
import logoutIcon from '../Images/logout.png';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'universal-cookie';

const Navbar =()=> {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const cookies = new Cookies();
 
  
useEffect(() => {
  loadEmail();
}, []);


const loadEmail = async () => {
  try {
    const response = await fetch("http://localhost:5000/get-useremail", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Nepodařilo se načíst email uživatele.');
    }

    const data = await response.json();
    const { documents } = data;
    setEmail(documents);
  } catch (error) {
    console.error('Chyba při načítání emailu:', error);
  }
}


const logout = () => {
  cookies.remove("token", { path: "/" });
  history('/login');
};

let indexMenu = 0;
const menu = () =>{
  indexMenu++;
  const aside = document.querySelector('aside');
  if(indexMenu === 1){
  aside.style.display = "flex";
  }
  if (indexMenu === 2){
  aside.style.display = "none";
  indexMenu = 0;
  }
}
  
  return (
   
      <nav className = "flex">
        <div className = "flex nav-logo">
        <div className='menu flex' onClick={menu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <span className='logo'>Storage <br /> app</span>
        <ul className = "flex">
            <li><a href="">Úvodní stránka</a></li>
            <li><a href="">Eshop</a></li>
        </ul>
        </div>
        <div className = "flex navAcc" >
            <span>{email.charAt(0).toLocaleUpperCase()}</span>
            <p>{email}</p>
            <img src={logoutIcon} alt="" onClick={logout}/>
        </div>
      </nav>
 
  );
}

export default Navbar;