import '../App.css';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';


const ProductImages = ({productId}) => {
    const [product, setProduct] = useState('');
    const [productID, setProductId] = useState('');
    const [images, setImages] = useState([]);
    const [image, setImage] = useState(null);

    const location = useLocation();
    const { id } = useParams();
    
    useEffect(() => {
      if(id){
        loadImages();
      }
  }, []);
   

       const uploadImage = async () => {
        try {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('product', productId);
    
            const response = await fetch("http://localhost:5000/upload-image", {
                method: "POST",
                credentials: "include",
                body: formData
            });
    
            if (response.ok) {
                const data = await response.json();
                alert(data.msg);
            } else {
                const errorData = await response.text(); // Získání textové chyby
                console.error('Chyba při nahrávání obrázku:', errorData);
            }
        } catch (error) {
            console.error('Chyba při nahrávání obrázku:', error);
        }
    };


       
        const loadImages = async () =>{
          try {
            const response = await axios.get(`http://localhost:5000/get-productimages/${id}`, { withCredentials: true });
            const images = response.data.documents;
            setImages(images);
            
          } catch{
            console.error("Chyba při získávání dodavatelů");
          }
        }

    return (
      <div className="ProductImages flex">
        <h2>Obrázky produktu</h2>
        <div className='ProductImagesForm flex'>
            <input className='fileButton' type="file" onChange={e => setImage(e.target.files[0])}/>
        </div>
        <button className='saveProductButton' onClick={uploadImage}>Uložit</button>
        <div className='ProductImagesContainer flex'>
        {
        images.map((image, index) => {
        return (
          <div>
            <img src={require('../Images/' + image.url.slice(23))} alt="" />
          </div>
        )
        })}
        </div>
        
      </div>
    );
  }
  
  export default ProductImages;