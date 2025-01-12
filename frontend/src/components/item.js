import '../App.css';
import DeleteButton from '../Images/delete.png';
import EditButton from '../Images/edit.png';
import { Link } from 'react-router-dom';
import Input from './inputs/input';
const Item = ({name, link, info, deleteFunction}) => {
  return (
    <div className="item">
      <div className='flex itemContainer'>
      <div className='checkbox-input'>
        <Input type={'checkbox'}/>
        </div>
        <h2>{name}</h2>
        </div>
        <span className='itemInfo'>{info}</span>
        <div className='item_icons'>
        <Link to={link} className='editButton flex'>
            <img src={EditButton} alt="" />
            <span>Editovat</span>
        </Link>
        <div className='deleteItemButton editButton flex'>
        <img src={DeleteButton} alt="" onClick={deleteFunction}/>
        <span>Smazat</span>
        </div>
        </div>
    </div>
  );
}

export default Item;