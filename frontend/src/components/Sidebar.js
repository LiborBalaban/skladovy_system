import '../App.css';
import logo from '../Images/logo.png';
import home from '../Images/home.png';
import checkout from '../Images/shopping-bag.png';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import historyImg from '../Images/history.png';
import Import from '../Images/log-in.png';
import Export from '../Images/logout.png';
import Location from '../Images/location-sign.png';
import Supplier from '../Images/parcel.png';
import Categories from '../Images/categories.png';
import Products from '../Images/package.png';
import Employess from '../Images/man.png';

function Sidebar() {
  const history = useNavigate();
  const [warehouses, setWarehouses] = useState([]);
  
  useEffect(() => {
    loadStorages();
  }, []);
  
  const loadStorages = async () =>{
    const data = await fetch('http://localhost:5000/get-storage', {
        method: "GET",
        credentials: "include",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
      });
    const finalData = await data.json();
    const {documents} = finalData;
    setWarehouses(documents.name);
  }


  const productClick = () => {
    history('/fullapp/products');
  };

  const orderClick = () => {
    history('/fullapp/order');
  };

  const categoryClick = () => {
    history('/fullapp/category');
  };

  const storageClick = () => {
    history('/fullapp/storages');
  };

  const supplierClick = () => {
    history('/fullapp/suppliers');
  }

  const employeeClick = () =>{
    history('/fullapp/employee');
  }

  const stockClick = () =>{
    history('/fullapp/stock');
  }

  const positionClick = () =>{
    history('/fullapp/positions');
  }

  const historymovementsClick = () =>{
    history('/fullapp/movements');
  }

  const historyStockOutClick = () =>{
    history('/fullapp/stockout');
  }
  return (
  
      <aside className = 'aside'>
        <div className = "asideLogoDiv flex">
        <p>{warehouses}</p>
        </div>
        <ul>
          
          
          
            <li><span onClick={productClick}><img src={Products} alt="" className = "asideIcon" />Produkty</span></li>
            <li><span onClick={orderClick}><img src={checkout} alt="" className = "asideIcon" />Objednávky</span></li>
            <li><span  onClick={storageClick}><img src={home} alt="" className = "asideIcon" />Sklad</span></li>
            <li><span href="" onClick={positionClick}><img src={Location} alt="" className = "asideIcon" />Pozice skladů</span></li>
            <li><span href="" onClick={stockClick}><img src={Import} alt="" className = "asideIcon" />Příjemka</span></li>
            <li><span href="" onClick={historyStockOutClick}><img src={Export} alt="" className = "asideIcon" />Výdejka</span></li>
            <li><span href="" onClick={historymovementsClick}><img src={historyImg} alt="" className = "asideIcon" />Historie pohybů</span></li>
            <li><span href="" onClick={categoryClick}><img src={Categories} alt="" className = "asideIcon" />Kategorie</span></li>
            <li><span href="" onClick={supplierClick}><img src={Supplier} alt="" className = "asideIcon" />Dodavatelé</span></li>
            <li><span href="" onClick={employeeClick}><img src={Employess} alt="" className = "asideIcon" />Zaměstnanci</span></li>
        </ul>
      </aside>

  );
}

export default Sidebar;