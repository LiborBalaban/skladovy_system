import '../../App.css';
const File = ({name, onChange}) => {
  return (
        <input type='file' name={name} onChange={(e) => onChange(e.target.files)} multiple/>
  );
}
export default File;