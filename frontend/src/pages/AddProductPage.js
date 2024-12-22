import '../App.css';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Moves from '../components/Moves';
import AddProductForm from '../components/forms/AddProductForm';
import AddImagesForm from '../components/forms/AddImagesForm';
import { postData } from '../hooks/addToDb';
import useData from '../hooks/loadData';
import axios from 'axios';
import Image from '../components/Images';
import ProductStock from '../components/ProductStock';

const AddProductPage = () => {
const { id } = useParams();
const [productId, setProductId] = useState(id || null); // Inicializuj ID, pokud existuje

const { data:product, loading, error } = useData(`http://localhost:5000/get-product/${id}`); 
const { data:movements } = useData(`http://localhost:5000/get-movements/${id}`); 

const { data:images } = useData(`http://localhost:5000/get-images/${id}`); 

const handleAddProduct = async (formData) => {
  console.log("Data přijatá z formuláře:", formData);

  try {
    const result = await postData('http://localhost:5000/save-product', formData);
    
    
    if (result.data.productId) {
      setProductId(result.data.productId); // Aktualizuj stav
      console.log("Uložené productId:", result.data.productId);
    } else {
      console.error("Produkt nebyl uložen, chybí productId v odpovědi.");
    }
  } catch (error) {
    console.error("Chyba při ukládání produktu:", error);
  }
};
useEffect(() => {
  if (id) {
     
  }
}, [id]);


  const handleAddImages = async(formData) => {
    try {
      const response = await axios.post('http://localhost:5000/upload-images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });
      console.log('Úspěšně odesláno:', response.data.message);
      return response.data;
    } catch (error) {
      console.error('Chyba při odesílání:', error);
    }
  }

  return (
    <div className="AddProductPage flex">
        <AddProductForm onSubmit={handleAddProduct} data={product}/> 
        <div className='form forms-colum'>
        {productId && <AddImagesForm onSubmit={handleAddImages} productId={productId} />}
        <div className='flex Images form'>
        {
          images.map(image=>{
            return(
              <Image url={`http://localhost:5000${image.url.substring(2).replace(/\\/g, '/')}`}/>
            )
          })
        }
        </div>
        <ProductStock data={movements}/>
        </div>
    </div>
  );
}

export default AddProductPage;