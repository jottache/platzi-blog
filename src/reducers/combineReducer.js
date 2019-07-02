import {combineReducers} from 'redux'
import usuariosReducer from './usuariosReducer'

export default combineReducers({
    usuariosReducer
})

//aqui usamos combineReducers para crearuna funcion que almacena todos los reducers, en esta hoja debemos importar todos los reducers que creemos y estos se los pasamos a la funcion la cual exportamos para que el connect los agregue a los componentes deseados.