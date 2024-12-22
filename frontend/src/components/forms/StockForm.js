import '../../App.css';
import { useState, useEffect } from 'react';
import Input from '../inputs/input';
import Select from '../inputs/select';
import Textarea from '../inputs/textarea';
import Button from '../button';
import useData from '../../hooks/loadData';

const StockForm = ({onSubmit, data}) => {
    const { data:suppliers} = useData('http://localhost:5000/get-suppliers'); 
    const { data:storages} = useData('http://localhost:5000/get-warehouses'); 
    const [formData, setFormData] = useState({
        stockSupplierId: '',
        stockDescription: '',
        stockNumber:'',
        stockStorageId:''
      });
      
      const handleInputChange = (name, value) => {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleSelectSupplier = (selectedId) => {
        setFormData((prevData) => ({
          ...prevData,
          stockSupplierId: selectedId,
        }));
      };

      const handleSelectStorage = (selectedId) => {
        setFormData((prevData) => ({
          ...prevData,
          stockStorageId: selectedId,
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
    <form onSubmit={handleSubmit} className='StockForm flex'>
        <Select data={suppliers} label={'Dodavatelé'} onSelect={handleSelectSupplier}/> 
        <Select data={storages} label={'Sklad'} onSelect={handleSelectStorage}/> 
        <Textarea label={'Popis'} placeholder={'Popis Naskladnění'} name={'stockDescription'} onChange={handleInputChange}/>
        <Input label={'Číslo dokladu'} type={'number'} name={'stockNumber'} onChange={handleInputChange}/>
        <Button label={'Odeslat'} style={'button addButton'} onChange={handleInputChange}/>
    </form>
  );
}
export default StockForm;