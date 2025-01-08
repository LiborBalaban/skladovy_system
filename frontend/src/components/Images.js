import '../App.css';
import DeleteButton from '../Images/delete.png';
import EditButton from '../Images/edit.png';
import { Link } from 'react-router-dom';
import img from '../Images/delete_x.png';
import Button from './button';
const Image = ({url, onClick}) => {
  return (
    <div className='flex' onClick={()=>onClick(url)}>
    <img src={url}/>
    <Button label={'x'} style={'flex deleteImageButton'}/>
    </div>
  );
}

export default Image;