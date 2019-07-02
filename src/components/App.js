import React from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Menu from './menu'
import Usuarios from './usuarios'
import Tareas from './tareas'

const App = () =>(
    
        <BrowserRouter>
            <Menu/>
            <Switch>
                <Route exact path='/' component={Usuarios} />
                <Route exact path='/tareas' component={Tareas} />
            </Switch>
        </BrowserRouter>
    
)

export default App

//importamos "BrowserRouter" que es en donde debemos encerrar la app para navegar sin recargar el navegador. "Route" para las distintas rutas a las que navegaremos, en esta van los componentes y debemos agregarle la ruta con exact path. "Switch" el switch nos ayudara a navegar entre las diferentes rutas