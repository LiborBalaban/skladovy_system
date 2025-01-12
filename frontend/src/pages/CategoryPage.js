import '../App.css';
import '../responsive.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import Button from '../components/button';
import Item from '../components/item';
import useData from '../hooks/loadData';
import useCustomNavigate from '../hooks/navigate';
import List from '../components/List';
import Header from '../components/Header';
import useDeleteData from '../hooks/deleteFunction';

function CategoryPage() {

  const { goTo } = useCustomNavigate();
  const {deleteData} = useDeleteData();
  const { data:categories, loading, error } = useData('http://localhost:5000/get-categories'); 
  const [filtredCategories, setFiltredCategories] = useState([]);

 const HeaderTitles = [
  {name:'Název'},
  {name:'Akce'},
]

useEffect(() => {
  setFiltredCategories(categories || []);
}, [categories]); 


const hadnleFilteredData =(data)=>{
  setFiltredCategories(data);
}

const handleDelete = async (url) => {
  const confirmed = window.confirm("Opravdu chcete smazat tento záznam?");
  if (confirmed) {
    try {
      await deleteData(url);
    } catch (err) {
      console.error('Chyba při mazání:', err);
    }
  } else {
    console.log("Mazání zrušeno");
  }
};

  if (loading) return <p>Načítám kategorie...</p>;
  if (error) return <p>{error}</p>;

 
  return (
    <div className="page">
        <div className='page-header'>
        <h2>Kategorie</h2>
        <Button label = 'Přidat' onClick={() => goTo('/admin/category')} style={'button addButton'} type={('button')}/>
        </div>
        <Header data={categories} getFiltred={hadnleFilteredData} label={'Vyhledat kategorii'}/>
        <List data={filtredCategories} titles={HeaderTitles} type={'category'} deleteFunction={handleDelete}/>
    </div>
  );
}

export default CategoryPage;