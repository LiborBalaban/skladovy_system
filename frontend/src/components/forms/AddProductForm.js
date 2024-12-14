import '../../App.css';
import { useState } from 'react';
import Input from '../inputs/input';
import Select from '../inputs/select';
import Textarea from '../inputs/textarea';
import Button from '../button';
import useData from '../../hooks/loadData';

const AddProductForm = ({onSubmit}) => {
    const [formData, setFormData] = useState({
        productName: '',
        productDescription: '',
        productPrice: '',
        productQuantity: '',
        categoryId: '',
        productCode: '',
      });
      const { data:categories, loading, error } = useData('http://localhost:5000/get-categories'); 
      
      const handleInputChange = (name, value) => {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleSelect = (selectedId) => {
        setFormData((prevData) => ({
          ...prevData,
          categoryId: selectedId,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
      };

  return (
    <form onSubmit={handleSubmit} className='form'>
        <h2>Produkt</h2>
        <div className='flex form-container'>
        <div className='form-block'>
        <Input placeholder='Zadej název produktu...' name='productName' type='text' label='Název produktu' onChange={handleInputChange}/>
        <Select label='Vyber kategorii' data={categories} onSelect={handleSelect}/>
        <Input placeholder='Zadej množství produktu...' name='productQuantity' type='number' label='Množství' onChange={handleInputChange}/>
        <Textarea placeholder='Zadejte informace o produktu...' name = 'productDescription' label='Popis produktu' onChange={handleInputChange}/>
        <Button type='submit' label='Uložit' style='button addButton'/>
        </div>
        <div className='form-block'>
        <Input placeholder='Zadej cenu produktu...' name='productPrice' type='text' label='Cena produktu' onChange={handleInputChange}/>
        <Input placeholder='Zadej kód produktu...' name='productCode' type='number' label='Kód produktu' onChange={handleInputChange}/>
        </div>
        </div>
    </form>
  );
}
export default AddProductForm;