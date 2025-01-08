import '../App.css';
import rigtharrow from '../Images/arrow-right.png';
import curvearrow from '../Images/curve-arrow.png';
import { useEffect, useState } from 'react';
import Input from './inputs/input';

const StockInfo = ({date, count, user, supplier, storage, type}) => {
  const [img, setImg] = useState(null);  // Přidání useState pro obrázek

  const arrow = () => {
    if (type === 1) {
      setImg(rigtharrow);
    } else if (type === 2) {
      setImg(curvearrow);
    }
  };

  useEffect(() => {
    arrow(); 
  }, [type]); 

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('cs-CZ', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };
  
  return (
    <div className="StockCard flex">
        <div className='checkbox-input'>
        <Input type={'checkbox'}/>
        </div>
        <span>{user}</span>
        <span className='stockinName'>{count}</span>
        <span className='stockinName'>{supplier}</span>
        <span>{formatDate(date)}</span>
        <div className='flex stockInfoImg'>
        {img && <img src={img} alt="arrow" />}
        </div>
        <span>{storage}</span>
    </div>
  );
}

export default StockInfo;