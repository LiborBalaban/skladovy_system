import '../App.css';

function Customer() {
  return (
 
      <div className='Customer flex' >
        <h2>Informace o zákazníkovi</h2>
        <form action="" className='CustomerForm'>
        <div className='formDiv flex'>
        <label htmlFor="">Jméno:</label>
        <input type="text" value={"Libor Balabán"}/>
        </div>
        <div className='formDiv flex'>
        <label htmlFor="">Email:</label>
        <input type="text" value={"libor.balaban10@seznam.cz"}/>
        </div>
        <div className='formDiv flex'>
        <label htmlFor="">Telefon:</label>
        <input type="text" value={"601563772"}/>
        </div>
        <div className='formDiv flex'>
        <label htmlFor="">Poznámka:</label>
        <textarea name="" id="" cols="30" rows="10" value={"Tuto objednáku potřebuji kvalitně zabalit"}></textarea>
        </div>
        </form>
      </div>
  
  );
}

export default Customer;