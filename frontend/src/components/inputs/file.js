import '../../App.css';
const File = ({name, onChange}) => {
  return (
        <input type='file' name={name} onChange={(e) => onChange(e.target.files[0])}/>
  );
}
export default File;