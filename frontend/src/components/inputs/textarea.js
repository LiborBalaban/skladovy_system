import '../../App.css';
const Textarea = ({placeholder, name, label, value, onChange}) => {
  return (
    <div className='input-flex'>
        <label htmlFor="">{label}</label>
        <textarea placeholder={placeholder} name={name} value={value} onChange={(e) => onChange(e.target.name, e.target.value)}/>
    </div>
  );
}
export default Textarea;