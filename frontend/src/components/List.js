import '../App.css';
import Product from './Product';
import Item from './item';
import Input from './inputs/input';
import StockInfo from './StockInfo';

const List = ({type, data, titles}) => {
  
  if (titles.length <= 3) {
    const spans = document.querySelectorAll('.ProductPageNavTitles span');
    if (spans.length > 0) {
      spans[0].style.textAlign = 'start'; // Styl pro první span
  }

  if (spans.length > 1) {
      spans[spans.length - 1].style.textAlign = 'end';
      spans[spans.length - 1].style.paddingRight = '120px'; // Styl pro poslední span
  }
}
  return (
   <div className='list flex'>

    <div className='flex ProductPageNavTitles'>
          <div className='flex' >
          <div className='checkbox-input'>
          <Input type={'checkbox'}/>
          </div>
          </div>
          {titles.map(title => (
            <span>{title.name}</span>
          ))}
        </div>

        {data.map((item) => (
        <div key={item.id} className="table-row">
          {type === "products" && <Product 
          quantity={(item?.totalQuantity || item?.stocks?.[0]?.quantity || 0) + ' ks'}
            name={item.name} 
            category={item.category ? item.category.name : "Nedefinováno"} 
            code={item.code} 
            link={`/fullapp/add-product/${item.id}`} 
            position={item.position ? item.position.name : "Nedefinováno"} 
            id={item.id} 
            image={`http://localhost:5000${item.images[0]?.url.substring(2).replace(/\\/g, '/')}` || ''}
          />}
          {type === "item" && <Item name={item.name}/>}
          {type === "category" && <Item name={item.name} link={`/admin/category/${item.id}`}/>}
          {type === "storage" && <Item name={item.name} info={item.city} link={`/admin/add-storage/${item.id}`}/>}
          {type === "supplier" && <Item name={item.name} info={item.email} link={`/admin/add-supplier/${item.id}`}/>}
          {type === "employee" && <Item name={item.name} info={item.email} link={`/admin/add-employee/${item.id}`}/>}
          {type === "moves" && <StockInfo user={item.user.name} count={item.stockTransaction.length || ''} supplier={item.supplier?.name || ''} type={item.typeId} storage={item.storage.name} date={item.date}/>}
          {type === "moves_product" && <StockInfo user={item.movement.user.name} count={item.quantity || ''} supplier={item.movement.supplier?.name || ''} type={item.movement.typeId} storage={item.movement.storage.name} date={item.movement.date}/>}
        </div>
      ))}
   </div>
  );
}
export default List;