import '../App.css';
import rigtharrow from '../Images/arrow-right.png'
const StockinInfo = ({name, code, date, storage, user, supplier, document}) => {

  
  return (
    <div className="StockInCard flex">
        <span>{user}</span>
        <span className='stockinName'>{document}</span>
        <span>{date}</span>
        <img src={rigtharrow} alt="" />
        <span>{storage}</span>
        <span className='stockinName'>{supplier}</span>
    </div>
  );
}

export default StockinInfo;