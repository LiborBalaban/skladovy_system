import '../../App.css';
const Input = ({placeholder, name, type, label, value, onChange}) => {
  return (
    <div className='input-flex'>
        <label htmlFor="">{label}</label>
        <input type={type} placeholder={placeholder} name={name} value={value} onChange={(e) => onChange(e.target.name, e.target.value)}/>
    </div>
  );
}
export default Input;