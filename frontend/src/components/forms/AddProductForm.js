import '../../App.css';
import { useState, useEffect } from 'react';
import Input from '../inputs/input';
import Select from '../inputs/select';
import Textarea from '../inputs/textarea';
import Button from '../button';
import useData from '../../hooks/loadData';

const AddProductForm = ({onSubmit, data}) => {
    const [formData, setFormData] = useState({
        productName: '',
        productDescription: '',
        productQuantity: '',
        productCategoryId: '',
        productStorageId: '',
        productCode: '',
        productPositionId: '',
      });

      useEffect(() => {
                    if (data) {
                      setFormData({
                        productName: data.name,
                        productDescription: data.description,
                        productQuantity: data.totalStock,
                        productCategoryId: data.categoryId,
                        productStorageId: data.storageId,
                        productCode: data.code,
                        productPositionId:data.positionId,
                      });
                    }
                  }, [data]);

      const { data:categories, loading, error } = useData('http://localhost:5000/get-categories'); 
      const { data:positions } = useData('http://localhost:5000/get-positions'); 
      const { data:storages } = useData('http://localhost:5000/get-warehouses'); 
      
      const handleInputChange = (name, value) => {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleSelectCategory = (selectedId) => {
        setFormData((prevData) => ({
          ...prevData,
          productCategoryId: selectedId,
        }));
      };

      const handleSelectStorage = (selectedId) => {
        setFormData((prevData) => ({
          ...prevData,
          productStorageId: selectedId,
        }));
      };
      const handleSelectPosition = (selectedId) => {
        setFormData((prevData) => ({
          ...prevData,
          productPositionId: selectedId,
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
        <Input placeholder='Zadej název produktu...' name='productName' type='text' label='Název produktu' onChange={handleInputChange} value={formData.productName}/>
        <Textarea placeholder='Zadejte informace o produktu...' name = 'productDescription' label='Popis produktu' onChange={handleInputChange} value={formData.productDescription}/>
        <div className='form-block'>
        <Select label='Vyber kategorii' data={categories} onSelect={handleSelectCategory} selected={formData.productCategoryId}/>
        <Input placeholder='Zadej množství produktu...' name='productQuantity' type='number' label='Množství' onChange={handleInputChange} value={formData.productQuantity}/>
        </div>
        <div className='form-block'>
        <Input placeholder='Zadej kód produktu...' name='productCode' type='number' label='Kód produktu' onChange={handleInputChange} value={formData.productCode}/>
        <Select label='Vyber pozici' data={positions} onSelect={handleSelectPosition} selected={formData.productPositionId}/>
        </div>
        <Button type='submit' label='Uložit' style='button addButton'/>
        </div>
    </form>
  );
}
export default AddProductForm;