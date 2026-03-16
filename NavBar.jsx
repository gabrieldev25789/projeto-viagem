import React from 'react'
import "./NavBar.css"

function NavBar() {
  return (
    <>
    <div id='intro' className='NavBar'>

    <div>
        <h1>Welcome to GrizzyFlyes</h1>
    </div>

    <div>
            <ul id='list'>
                <li>Contact</li>
                <li>Promotions</li>
                <li>Places</li>
                <li>Configs</li>
            </ul>
    </div>
    </div>

    </>

  )
}

export default NavBar