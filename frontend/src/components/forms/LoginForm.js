import '../../App.css';
import { useState } from 'react';
import Input from '../inputs/input';
import Button from '../button';

const LoginForm = ({onSubmit}) => {
    const [formData, setFormData] = useState({
        userName: '',
        userPassword: '',
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
        <Input placeholder='Zadej Váš email...' name='userEmail' type='email' label='Váš Email' onChange={handleInputChange}/>
        <Input placeholder='Zadejte heslo' name='userPassword' type='password' label='Heslo' onChange={handleInputChange}/>
        <Button type='submit' style='button addButton' label='Přihlásit se'/>
    </form>
  );
}
export default LoginForm;