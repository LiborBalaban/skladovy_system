import '../../App.css';
import { useState, useEffect } from 'react';
import Input from '../inputs/input';
import Select from '../inputs/select';
import Textarea from '../inputs/textarea';
import Button from '../button';

const AddCategoryForm = ({onSubmit, data}) => {
    const [formData, setFormData] = useState({
        categoryName: '',
        categoryDescription: '',
      });
      
      const handleInputChange = (name, value) => {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

       useEffect(() => {
              if (data) {
                setFormData({
                  categoryName: data.name,
                  categoryDescription: data.description,
                });
              }
            }, [data]);

      const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
      };

  return (
    <form onSubmit={handleSubmit} className='form'>
        <h2>Kategorie</h2>
        <Input placeholder='Zadej název kategorie...' name='categoryName' type='text' label='Název kategorie' onChange={handleInputChange} value={formData.categoryName}/>
        <Textarea placeholder='Zadejte informace o kategorii...' name = 'categoryDescription' label='Popis kategorie' onChange={handleInputChange} value={formData.categoryDescription}/>
        <Button type='submit' label='Uložit' style='button addButton'/>
    </form>
  );
}
export default AddCategoryForm;