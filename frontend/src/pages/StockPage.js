import '../App.css';
import React, { useState, useEffect } from "react";
import StockProduct from '../components/StockProduct';
import { useNavigate } from 'react-router-dom';
import AutoCompleteInput from '../components/inputs/AutoCompleteInput';
import useData from '../hooks/loadData';
import StockForm from '../components/forms/StockForm';
import { postData } from '../hooks/addToDb';

const StockPage = () => {
    const [products, setProducts] = useState([]); // Pole produktů s ID, množstvím a cenou
    const { data: all_products, loading, error } = useData('http://localhost:5000/get-products');

    const today = new Date();
    const formattedDate = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;

    // Přidání nebo aktualizace produktu v seznamu
    const getId = (productId) => {
        setProducts((prevProducts) => {
            const exists = prevProducts.some((product) => product.id === productId);
            if (exists) {
                return prevProducts;
            } else {
                return [...prevProducts, { id: productId, quantity: 1, price: 0 }];
            }
        });
    };

    const updatePrice = (id, value) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id ? { ...product, price: value } : product
            )
        );
    };

    const updateQunatity = (id, value) => {
      setProducts((prevProducts) =>
          prevProducts.map((product) =>
              product.id === id ? { ...product, quantity: value } : product
          )
      );
  };

    const selectedProducts = products.map((product) => {
        const productData = all_products.find((p) => p.id === product.id);
        return { ...product, ...productData };
    });

    useEffect(() => {
        console.log('Updated products:', products);
    }, [products]);

    const handleStock = (formData) => {
        console.log("Data přijatá z formuláře:", formData);
        const payload = {
            stockDetails: formData,
            type : 1,
            products: products
        };
        console.log(payload);
        postData('http://localhost:5000/save-stock', payload);
      };

    return (
        <div className="ProductPage">
            <div className='CategoryPageHeader'>
                <h2>Produkty</h2>
            </div>
            <div className='StockPageNav'>
                <div className='flex stockHeader'>
                    <span>{"Dnešní datum: " + formattedDate}</span>
                    <span>Naskladnění</span>
                </div>
            </div>
            <div className='flex StorckProductsEdit'>
                <div className='StockProducts flex'>
                    {/* AutoCompleteInput s předáním dat a callbackem */}
                    <AutoCompleteInput data={all_products} onClick={getId} />
                    
                    <h2>Vybrané produkty: {products.length}</h2>
                    {selectedProducts.map((product) => (
                        <StockProduct
                            key={product.id}
                            id = {product.id}
                            name={product.name}
                            code={product.code}
                            handlePice={updatePrice}
                            handleQuantity={updateQunatity}
                        />
                    ))}
                </div>
                <StockForm products={products} onSubmit={handleStock}/>
            </div>
        </div>
    );
};

export default StockPage;