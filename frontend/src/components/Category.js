import '../App.css';
import DeleteButton from '../Images/delete.png';
import SearchButton from '../Images/search-interface-symbol.png';
import EditButton from '../Images/edit.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Category = (props) => {


  const deleteCategory = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/delete-category/${props.id}`, { withCredentials: true });
      props.reload();
    } catch (error) {
      console.error('Chyba při provádění DELETE požadavku:', error);
    }
  };

  
  return (
    <div className="Category flex">
        <h2>{props.name}</h2>
        <div className='category_icons flex'>
        <Link to={`/fullapp/addcategory/${props.id}`}>
            <img src={EditButton} alt="" />
        </Link>
        <img src={SearchButton} alt=""/>
        <img src={DeleteButton} alt="" onClick={deleteCategory}/>
        </div>
    </div>
  );
}

export default Category;