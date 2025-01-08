import '../App.css';
import home from '../Images/home.png';
import checkout from '../Images/shopping-bag.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import historyImg from '../Images/history.png';
import Import from '../Images/log-in.png';
import Export from '../Images/logout.png';
import Location from '../Images/location-sign.png';
import Supplier from '../Images/parcel.png';
import Categories from '../Images/categories.png';
import Products from '../Images/package.png';
import Employess from '../Images/man.png';
import Setting from '../Images/setting-circle.png';
import Comapny from '../Images/building.png';
import Logout from '../Images/power-off.png';
import { postData } from '../hooks/addToDb';
import useData from '../hooks/loadData';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useUser();
  const { data: company, loading, error } = useData('http://localhost:5000/get-company-name');

  const links = [
    { id: 1, img: Products, name: "Produkty", path: "/fullapp/products" },
    { id: 2, img: checkout, name: "Objednávka", path: "/fullapp/order" },
    { id: 3, img: Categories, name: "Kategorie", path: "/admin/categories" },
    { id: 4, img: home, name: "Sklady", path: "/admin/storages" },
    { id: 5, img: Supplier, name: "Dodavatelé", path: "/admin/suppliers" },
    { id: 6, img: Employess, name: "Zaměstnanci", path: "/admin/employee" },
    { id: 7, img: Import, name: "Naskladnění", path: "/fullapp/stock" },
    { id: 8, img: Export, name: "Vyskladění", path: "/fullapp/stockout" },
    { id: 9, img: historyImg, name: "Historie pohybů", path: "/fullapp/movements" },
    { id: 10, img: Location, name: "Pozice", path: "/admin/positions" },
  ];

  const bottom_links = [
    { id: 1, img: Comapny, name: "Firma", path: "/admin/company-detail" },
    { id: 2, img: Setting, name: "Nastavení", path: "/fullapp/setting" },
  ];

  const handleLinkClick = (path) => {
    navigate(path);
  };

   const logoutUser = (formData) => {
        postData('http://localhost:5000/logout-user', formData);
        handleLinkClick('/login');
      };

  return (
    <aside className="aside flex">
      <div className="asideLogoDiv flex">
        <p>{company.name}</p>
      </div>
      <ul>
        {links.map((link) => (
          (role === 3 || !["/admin/storages", "/admin/suppliers", "/admin/employee", '/admin/positions', '/admin/categories'].includes(link.path)) && (
            <li
              key={link.id}
              className={location.pathname === link.path ? 'active' : ''}
              onClick={() => handleLinkClick(link.path)}
            >
              <span>
                <img src={link.img} alt={link.name} className="asideIcon" />
                {link.name}
              </span>
            </li>
          )
        ))}
      </ul>
      <ul>
      {bottom_links.map((link) => (
          (role === 3 || !["/admin/company-detail"].includes(link.path)) && (
            <li
              key={link.id}
              className={location.pathname === link.path ? 'active' : ''}
              onClick={() => handleLinkClick(link.path)}
            >
              <span>
                <img src={link.img} alt={link.name} className="asideIcon" />
                {link.name}
              </span>
            </li>
          )
        ))}
        <li onClick={()=>logoutUser()}><span><img src={Logout} alt="" className='asideIcon' />Odhlásit se</span></li>
      </ul>
    </aside>
  );
}

export default Sidebar;