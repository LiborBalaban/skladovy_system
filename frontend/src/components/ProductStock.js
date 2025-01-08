import '../App.css';
import StockInfo from './StockInfo';

const ProductStock = ({ data }) => {

  return (
    <div className='flex list'>
     <h2>Pohyby produktu</h2>
      {
        data.map((move, index) => {
          return (
            <StockInfo
              key={index}
              user={move.movement.user.name}
              date={move.movement.date} // Použití funkce pro formátování data
              count={move.quantity + ' ks'}
              storage={move.storage.name}
              type={move.movement.typeId}
            />
          )
        })
      }
    </div>
  );
}

export default ProductStock;