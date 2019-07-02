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