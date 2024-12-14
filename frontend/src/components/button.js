import '../App.css';
const Button = ({label, onClick, style, type}) => {
  return (
   <button className={style} onClick={onClick} type={type}>{label}</button>
  );
}
export default Button;