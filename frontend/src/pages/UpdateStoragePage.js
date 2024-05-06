import '../App.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateStoragePage = () => {
  const location = useLocation();
  const [nameStorage, setNameStorage] = useState("");
  const [phoneStorage, setPhoneStorage] = useState(0);
  const [addressStorage, setAddressStorage] = useState("");
  const [pscStorage, setPscStorage] = useState(0);
  const [cityStorage, setCityStorage] = useState("");
  const { id } = useParams();

  

  const loadStorage = async () =>{
    try {
      const response = await axios.get(`http://localhost:5000/get-storage/${id}`, { withCredentials: true });
      const storage = response.data.documents;
      setNameStorage(storage.name);
      setPhoneStorage(storage.phone);
      setAddressStorage(storage.address);
      setPscStorage(storage.psc);
      setCityStorage(storage.city);
      
    } catch{
      console.error("Chyba při získávání dodavatelů");
    }
  }

  useEffect(() => {
    loadStorage();
  }, []);

  const history = useNavigate();
  const Load = () => {
    history('/fullapp/storages');
  };

 

  const updateToDB = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/update-storage/${id}`, {
        name:nameStorage, phone:phoneStorage, address:addressStorage, psc:pscStorage, city:cityStorage
      }, {
        withCredentials: true
      });
      console.log('Úspěšně uloženo:', response.data.msg);
      Load();
  
    } catch (error) {
      console.error('Chyba při ukládání:', error);
    }
  };

  return (
    <div className="AddStoragePage flex">
            <div className='addStorageForm flex'>
                <h2>Upravit informace o skladu</h2>

                <div className='StorageInput flex'>
                    <label htmlFor="">Název:</label>
                    <input type="text" placeholder='Sklad NovĂ© MÄ›sto na MoravÄ›' value={nameStorage} onInput={(e) => {
                  setNameStorage(e.target.value);
                }}/>
                </div>

                <div className='StorageInput flex'>
                    <label htmlFor="">Telefon:</label>
                    <input type="text" placeholder='777555333' value={phoneStorage} onInput={(e) => {
                  setPhoneStorage(e.target.value);
                }}/>
                </div>

                <div className='StorageInput flex'>
                    <label htmlFor="">Adresa:</label>
                    <input type="text" placeholder='KvÄ›tovĂˇ 150' value={addressStorage} onInput={(e) => {
                  setAddressStorage(e.target.value);
                }}/>
                </div>

                <div className='StorageInput flex'>
                    <label htmlFor="">PSČ:</label>
                    <input type="text" placeholder='59231' value={pscStorage} onInput={(e) => {
                  setPscStorage(e.target.value);
                }}/>
                </div>

                <div className='StorageInput flex'>
                    <label htmlFor="">Město/Obec:</label>
                    <input type="text" placeholder='NovĂ© MÄ›sto na MoravÄ›' value={cityStorage} onInput={(e) => {
                  setCityStorage(e.target.value);
                }}/>
                </div>

                <button className='editButton' onClick={updateToDB}>Aktualizovat</button>
            </div>
    </div>
  );
}

export default UpdateStoragePage;