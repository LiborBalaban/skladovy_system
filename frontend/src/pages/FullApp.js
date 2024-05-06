import '../App.css';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import ProductPage from './ProductsPage';
import OrderPage from './OrderPage';
import CategoryPage from './CategoryPage';
import AddCategoryPage from './AddCategoryPage';
import StoragePage from './StoragePage';
import UpdateStoragePage from './UpdateStoragePage';
import AddProductPage from './AddProductPage';
import SupplierPage from './SupplierPage';
import AddSupplierPage from './AddSupplierPage';
import EmployeePage from './EmployeePage';
import AddEmployee from './AddEmployee';
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
          <Route path="/storages" element={<StoragePage />} />
          <Route path='/update-storage/:id' element={<UpdateStoragePage />} />
          <Route path='/add-product' element={<AddProductPage />} />
          <Route path='/add-product/:id' element={<AddProductPage />} />
          <Route path='/suppliers' element={<SupplierPage />} />
          <Route path='/add-supplier' element={<AddSupplierPage />} />
          <Route path='/add-supplier/:id' element={<AddSupplierPage />} />
          <Route path='/employee' element={<EmployeePage />} />
          <Route path='/addemployee' element={<AddEmployee />} />
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