import '../App.css';
import React from "react";
import { Link } from 'react-router-dom';

const Storage = (props) => {
  
  
  return (
   
      <div className = "Storage flex" >
      <h2>{props.name}</h2>
        <div className='flex StorageInfo'>
        <label htmlFor="">Telefon:</label>
        <span>{props.phone}</span>
        </div>

        <div className='flex StorageInfo'>
        <label htmlFor="">Adresa:</label>
        <span>{props.address}</span>
        </div>

        <div className='flex StorageInfo'>
        <label htmlFor="">PSČ:</label>
        <span>{props.psc}</span>
        </div>

        <div className='flex StorageInfo'>
        <label htmlFor="">Město:</label>
        <span>{props.city}</span>
        </div>
        <div className='flex buttonsStorage'>
        <Link to={`/fullapp/update-storage/${props.id}`} className = 'editButton'>
          Edit
        </Link>
      </div>
    </div>
  );
};



export default Storage;