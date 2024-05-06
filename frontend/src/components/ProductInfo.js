import '../App.css';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductInfo = ({ getProductID }) => {
  const [categories, setCategories] = useState([]);
  const [category_id, setCategory_id] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [productID, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const history = useNavigate();
  const { id } = useParams();

  const click =()=>{
  if (id){
    updateToDB();
  }
  else{
    addToDB();
  }
}



  useEffect(() => {
      if (id) {
          loadProductInfo();
      }
      loadCategories();
  }, [id]);

  
  const loadCategories = async () =>{
    try {
      const response = await axios.get("http://localhost:5000/get-categories", { withCredentials: true });
      const categories = response.data.categories;
      setCategories(categories);
      
    } catch{
      console.error("Chyba při získávání dodavatelů");
    }
  }

  const loadProductInfo = async () =>{
    try {
      const response = await axios.get(`http://localhost:5000/get-product/${id}`, { withCredentials: true });
      const documents = response.data.documents;
      setName(documents.name);
      setCode(documents.code);
      setDescription(documents.description);
      setCategory_id(documents.category);  
      setQuantity(documents.quantity);
      
    } catch{
      console.error("Chyba při získávání informací o produktu");
    }
  }

   
const addToDB = async () => {
  try {
    const response = await axios.post('http://localhost:5000/save-product', {
      name: name,code: code,category: category_id, description: description
    }, {
      withCredentials: true
    });
    getProductID(response.data.product_id);
    setProductId(response.data.product_id);
    alert(response.data.msg);

  } catch (error) {
    console.error('Chyba při ukládání:', error);
  }
};

    const updateToDB = async () => {
      try {
        const response = await axios.put(`http://localhost:5000/update-product/${id}`, {
          name, code, category: category_id, description 
        }, {
          withCredentials: true
        });
        console.log('Úspěšně uloženo:', response.data.msg);
        alert(response.data.msg);
        history('/fullapp/products');
    
      } catch (error) {
        console.error('Chyba při ukládání:', error);
      }
    };

    
   

    return (
      <div className="ProductInfo flex">
        <h2>Informace o produktu</h2>
        <div className='ProductInfoForm flex'>
            <div className='inputFlex flex'>
                <label htmlFor="">Název</label>
                <input type="text" placeholder='Zadejte název položky...' value={name} onInput={(e) => {
                  setName(e.target.value);
                }}/>
            </div>
            <div className='inputFlex flex'>
                <label htmlFor="">Kód</label>
                <input type="text" placeholder='Zadejte název položky...' value={code} onInput={(e) => {
                  setCode(e.target.value);
                }}/>
            </div>
            <div className='inputFlex flex'>
                <label htmlFor="">Kategorie</label>
                <select name="" id="" onChange={(e) => setCategory_id(e.target.value)} value={category_id}>
                    {
          categories.map((category, index) =>{
            return(
              <option key={category._id} value={category._id} >
              {category.name}
            </option>
            )
          })
        }
                </select>
            </div>
            <div className='inputFlex flex'>
                <label htmlFor="">Popis</label>
                <textarea name="" id="" cols="30" rows="10" placeholder='Popis produktu...' value={description} onInput={(e) => {
                  setDescription(e.target.value);
                }}></textarea>
            </div>
            <div className='inputFlex flex'>
                <label htmlFor="">Množství</label>
                <input type="text" readOnly value={quantity}/>
            </div>
        </div>
        <div className='flex productButtons'>
        <button className='deleteProductButton' onClick={click}>Odstranit</button>
        <button className='saveProductButton' onClick={click}>Uložit</button>
        </div>
      </div>
    );
  }
  
  export default ProductInfo;