import '../../App.css';
import { useState, useEffect } from 'react';
import Input from '../inputs/input';
import Textarea from '../inputs/textarea';
import Button from '../button';

const CompanyForm = ({onSubmit, data}) => {
    const [formData, setFormData] = useState({
        companyName: '',
        companyEmail: '',
        companyPhone: '',
        companyAddress: '',
        companyZip:'',
        companyCity:''
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
                    companyName: data.name,
                    companyEmail: data.email,
                    companyPhone: data.phone,
                    companyAddress: data.address,
                    companyZip:data.psc,
                    companyCity:data.city
                });
            }
      }, [data]);

      const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
      };

  return (
    <form onSubmit={handleSubmit} className='form'>
        <h2>Moje firma</h2>
        <Input placeholder='Zadej název firmy...' name='companyName' type='text' label='Název firmy' onChange={handleInputChange} value={formData.companyName}/>
        <Input placeholder='Zadej email na firmu...' name='companyEmail' type='email' label='Email firmy' onChange={handleInputChange} value = {formData.companyEmail}/>
        <Input placeholder='Zadej telefonní číslo firmy...' name='companyPhone' type='text' label='Telefonní číslo firmy' onChange={handleInputChange} value={formData.companyPhone}/>
        <Input placeholder='Zadej adresu firmy...' name='companyAddress' type='text' label='Adresa firmy' onChange={handleInputChange} value={formData.companyAddress}/>
        <Input placeholder='Zadej město firmy...' name='companyCity' type='text' label='Město firmy' onChange={handleInputChange} value={formData.companyCity}/>
        <Input placeholder='Zadej PSČ firmy...' name='companyZip' type='text' label='PSČ' onChange={handleInputChange} value={formData.companyZip}/>
        <Button type='submit' label='Uložit' style='button addButton' />
    </form>
  );
}
export default CompanyForm;