import React from 'react'
import "./style.css";



export default function Header() {
  function logoutFunc() {
    return alert("logout");
  }
  return (
     <div className='navbar'>
       <p href="/"> Finance</p>
       <p onClick={logoutFunc} href="">Logout</p>
    </div>
  )
}
