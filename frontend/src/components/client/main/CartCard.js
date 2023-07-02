import { React, useState,useEffect } from 'react'
import { Button } from "react-bootstrap";

const CartCard = ({cart})=>{
    const [counter, setCounter] = useState(1);
    

    const increase = () => {
      setCounter(count => count + 1);
    }
    
    const decrease = () => {
      if (counter > 1) {
        setCounter(count => count - 1);
      }
    }


    return(
       <>
       <div className="cart-card">
        <div className="cart-name">
            {cart.name_menu}  
        </div>
        <div className="counter-cart">
            <Button variant='warning' className='min-btn-cart' onClick={decrease}>-</Button>
            <div className="number-cart">{counter}</div>
            <Button variant='warning' className='plus-btn-cart' onClick={increase}>+</Button>
            <Button variant='danger' className='delete-cart'>Delete</Button>
          </div> 
       </div>
       </>
    )
   }

export default CartCard;