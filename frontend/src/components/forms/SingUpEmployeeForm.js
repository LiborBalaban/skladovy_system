import '../../App.css';
import { useState } from 'react';
import Input from '../inputs/input';
import Button from '../button';
import { useNavigate, useParams } from 'react-router-dom';
const SingUpEmployeeForm = ({onSubmit}) => {
  const { token } = useParams();
  const [formData, setFormData] = useState({
        userName: '',
        userPassword: '',
        url_token: token,
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
      <h2>Registrace do firmy</h2>
        <Input placeholder='Zadejte Vaše jméno...' name='userName' type='text' label='Vaše jméno:' onChange={handleInputChange}/>
        <Input placeholder='Zadejte heslo...' name='userPassword' type='password' label='Heslo' onChange={handleInputChange}/>
        <Button type='submit' style='button addButton' label='Zaregistrovat se'/>
    </form>
  );
}
export default SingUpEmployeeForm;