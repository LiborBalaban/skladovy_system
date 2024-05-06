import '../App.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
const AddCategoryPage = () => {
  const [nameCategory, setNameCategory] = useState("");
  const [descriptionCategory, setDescriptionCategory] = useState("");
  const [positions, setPositions] = useState([]);
  const [positionId, setPositionId] = useState("");
  const history = useNavigate();
  const {id} = useParams();

  const Load = () => {
    history('/fullapp/category');
  };
  
  const click =()=>{
    if(id){
      updateToDB();
    }
    else{
      addToDB();
      loadPositions();
    }
  }

  useEffect(()=>{
    if(id){
      loadCategories();
    }
    loadPositions();
   }, [])

  const loadCategories = async () =>{
    try {
      const response = await axios.get(`http://localhost:5000/get-category/${id}`, { withCredentials: true });
      const category = response.data.documents;
      setNameCategory(category.name);
      setDescriptionCategory(category.description);
      setPositionId(category.position);
      
    } catch{
      console.error("Chyba při získávání dodavatelů");
    }
  }

  const loadPositions = async () =>{
    try {
      const response = await axios.get('http://localhost:5000/get-positions', { withCredentials: true });
      const positions = response.data.documents;
      setPositions(positions);
      
    } catch{
      console.error("Chyba při získávání dodavatelů");
    }
  }


  const addToDB = async () => {
    try {
      const response = await axios.post('http://localhost:5000/save-category', {
        name:nameCategory, 
        description:descriptionCategory,
        positionId:positionId
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
      const response = await axios.put(`http://localhost:5000/update-category/${id}`, {
        name:nameCategory, 
        description:descriptionCategory,
        positionId:positionId
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
    <div className="AddCategoryPage flex">
            <div className='addCategoryForm flex'>
                <h2>Přidat kategorii</h2>
                <div className='inputStock flex'>
                <label htmlFor="">Název</label>
                <input type="text" placeholder='Zadejte název kategorie...' value={nameCategory} onInput={(e) => {
                  setNameCategory(e.target.value);
                }}/>
                </div>
                
                <div className='inputStock flex'>
                <label htmlFor="">Pozice</label>
        <select name="" id=""  onChange={(e) => setPositionId(e.target.value)} value={positionId}>
        {
          positions.map((position, index) =>{
            return(
              <option key={index} value={position._id} className='storageOption optionText'>
              {position.name}
            </option>
            )
          })
        }
        </select>
        </div>
        <div className='inputStock flex'>
        <label htmlFor="">Popis</label>
        <textarea name="" id="" cols="30" rows="10" placeholder='Popis kategorie...' value={descriptionCategory} onInput={(e) => {
                  setDescriptionCategory(e.target.value);
                }}></textarea>
        </div>
                
                <div className='addProduct'onClick={click}>Uložit</div>
            </div>
    </div>
  );
}

export default AddCategoryPage;