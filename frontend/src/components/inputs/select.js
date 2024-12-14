import '../../App.css';

const Select = ({ label, data, onSelect, selected }) => {
  const handleChange = (e) => {
    const selectedValue = e.target.value; // Získá hodnotu zvoleného <option>
    if (onSelect) {
      onSelect(selectedValue); // Zavolejte funkci předanou jako prop
    }
  };

  return (
    <div className="input-flex">
      <label htmlFor="select">{label}</label>
      <select id="select" onChange={handleChange} value={selected}>
        <option value="">Vyberte možnost</option>
        {data.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
