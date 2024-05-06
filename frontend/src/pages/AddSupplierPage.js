import '../App.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
const AddSupplierPage = () => {
const [name, setName] = useState("");
  const [phone, setPhone] = useState(0);
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const {id} = useParams();
 const history = useNavigate();

  const Load = () => {
    history('/fullapp/suppliers');
  };
  
  const click =()=>{
    if(id){
      updateToDB();
    }
    else{
      addToDB();
    }
  }

  useEffect(()=>{
    if(id){
      loadSupplier();
    }
   }, [])

  const addToDB = async () => {
    try {
      const response = await axios.post('http://localhost:5000/save-supplier', {
        name:name, phone:phone, email:email, phone:phone, description:description
      }, {
        withCredentials: true
      });
      console.log('Úspěšně uloženo:', response.data.msg);
      Load();
  
    } catch (error) {
      console.error('Chyba při ukládání:', error);
    }
  };

  const updateToDB = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/update-supplier/${id}`, {
        name:name, phone:phone, email:email, phone:phone, description:description
      }, {
        withCredentials: true
      });
      console.log('Úspěšně uloženo:', response.data.msg);
      Load();
  
    } catch (error) {
      console.error('Chyba při ukládání:', error);
    }
  };



  const loadSupplier = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/get-supplier/${id}`);
      const supplier = response.data.documents;
      setName(supplier.name);
      setPhone(supplier.phone);
      setEmail(supplier.email);
      setDescription(supplier.description);
    } catch (error) {
      console.error('Nelze načíst informace', error);
    }
  };

  return (
    <div className="AddSupplierPage flex">
        <div className='supplierContainer flex'>
        <h2>Přidat Dodavatele</h2>
        <div className='editInput'>
            <label htmlFor="">Název dodavatele</label>
            <input type="text" placeholder='Zadej název dodavatele...' value={name} onInput={(e) => {
                  setName(e.target.value);
                }}/>
        </div>

        <div className='editInput'>
            <label htmlFor="">Email</label>
            <input type="email" placeholder='Zadej email..' value={email} onInput={(e) => {
                  setEmail(e.target.value);
                }}/>
        </div>

        <div className='editInput'>
            <label htmlFor="">Telefonní číslo</label>
            <input type="tel" placeholder='Zadej telefonní číslo...' value={phone} onInput={(e) => {
                  setPhone(e.target.value);
                }}/>
        </div>
        <div className='editInput'>
            <label htmlFor="">Popis</label>
           <textarea name="" id="" cols="30" rows="10" placeholder='Popis...' value={description} onInput={(e) => {
                  setDescription(e.target.value);
                }}></textarea>
        </div>
        <button className='addButton' onClick={click}>Přidat</button>
        </div>
    </div>
  );
}

export default AddSupplierPage;