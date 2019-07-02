import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import { createStore,applyMiddleware } from 'redux'
import {Provider} from 'react-redux'
import reducers from './reducers/combineReducer'
import reduxThunk from 'redux-thunk'

const store = createStore(
    reducers, //todos los reducers
    {}, //estado inicial
    applyMiddleware(reduxThunk)
)



ReactDOM.render(
<Provider store={store}>
    <App/>
</Provider>,
document.getElementById('root'))

//en el index.js que es donde se renderizara toda la app es en donde vamos a crear el Store que nos proveera de todos los datos. este lo creamos importando el createStore y usandolo como funcion en una constante, dentro del store se reciben 2 datos (el tercer dato es opcional): los reducers y el estado inicial de la app

// el Stores vamos a pasarlo al "Provider" el cual es el proveedor de datos a toda la app

//es importante agregar los middlewares, en este caso instalaremos reduxThunk y se lo agregaremos al store por medio de applyMiddleware el cual lo importamos junto a createStore, a este applyMiddleware le pasamos el reduxThunk.

