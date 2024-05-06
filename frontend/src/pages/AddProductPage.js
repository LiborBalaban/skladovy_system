import '../App.css';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import ProductSideBar from '../components/ProductSideBar';
import ProductInfo from '../components/ProductInfo';
import ProductImages from '../components/ProductImages';
import { useLocation } from 'react-router-dom';
import Moves from '../components/Moves';


const AddProductPage = () => {
const [isVisibleProductInfo, setIsVisibleProductInfo] = useState(true);
const [isVisibleProductImages, setIsVisibleProductImages] = useState(false);
const [isVisibleMoves, setIsVisibleMoves] = useState(false);
const [productId, setProductId] = useState("");
const location = useLocation();
const { id } = useParams();

useEffect(() => {
  if (id) {
     setProductId(id)
  }
}, [id]);


const Click_isVisibleProductInfo = (data) =>{
  setIsVisibleProductInfo(data);
}

const Click_IsVisibleMoves = (data) =>{
  setIsVisibleMoves(data);
}

const Click_isVisibleProductImages = (data) =>{
  setIsVisibleProductImages(data);
}

const getProductID =(data)=>{
  setProductId(data);
}



  return (
    <div className="AddProductPage flex">
         <ProductSideBar clickIsVisibleProductInfo = {Click_isVisibleProductInfo} clickIsVisibleImages = {Click_isVisibleProductImages} clickIsVisibleMoves = {Click_IsVisibleMoves}/>
         {isVisibleProductInfo && <ProductInfo getProductID = {getProductID}/>}
         {isVisibleProductImages && <ProductImages productId = {productId}/>}    
         {isVisibleMoves && <Moves productId = {productId}/>}    
    </div>
  );
}

export default AddProductPage;