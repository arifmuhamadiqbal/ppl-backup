import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from '../ui/Header'
import { Container, Button } from "react-bootstrap";
import MenuCard from './MenuCard';
import Cart from './Cart'
import CartCard from './CartCard'

const Main = () => {
  const [show, setShow] = useState(true);
  const [menus, setMenus] = useState([]);
  const [cart, setCart] = useState([]);


  useEffect(() => {
    getMenus();
  }, []);


  const handleClick = (menu)=>{
    setCart([...cart, menu])
    console.log(cart)
  }

  const getMenus = async () => {
    let response = await axios.get("http://localhost:5000/menus");
    setMenus(response.data);
    console.log(menus)
  };

  const handleChange = (item, d) =>{
		let ind = -1;
		cart.forEach((data, index)=>{
			if (data.id === item.id)
				ind = index;
		});
		const tempArr = cart;
		tempArr[ind].amount += d;
		
		if (tempArr[ind].amount === 0)
			tempArr[ind].amount = 1;
		setCart([...tempArr])
	}

  return (
    <>
      <Header setShow={setShow} />
      {show ? (
        <>
          <div className="kategori">Kategori :</div>
          <Button variant="warning" className="btn all-btn" >
            All
          </Button>
          <Button variant="warning" className="btn drink-btn">
            Drink
          </Button>
          <Button variant="warning" className="btn food-btn">
            Food
          </Button>
          <Button variant="warning" className="btn snack-btn">
            Snack
          </Button>
          <Container className="menus">
            {menus.map((menu) => (
              <MenuCard
                menus={menu}
                handleClick={handleClick}
                key={menu.id_menu}
              />
            ))}
          </Container>
          <Container className="cart">
            <div className="title-cart"><h1>Cart</h1></div>
            {cart.map((item)=>(
              <CartCard cart={item} key={item.id_menu}/>
            ))}
            <Button variant="warning" className="btn proceed-btn" onClick={()=>setShow(false)}>Proceed</Button>
          </Container>
        </>
      ) : (
        <Cart setShow={setShow} cart={cart} setCart={setCart} handleChange={handleChange}/>
      )}
    </>
  );
}

export default Main;