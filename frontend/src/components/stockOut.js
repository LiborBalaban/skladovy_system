import '../App.css';
import curvearrow from '../Images/curve-arrow.png'
const StockOut = ({name, code, date, quantity, description}) => {

  
  return (
    <div className="StockInCard flex">
        <span className='stockinName'>{name}</span>
        <span className='stockinName'>{code}</span>
        <span>{date}</span>
        <img src={curvearrow} alt="" />
        <span>{quantity  + " ks"}</span>
        <span>{description}</span>
    </div>
  );
}

export default StockOut;