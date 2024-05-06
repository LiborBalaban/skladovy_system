import '../App.css';

function AddProduct() {
  return (
    <div className="App">
      <div className='Customer flex' >
        <div className='productDiv flex'>
        <label htmlFor="">Název produktu</label>
        <input type="text"/>
        </div>
        <div className='productDiv flex'>
        <label htmlFor="">Popis produktu</label>
        <textarea name="" id="" cols="30" rows="10"></textarea>
        </div>
        <div className='productDiv flex'>
        <label htmlFor="">Kód produktu</label>
        <input type="text" value={"601563772"}/>
        </div>
        <div className='productDiv flex'>
        <label htmlFor="">Množství na skladě</label>
        <input type="number" min = "0" />
        </div>
      </div>
    </div>
  );
}

export default AddProduct;