import './App.css';
import FullApp from './pages/FullApp';
import LoginPage from './pages/LoginPage';
import { Routes, Route,} from 'react-router-dom';
import SingupPage from './pages/SingupPage';
import ActivateAccount from './pages/ActivateAccPage';
import ProtectedRoute from './components/ProtectedRoute';
import SetPasswordPage from './pages/setPasswordPage';


const App = () => {
  
  return (
    <div className='App'>
    <Routes>
          <Route path='/login' element = {<LoginPage />}/>
          <Route path='/singup' element = { <SingupPage/>}/>
          <Route element={<ProtectedRoute />}>
                <Route excact path="/fullapp/*" element={<FullApp/>}/>
          </Route>

          <Route path='/activate/:userId' element = {<ActivateAccount/>}/>
          <Route path='/set-password/:userId' element = {<SetPasswordPage/>}/>
    </Routes>
    </div>
  );
}

export default App;