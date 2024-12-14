import '../../App.css';
import { useState, useEffect } from 'react';
import Input from '../inputs/input';
import Textarea from '../inputs/textarea';
import Button from '../button';

const AddSupplierForm = ({onSubmit, data}) => {
    const [formData, setFormData] = useState({
        supplierName: '',
        supplierEmail: '',
        supplierPhone: '',
        supplierDescription: '',
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
                    supplierName: data.name,
                    supplierEmail: data.email,
                    supplierPhone: data.phone,
                    supplierDescription: data.description,
                });
            }
      }, [data]);

      const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
      };

  return (
    <form onSubmit={handleSubmit} className='form'>
        <h2>Dodavatel</h2>
        <Input placeholder='Zadej název dodavatele...' name='supplierName' type='text' label='Název dodavatele' onChange={handleInputChange} value={formData.supplierName}/>
        <Input placeholder='Zadej email dodavatele...' name='supplierEmail' type='email' label='Email dodavatele' onChange={handleInputChange} value = {formData.supplierEmail}/>
        <Input placeholder='Zadej telefonní číslo dodavatele...' name='supplierPhone' type='text' label='Telefonní číslo dodavatele' onChange={handleInputChange} value={formData.supplierPhone}/>
        <Textarea placeholder='Zadejte informace o dodavateli...' name = 'supplierDescription' label='Popis Dodavatele' onChange={handleInputChange} value={formData.supplierDescription}/>
        <Button type='submit' label='Uložit' style='button addButton' />
    </form>
  );
}
export default AddSupplierForm;