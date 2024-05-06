import '../App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const AddEmployeePage = () => {
const [name, setName] = useState("");
const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState(0);
  const [email, setEmail] = useState("");
  const [storage_id, setStorage_id] = useState("");
  const [storages, setStorages] = useState([]);
 const history = useNavigate();

  const Load = () => {
    history('/fullapp/employee');
  };
  
  const addToDB = () =>{
    fetch("http://localhost:5000/save-employee", {
      method:"post",
      headers:{
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body:JSON.stringify({name:name, surname:surname, phone:phone, email:email, storage_id:storage_id})
    }).then((data) => {
      return data.json();
    }).then((finalData)=>{
      console.log(finalData.msg);
      Load();
    });
  }

  useEffect(()=>{
    loadStorages();
    }, [])
     
   const loadStorages = async () =>{
       const data = await fetch("http://localhost:5000/get-storages");
       const finalData = await data.json();
       const {documents} = finalData;
       setStorages(documents);
     }

    

  return (
    <div className="AddSupplierPage flex">
         <h2>Přidat zaměstnance</h2>
        <div className='supplierContainer flex'>
        <div className='flex editNameFlex'>
        <div className='editInput'>
            <label htmlFor="">Jméno zaměstnance</label>
            <input type="text" placeholder='Zadejte jméno zaměstnance...' value={name} onInput={(e) => {
                  setName(e.target.value);
                }}/>
        </div>

        <div className='editInput'>
            <label htmlFor="">Příjmení zaměstnance</label>
            <input type="text" placeholder='Zadejte příjmení zaměstnance...' value={surname} onInput={(e) => {
                  setSurname(e.target.value);
                }}/>
        </div>
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
        <label htmlFor="">Sklad zaměstnance</label>
            <select name="" id="" onChange={(e) => setStorage_id(e.target.value)}>
            {
          storages.map((storage, index) =>{
            return(
              <option key={index} value={storage._id} className='storageOption optionText'>
              {storage.name}
            </option>
            )
          })
        }
            </select>
        </div>
        <button className='addButton' onClick={addToDB}>Přidat</button>
        </div>
    </div>
  );
}

export default AddEmployeePage;