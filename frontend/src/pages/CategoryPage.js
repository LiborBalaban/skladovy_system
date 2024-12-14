import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import Button from '../components/button';
import Item from '../components/item';
import useData from '../hooks/loadData';
import useCustomNavigate from '../hooks/navigate';

function CategoryPage() {

  const { goTo } = useCustomNavigate();
  
  const { data:categories, loading, error } = useData('http://localhost:5000/get-categories'); 

  if (loading) return <p>Načítám kategorie...</p>;
  if (error) return <p>{error}</p>;
 
  return (
    <div className="page">
        <div className='page-header'>
        <h2>Kategorie</h2>
        <Button label = 'Přidat' onClick={() => goTo('/fullapp/addcategory')} style={'button addButton'} type={('button')}/>
        </div>
        <div className='page-items'>
        {
          categories.map((category, index) =>{
            return(
            <Item key = {index} name = {category.name} link = {`/fullapp/addcategory/${category.id}`}/>
            )
          })
        }
        </div>
    </div>
  );
}

export default CategoryPage;