import '../../App.css';
import React, { useState, useEffect } from 'react';
import Input from '../inputs/input';
import Button from '../button';

const AddWarehouseForm = ({onSubmit, data}) => {
    const [formData, setFormData] = useState({
        warehouseName: '',
        warehousePhone: '',
        warehouseAddress: '',
        warehouseZip: '',
        warehouseCity: '',
      });

      useEffect(() => {
        if (data) {
          setFormData({
            warehouseName: data.name,
            warehousePhone: data.phone,
            warehouseAddress: data.address,
            warehouseZip: data.psc,
            warehouseCity: data.city,
          });
        }
      }, [data]);
      
      const handleInputChange = (name, value) => {
        setFormData((prevData) => ({
          ...prevData,
          [name]:value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
      };

  return (
    <form onSubmit={handleSubmit} className='form'>
        <h2>Sklad</h2>
        <Input placeholder='Zadej název skladu...' name='warehouseName' type='text' label='Název skladu' onChange={handleInputChange} value={formData.warehouseName}/>
        <Input placeholder='Zadej telefon skladu...' name='warehousePhone' type='number' label='Telefon skladu' onChange={handleInputChange} value={formData.warehousePhone}/>
        <Input placeholder='Zadej adresu skladu...' name='warehouseAddress' type='text' label='Adresa skladu' onChange={handleInputChange} value={formData.warehouseAddress}/>
        <Input placeholder='Zadej PSČ skladu...' name='warehouseZip' type='text' label='Poštovní směrovací číslo skladu' onChange={handleInputChange} value={formData.warehouseZip}/>
        <Input placeholder='Zadej město skladu...' name='warehouseCity' type='text' label='Město skladu' onChange={handleInputChange} value={formData.warehouseCity}/>
        <Button type='submit' label='Uložit' style='button addButton'/>
    </form>
  );
}
export default AddWarehouseForm;