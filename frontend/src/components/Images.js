import '../App.css';
import DeleteButton from '../Images/delete.png';
import EditButton from '../Images/edit.png';
import { Link } from 'react-router-dom';
import Button from './button';
const Image = ({url, onClick}) => {
  return (
    <div className='flex'>
    <img src={url}/>
    <Button label={'Smazat'} style={'button deleteButton'}/>
    </div>
  );
}

export default Image;