import '../../App.css';
const Input = ({placeholder, name, type, label, value, onChange, onClick, id}) => {
  return (
    <div className='input-flex'>
        <label htmlFor="">{label}</label>
        <input type={type} placeholder={placeholder} name={name} value={value} id={id} onChange={(e) => onChange(e.target.name, e.target.value)} onClick={()=>onClick && onClick(true)}/>
    </div>
  );
}
export default Input;