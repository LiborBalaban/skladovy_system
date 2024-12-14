import '../../App.css';
import { useState, useEffect } from 'react';
import Input from '../inputs/input';
import Select from '../inputs/select';
import Button from '../button';
import useData from '../../hooks/loadData';

const AddEmployeeForm = ({onSubmit, data}) => {
    const [formData, setFormData] = useState({
        employeeEmail: '',
        storageId: '',
        roleId:'',
      });
      const { data:storages, loading, error } = useData('http://localhost:5000/get-warehouses'); 
      
      const { data:roles } = useData('http://localhost:5000/get-roles'); 
      
      useEffect(() => {
                    if (data) {
                      setFormData({
                        employeeEmail: data.email,
                        storageId: data.storageId,
                        roleId: data.roleId
                      });
                    }
                  }, [data]);

      const handleInputChange = (name, value) => {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleSelect = (selectedId) => {
        setFormData((prevData) => ({
          ...prevData,
          storageId: selectedId,
        }));
      };

      const handleRoleSelect = (selectedId) => {
        setFormData((prevData) => ({
          ...prevData,
          roleId: selectedId,
        }));
      };

    
      const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
      };

  return (
    <form onSubmit={handleSubmit} className='form'>
        <h2>Zaměstnanec</h2>
        <Input placeholder='Zadej email zaměstnance...' name='employeeEmail' type='email' label='Email zaměstnance' onChange={handleInputChange} value={formData.employeeEmail}/>
        <Select label='Vyber roli' data={roles} onSelect={handleRoleSelect} selected={formData.roleId}/>
        <Select label='Vyber sklad' data={storages} onSelect={handleSelect} selected={formData.storageId}/>
        <Button type='submit' label='Uložit' style='button addButton'/>
    </form>
  );
}
export default AddEmployeeForm;