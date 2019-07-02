import React from 'react'
import {Link} from 'react-router-dom'

const Menu = (props) =>(
    <nav id="menu">
        <Link to="/">usuarios</Link>
        <Link to="/tareas">tareas</Link>
    </nav>
)
export default Menu

//aqui usamos "Link" y "to" para que no se recargue la pagina cada vez que usamos el router