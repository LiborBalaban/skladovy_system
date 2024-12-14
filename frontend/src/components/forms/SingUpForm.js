import '../../App.css';
import { useState } from 'react';
import Input from '../inputs/input';
import Button from '../button';

const SingUpForm = ({onSubmit}) => {
    const [formData, setFormData] = useState({
        userName: '',
        userEmail: '',
        userPassword: '',
        comapnyName: '',
      });
      
      const handleInputChange = (name, value) => {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
      };

  return (
    <form onSubmit={handleSubmit} className='form'>
        <Input placeholder='Zadejte Vaše jméno...' name='userName' type='text' label='Vaše jméno:' onChange={handleInputChange}/>
        <Input placeholder='Zadej Váš email...' name='userEmail' type='email' label='Váš Email' onChange={handleInputChange}/>
        <Input placeholder='Zadejte heslo...' name='userPassword' type='password' label='Heslo' onChange={handleInputChange}/>
        <Input placeholder='Zadejte název Vaší firmy...' name='companyName' type='text' label='Název Firmy' onChange={handleInputChange}/>
        <Button type='submit' style='button addButton' label='Zaregistrovat se'/>
    </form>
  );
}
export default SingUpForm;