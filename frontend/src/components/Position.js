import '../App.css';
import React from "react";
import DeleteButton from '../Images/delete.png';
import SearchButton from '../Images/search-interface-symbol.png';
import EditButton from '../Images/edit.png';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Position = ({name}) => {
  const history = useNavigate();
  
  
  
  return (
      <div className = "PositonCard flex" >
        <span>{name}</span>
        <img src={DeleteButton} alt="" />
        </div>
  );
};



export default Position;