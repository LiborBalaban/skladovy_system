import '../App.css';
import logoutIcon from '../Images/logout.png';
import ProfileUser from '../Images/profile-user.png';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { useUser } from '../context/UserContext';

const Navbar =()=> {
  const history = useNavigate();
  const { user } = useUser();
 
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
        <span className='logo'>Warehouse App</span>
        </div>
        <div className = "flex navAcc" >
          <div className='profile-container flex'>
          <span>{user}</span>
          <div className='connect'>

          </div>
          <div className='profile flex'>
            <img src={ProfileUser} alt="" />
          </div>
          </div>
        </div>
      </nav>
 
  );
}

export default Navbar;