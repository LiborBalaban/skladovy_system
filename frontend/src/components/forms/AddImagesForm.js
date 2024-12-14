import '../../App.css';
import { useState } from 'react';
import File from '../inputs/file';
import Textarea from '../inputs/textarea';
import Button from '../button';

const AddImagesForm = ({onSubmit, data}) => {
    const [formData, setFormData] = useState({productImage:[]});
      const handleFileChange = (file) => {
        setFormData((prevData) => ({
          ...prevData,
          productImage: file, // Nastavení nahraného souboru
        }));
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
      };

  return (
    <form onSubmit={handleSubmit} className='form'>
        <h2>Obrázky produktu</h2>
        <div className='ProductImagesForm flex'>
            <File onChange={handleFileChange}/>
        </div>
        <Button type='button' style='button addButton' label='Uložit obrázek' onClick={()=>{console.log(formData)}}/>
    </form>
  );
}
export default AddImagesForm;