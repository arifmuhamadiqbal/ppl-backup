import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { Table } from "react-bootstrap";

const Cart = ({setShow, cart, setCart, handleChange})=>{
    const [price, setPrice] = useState(0);

    useEffect(()=>{
        handlePrice();
    })

    const handlePrice = ()=>{
        let ans = 0;
        cart.map((item)=>(
            ans += item.amount * item.price
        ))
        setPrice(ans);
    }

    const handleRemove = (id) =>{
        const arr = cart.filter((item)=>item.id_menu !== id);
        setCart(arr);
        // handlePrice();
    }

    const handleQuantityChange = (item, quantity) => {
        const updatedCart = cart.map((cartItem) => {
          if (cartItem.id_menu === item.id_menu) {
            const updatedItem = { ...cartItem };
            if (updatedItem.amount === undefined) {
              updatedItem.amount = 1;
            } else {
              updatedItem.amount = Math.max(1, updatedItem.amount + quantity);
            }
            return updatedItem;
          }
          return cartItem;
        });
        setCart(updatedCart);
      };
      
    return(
        <>
        <Container className="cart-list">
        <Table striped bordered className="table-sm table-cart">
        <thead>
            <tr className="text-center">
                <th>No.</th>
                <th>Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {cart?.map((item, index)=>{
                return(
                    <tr>
                        <td className="text-center">{index+1}.</td>
                        <td>{item.name_menu}</td>
                        <td className="text-center">Rp.{item.price}</td>
                        <td className="text-center">
                            <div className="quantity-cart">
                                <Button variant='warning' className='min-btn-cart-list' onClick={()=>handleQuantityChange(item, -1)}>-</Button>
                                <div className="number-cart-list">{item.amount}</div>
                                <Button variant='warning' className='plus-btn-cart-list' onClick={()=>handleQuantityChange(item, +1)}>+</Button>
                            </div>
                        </td>
                        <td className="text-center">
                            Rp.{item.amount * item.price}
                        </td>
                        <td className="text-center">
                            <Button variant="danger" onClick={()=>handleRemove(item.id_menu)}>Delete</Button>
                        </td>
                    </tr>
                )
            })}
        </tbody>
        </Table>
        <div className="total">
        <div className="total-title"><h2>Total: </h2></div>
        <div className="total-cart"><h2>Rp.{price}</h2></div>
        <Button className="confirm-btn" onClick={()=>setShow(true)}>Confirm</Button>
        </div>
        </Container>
        </>
    )
}

export default Cart;