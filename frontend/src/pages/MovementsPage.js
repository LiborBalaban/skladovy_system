import '../App.css';
import '../responsive.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import StockInfo from '../components/StockInfo';
import useData from '../hooks/loadData';
import List from '../components/List';
import { useUser } from '../context/UserContext';
const MovementsPage = () => {
  const [all_movements, setAllMovements] = useState([]);
  const { data: movements, loading, error } = useData('http://localhost:5000/get-all-movements');
  const { data: user_movements} = useData('http://localhost:5000/get-user-movements');
  const { role } = useUser();
 const HeaderTitles = [
  {name:'Zaměstnanec'},
  {name:'Počet položek'},
  {name:'Dodavatel'},
  {name:'Datum'},
  {name:'Typ'},
  {name:'Sklad'},
]

useEffect(() => {
    if (role === 3) {
      setAllMovements(movements);
    }
    else{
      setAllMovements(user_movements);
    }
  }, [movements, user_movements]);

  return (
    <div className="page">
        <div className='page-header'>
        <h2>Pohyby produktů</h2>
        </div>
        <List type={'moves'} data={all_movements} titles={HeaderTitles}/>
        </div>
  );
}

export default MovementsPage;