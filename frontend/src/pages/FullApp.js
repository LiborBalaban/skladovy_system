import '../App.css';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import ProductPage from './ProductsPage';
import OrderPage from './OrderPage';
import CategoryPage from './CategoryPage';
import AddCategoryPage from './AddCategoryPage';
import StoragePage from './StoragePage';
import UpdateStoragePage from './StorageDetailPage';
import AddProductPage from './AddProductPage';
import SupplierPage from './SupplierPage';
import AddSupplierPage from './AddSupplierPage';
import EmployeePage from './EmployeePage';
import AddEmployeePage from './AddEmployee';
import StockPage from './StockPage';
import PositionPage from './PositionPage';
import MovementsPage from './MovementsPage';
import StockOutPage from './StockOutPage';

const FullApp = () => {
  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <div className="Content">
        <Routes>
          <Route path='/products' element={<ProductPage />} />
          <Route path='/order' element={<OrderPage />} />
          <Route path='/category' element={<CategoryPage />} />
          <Route path='/addcategory' element={<AddCategoryPage />} />
          <Route path='/addcategory/:id' element={<AddCategoryPage />} />
          <Route path='/add-product' element={<AddProductPage />} />
          <Route path='/add-product/:id' element={<AddProductPage />} />
          <Route path='/stock' element={<StockPage />} />
          <Route path='/positions' element={<PositionPage />} />
          <Route path='/movements' element={<MovementsPage />} />
          <Route path='/stockout' element={<StockOutPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default FullApp;