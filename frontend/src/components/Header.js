import { useState, useEffect, useCallback } from 'react';
import '../App.css';
import Input from './inputs/input';
import Select from './inputs/select';
import { useUser } from '../context/UserContext';

const Header = ({label, data, selectData = [], getFiltred, getSelectId, type}) => {
  const { role } = useUser();
const [query, setQuery] = useState('');
const [filtred, setFiltred] = useState(data);
const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    if (!data || !Array.isArray(data)) {
      console.warn('Data are not properly defined or not an array.');
      return;
    }

    if (query === '') {
        getFiltred(data);
    } else {
      const filtered = data.filter((item) => {
        const nameMatch = item.name?.toLowerCase().includes(query.toLowerCase());
        const codeMatch = item.code?.toLowerCase().includes(query.toLowerCase());
        const mailMatch = item.email?.toLowerCase().includes(query.toLowerCase());
        return nameMatch || codeMatch  || mailMatch;
      });

      getFiltred(filtered);

    }
  }, [query, data]);

  useEffect(() => {
      {getSelectId && getSelectId(selectedId);}
  }, [selectedId]);

const handleInputValue = (name, value) =>{
    setQuery(value);
    console.log(query);
}

const handleSelectValue = (value) =>{
    setSelectedId(value);
}

  return (
    <div className='ProductPageNav flex'>
    <div className='searchbarHeader flex'>
      <div className='flex searchbarInputs'>
      <Input placeholder={'Hledat...'} label={label} onChange={handleInputValue}/>
      {
        role === 3 && selectData && selectData.length > 0 && (
            <Select data={selectData} onSelect={handleSelectValue} label={'Vyberte sklad'}/>
        )
      }
      </div>
    </div>
  </div>
  );
}
export default Header;