import '../App.css';
import Category from '../components/Category';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
function CategoryPage() {
  const history = useNavigate();
  const [categories, setCategories] = useState([]);
  const handleClick = () => {
    history('/fullapp/addcategory');
  };

 useEffect(()=>{
  loadCategories();
 }, [])
  
 
  const loadCategories = async () =>{
    try {
      const response = await axios.get("http://localhost:5000/get-categories", { withCredentials: true });
      const categories = response.data.categories;
      setCategories(categories);
      
    } catch{
      console.error("Chyba při získávání dodavatelů");
    }
  }

  

  return (
    <div className="CategoryPage">
        <div className='CategoryPageHeader'>
        <h2>Kategorie</h2>
       <button className='addButton' onClick={handleClick}>Přidat</button>
        </div>
        <div className='Categories flex'>
        {
          categories.map((category, index) =>{
            return(
            <Category key = {index} name = {category.name} id = {category._id} reload = {loadCategories}/>
            )
          })
        }
        </div>
    </div>
  );
}

export default CategoryPage;