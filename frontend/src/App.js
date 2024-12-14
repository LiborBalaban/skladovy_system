import './App.css';
import FullApp from './pages/FullApp';
import LoginPage from './pages/LoginPage';
import { Routes, Route,} from 'react-router-dom';
import SingupPage from './pages/SingupPage';
import ActivateAccount from './pages/ActivateAccPage';
import ProtectedRoute from './protected-routes/ProtectedRoute';
import SetPasswordPage from './pages/setPasswordPage';
import ProtectedAdminRoute from './protected-routes/ProtectedAdminRoute';
import AdminApp from './pages/AdminApp';
import SingupEmployeePage from './pages/SingUpEmployee';


const App = () => {
  
  return (
    <div className='App'>
    <Routes>
          <Route path='/login' element = {<LoginPage />}/>
          <Route path='/singup' element = { <SingupPage/>}/>
          <Route element={<ProtectedRoute />}>
                <Route excact path="/fullapp/*" element={<FullApp/>}/>
          </Route>
          <Route element = {<ProtectedAdminRoute/>}>
          <Route excact path="/admin/*" element={<AdminApp/>}/>
          </Route>
          <Route path='/activate/:userId' element = {<ActivateAccount/>}/>
          <Route path='/set-password/:userId' element = {<SetPasswordPage/>}/>
          <Route path='/sing-up-employee/:token' element = {<SingupEmployeePage/>}/>
    </Routes>
    </div>
  );
}

export default App;