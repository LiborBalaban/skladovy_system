import '../App.css';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import StoragePage from './StoragePage';
import StorageDetailPage from './StorageDetailPage';
import SupplierPage from './SupplierPage';
import AddSupplierPage from './AddSupplierPage';
import EmployeePage from './EmployeePage';
import AddEmployeePage from './AddEmployee';

const AdminApp = () => {
  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <div className="Content">
        <Routes>
          <Route path="/storages" element={<StoragePage />} />
          <Route path='/add-storage/:id' element={<StorageDetailPage/>} />
          <Route path='/add-storage' element={<StorageDetailPage/>} />
          <Route path='/suppliers' element={<SupplierPage />} />
          <Route path='/add-supplier' element={<AddSupplierPage />} />
          <Route path='/add-supplier/:id' element={<AddSupplierPage />} />
          <Route path='/employee' element={<EmployeePage/>} />
          <Route path='/add-employee' element={< AddEmployeePage/>} />
          <Route path='/add-employee/:id' element={< AddEmployeePage/>} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminApp;