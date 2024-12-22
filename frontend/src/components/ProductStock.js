import '../App.css';
import StockInfo from './StockInfo';

const ProductStock = ({ data }) => {

  const formatDate = (isoDate) => {
    const dateObj = new Date(isoDate);
    return dateObj.toLocaleString('cs-CZ', {
      timeZone: 'UTC',
      hour12: false  
    });
  };

  return (
    <div className='flex Stock'>
      {
        data.map((move, index) => {
          return (
            <StockInfo
              key={index}
              user={move.movement.user.name}
              date={formatDate(move.movement.date)} // Použití funkce pro formátování data
              count={move.quantity + ' ks'}
              storage={move.storage.name}
            />
          )
        })
      }
    </div>
  );
}

export default ProductStock;