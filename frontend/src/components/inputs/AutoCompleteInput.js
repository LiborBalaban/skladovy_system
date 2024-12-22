import '../../App.css';
import Input from './input';
import { useState, useEffect } from 'react';

const AutoCompleteInput = ({ data, onClick }) => {
    const [query, setQuery] = useState('');
    const [filtredProducts, setFiltredProducts] = useState(data);  // Na začátku zobrazíme všechny produkty

    // useEffect se spustí, když se změní hodnota `query`
    useEffect(() => {
        if (query === '') {
            setFiltredProducts(data);  // Pokud je query prázdné, zobrazíme všechny produkty
        } else {
            const filtered = data.filter(item =>
                item.name.toLowerCase().includes(query.toLowerCase()) || 
                item.code.toLowerCase().includes(query.toLowerCase())
            );
            console.log("Filtered products:", filtered);
            setFiltredProducts(filtered);  // Nastavení filtrovaných produktů
        }
    }, [query, data]);  // Tato závislost zajišťuje, že se efekt spustí, když se změní `query` nebo `data`

    const handleInputChange = (name, value) => {
        setQuery(value);
        console.log(query);  // Aktualizace hodnoty pro hledání
    };

    return (
        <div className='input-flex'>
            <Input onChange={handleInputChange} placeholder={'Zadejte název nebo kod produktu...'} label={'Vyberte produkty'}/>
            <div className="autocomplete-suggestions">
                {filtredProducts.length > 0 ? (
                    filtredProducts.map((product) => (
                        <div key={product.code} className='flex' onClick={()=>onClick(product.id)}>
                            <span>{product.name}</span> <br />
                            <span>{product.code}</span>
                        </div>
                    ))
                ) : (
                    <div>No products found</div>  // Pokud nejsou žádné produkty
                )}
            </div>
        </div>
    );
};

export default AutoCompleteInput;
