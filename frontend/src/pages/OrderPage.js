import '../App.css';
import '../responsive.css';
import {productData} from "../data"
import Customer from '../components/Customer';
function OrderPage() {
  return (
    <div className="OrderPage">
      <Customer/>
    </div>
  );
}

export default OrderPage;