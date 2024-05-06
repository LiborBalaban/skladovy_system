import '../App.css';


const ProductSidebar = ({clickIsVisibleProductInfo, clickIsVisibleImages, clickIsVisibleMoves}) => {
   
    return (
        <div className='ProductSideBar flex'>
          <ul className='flex'>
              <li onClick={() =>{
                clickIsVisibleProductInfo(true);
                clickIsVisibleImages(false);
                clickIsVisibleMoves(false)
              }
              }>Základní informace</li>
              
              <li onClick={() =>{
                clickIsVisibleImages(true);
                clickIsVisibleProductInfo(false);
                clickIsVisibleMoves(false)
              }
              }>Obrázky</li>
              <li onClick={() => {clickIsVisibleMoves(true);
               clickIsVisibleImages(false);
               clickIsVisibleProductInfo(false);}
              }>Pohyby položky</li>
              <li>Sklady</li>
          </ul>
        </div>
    );
  }
  
  export default ProductSidebar;