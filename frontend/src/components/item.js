import '../App.css';
import DeleteButton from '../Images/delete.png';
import EditButton from '../Images/edit.png';
import { Link } from 'react-router-dom';
const Item = ({name, link, deleteFunction, info}) => {
  return (
    <div className="item">
        <h2>{name}</h2>
        <span>{info}</span>
        <div className='item_icons'>
        <Link to={link}>
            <img src={EditButton} alt="" />
        </Link>
        <img src={DeleteButton} alt="" onClick={deleteFunction}/>
        </div>
    </div>
  );
}

export default Item;