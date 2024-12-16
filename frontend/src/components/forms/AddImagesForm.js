import '../../App.css';
import { useState } from 'react';
import File from '../inputs/file';
import Textarea from '../inputs/textarea';
import Button from '../button';

const AddImagesForm = ({onSubmit, productId}) => {
  const [formData, setFormData] = useState({
    productImages: [],
    productId: productId,
  });

  // Funkce pro změnu souborů
  const handleFileChange = (files) => {
    setFormData((prevData) => ({
      ...prevData,
      productImages: [...prevData.productImages, ...Array.from(files)], // přidáme nové soubory do pole
    }));
    console.log(files);
  };

  // Funkce pro odeslání formuláře
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const data = new FormData();
  
    // Přidání productId
    data.append('productId', formData.productId);
  
    // Přidání všech obrázků do FormData
    formData.productImages.forEach((file) => {
      data.append('images', file);  // Každý soubor přidán pod stejným názvem pole
    });

    for (let [key, value] of data.entries()) {
      console.log(key, value);
    }
    console.log("Data odeslaná na server:", data);
    // Volání funkce onSubmit, která odesílá data na backend
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className='form'>
        <h2>Obrázky produktu</h2>
        <div className='ProductImagesForm flex'>
            <File onChange={handleFileChange}/>
        </div>
        <Button type='submit' style='button addButton' label='Uložit obrázek' onClick={()=>{console.log(formData)}}/>
    </form>
  );
}
export default AddImagesForm;