import '../App.css';
import DeleteButton from '../Images/delete.png';
import SearchButton from '../Images/search-interface-symbol.png';
import EditButton from '../Images/edit.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileIMG from '../Images/profile-user.png';
const Employee = ({name, id, email, storage, surname}) => {

  const deleteEmployee = (employeeId) => {
    employeeId = id;
    fetch(`http://localhost:5000/delete-category/${employeeId}`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      else{
        window.location.reload();
      }
      return response.json();
      
    })
    .then(data => {
      console.log(data); // Zpracování odpovědi od serveru po úspěšném smazání
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
  }
  
  return (
    <div className="Category flex">
        <div className='flex profileName' >
        <img src={ProfileIMG} alt="" />
        <h2>{name + " " + surname}</h2>
        </div>
        <div className='flex employee_info'>
            <span>{email}</span>
            <span>{storage}</span>
        </div>
        <div className='category_icons flex'>
        <Link to={{ pathname: '/fullapp/update-category', state: { id: id } }}>
            <img src={EditButton} alt="" />
        </Link>
        <img src={SearchButton} alt=""/>
        <img src={DeleteButton} alt="" onClick={deleteEmployee}/>
        </div>
    </div>
  );
}

export default Employee;