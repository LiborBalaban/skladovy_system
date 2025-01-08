import '../App.css';
import '../responsive.css';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AddProductForm from '../components/forms/AddProductForm';
import AddImagesForm from '../components/forms/AddImagesForm';
import { postData } from '../hooks/addToDb';
import useData from '../hooks/loadData';
import axios from 'axios';
import Image from '../components/Images';
import ProductStock from '../components/ProductStock';
import List from '../components/List';
import { useUser } from '../context/UserContext';
import { updateData } from '../hooks/updatetoDb';

const AddProductPage = () => {
const { id } = useParams();
const [productId, setProductId] = useState(id || null); // Inicializuj ID, pokud existuje
const [imgURL, setImgURL] = useState('');
const { role } = useUser();
const { data:product, loading, error } = useData(`http://localhost:5000/get-product/${id}`); 

const [all_movements, setAllMovements] = useState([]);
const { data:movements } = useData(`http://localhost:5000/get-movements/${id}`); 
const { data:storage_movements } = useData(`http://localhost:5000/get-movements-storage/${id}`); 

const { data:images } = useData(`http://localhost:5000/get-images/${id}`); 

const handleAddProduct = async (formData) => {
  console.log("Data přijatá z formuláře:", formData);
  if(id){
    updateData(`http://localhost:5000/update-product/${id}`, formData);
  }
  else{
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
  }
};


useEffect(() => {
  if (images && images.length > 0) {
    const newImgURL = 'http://localhost:5000'+images[0].url.substring(2).replace(/\\/g, '/');
    setImgURL(newImgURL);
    console.log(newImgURL); // Loguj přímo vypočtenou hodnotu
  }
}, [images]);


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

  useEffect(() => {
    if (role === 3) {
      setAllMovements(movements);
    }
    else{
      setAllMovements(storage_movements);
    }
  }, [movements, storage_movements]);

  const handleImgUrl =(url)=>{
      setImgURL(url);
      console.log(imgURL);
  }

  const HeaderTitles = [
    {name:'Zaměstnanec'},
    {name:'Počet položek'},
    {name:'Dodavatel'},
    {name:'Datum'},
    {name:'Typ'},
    {name:'Sklad'},
  ]

  return (
    <div className="AddProductPage flex">
        <div className='flex AddProductPageContainer'>
        <AddProductForm onSubmit={handleAddProduct} data={product}/> 
        {productId &&
         <div className='form' id='ImageBox'>
          <h2>Obrázky</h2>
          <div className='main-image'>
              <img src={imgURL} alt="" />
          </div>
         <div className='flex Images form'>
         {
           images.map(image=>{
             return(
               <Image url={`http://localhost:5000${image.url.substring(2).replace(/\\/g, '/')}`} onClick={handleImgUrl}/>
             )
           })
         }
         </div>
         {productId && <AddImagesForm onSubmit={handleAddImages} productId={productId} />}
         </div>
        }
        </div>
        {productId && <List data={all_movements} titles={HeaderTitles} type={'moves_product'}/>}
    </div>
  );
}

export default AddProductPage;