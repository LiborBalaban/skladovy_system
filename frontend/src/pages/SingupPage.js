import '../App.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SingupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [name, setName] = useState(""); 
  const [storageName, setStorageName] = useState(""); 
  const history = useNavigate();

  
  
  function isValidEmail(email) {
    const regex = /\S+@\S+\.\S+/;
    const isValid = regex.test(email);
    return isValid;
  }
  
  const check =()=>{
    if(email === ""){
      alert('Nemáte vyplněný email');
    }

    if(password === "" || password.length < 6 ){
      alert('Vaše heslo je moc krátké');
    }

    const isValid = isValidEmail(email);
    if (!isValid) {
      alert('Nemáte správně zadaný email');
    }

    else{
      saveUser();
    }

  }

  
  const saveUser = async () => {
    try {
      const response = await axios.post('http://localhost:5000/save-user', {
        email:email, password:password, storagename:storageName
      });
      alert("Jste úspěšně přihlášení. Teďka bežte na váš email a aktivujte si účet.")
    } catch (error) {
      console.error('There was an error!', error);
      alert("Účet s vaším emailem již existuje, běžte se přihlásit");
    }
  };



  return (
    <div className="LoginPage flex">
        <div className='LoginDiv flex'>
            <h2>Založte si účet</h2>
            <div action="" className='LoginForm flex'>
            <input type="email" placeholder='Email' value={email} onInput={(e) => {
                  setEmail(e.target.value);
                }}/>
                <input type="password" placeholder='Heslo' value={password} onInput={(e) => {
                  setPassword(e.target.value);
                }}/>
                <input type="email" placeholder='Název skladu' value={storageName} onInput={(e) => {
                  setStorageName(e.target.value);
                }}/>
                <input type="submit" value={"Zaregistrovat se"} onClick={check}/>
                <p>Nemáte už účet? <span>Přihlašte se</span></p>
            </div>
        </div>
    </div>
  );
}

export default SingupPage;