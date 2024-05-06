import '../App.css';
import rigtharrow from '../Images/arrow-right.png'
const Stockin = ({name, code, date, storage, quantity, supplier, employee}) => {

  
  return (
    <div className="StockInCard flex">
        <span className='stockinName'>{name}</span>
        <span className='stockinName'>{code}</span>
        <span>{date}</span>
        <img src={rigtharrow} alt="" />
        <span>{quantity + " ks"}</span>
        <span>{storage}</span>
        <span>{supplier}</span>
    </div>
  );
}

export default Stockin;