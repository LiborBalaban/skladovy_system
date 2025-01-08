import '../App.css';
import '../responsive.css';
import SingUpEmployeeForm from '../components/forms/SingUpEmployeeForm';
import { postData } from '../hooks/addToDb';

const SingupEmployeePage = () => {

  const handleSingUp = (formData) => {
    console.log(formData);
    postData('http://localhost:5000/save-employee', formData);
      };

  return (
    <div className="LoginPage flex">
        <div className='LoginDiv flex'>
            <SingUpEmployeeForm onSubmit={handleSingUp}/>
        </div>
    </div>
  );
}

export default SingupEmployeePage;