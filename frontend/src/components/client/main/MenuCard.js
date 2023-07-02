import { React, useState } from 'react'
import { Button } from "react-bootstrap";

function MenuCard({ menus, handleClick }) {
  const [counter, setCounter] = useState(1);
  
  const increase = () => {
    setCounter(count => count + 1);
  }
  
  const decrease = () => {
    if (counter > 1) {
      setCounter(count => count - 1);
    }
  }
  
  return (
    <>
      <div className="menu-card">
        <img src={`http://localhost:5000/images/${menus.image}`} alt="menu_photo" className='menu-image'/>
        <div className="menu-id">
          <div className="menu-name">
            <div className="menu-title">{menus.name_menu}</div>
            <div className="menu-price">Rp.{menus.price}</div>
          </div>
          <div className="counter">
            <Button variant='warning' className='min-btn' onClick={decrease}>-</Button>
            <div className="number">{counter}</div>
            <Button variant='warning' className='plus-btn' onClick={increase}>+</Button>
          </div>  
        </div>
        <Button variant="warning" className='order-btn' onClick={() => handleClick(menus)}>Order</Button>{' '}
      </div>
    </>
  )
}

export default MenuCard;
