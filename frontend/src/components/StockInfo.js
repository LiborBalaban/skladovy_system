import '../App.css';
import rigtharrow from '../Images/arrow-right.png';
import curvearrow from '../Images/curve-arrow.png';

const StockInfo = ({date, count, user, supplier, storage, type}) => {

  
  return (
    <div className="StockInCard flex">
        <span>{user}</span>
        <span className='stockinName'>{count}</span>
        <span>{date}</span>
        <img src={rigtharrow} alt="" />
        <span>{storage}</span>
        <span className='stockinName'>{supplier}</span>
    </div>
  );
}

export default StockInfo;