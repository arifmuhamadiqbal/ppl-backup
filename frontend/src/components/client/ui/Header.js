import React from 'react'


const Header=({setShow})=>{
  return (
    <div className="header">
        <div className="header-child" />
        <b className="sirjio-cafe">Sirjio Cafe</b>
        <b className="s" onClick={()=>setShow(false)}>S</b>
    </div>
  )
}

export default Header