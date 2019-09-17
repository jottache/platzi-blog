import {combineReducers} from 'redux'
import usuariosReducer from './usuariosReducer'
import publicacionesReducer from './publicacionesReducer'
import tareasReducer from './tareasReducer'

export default combineReducers({
    usuariosReducer,
    publicacionesReducer,
    tareasReducer
})

//aqui usamos combineReducers para crearuna funcion que almacena todos los reducers, en esta hoja debemos importar todos los reducers que creemos y estos se los pasamos a la funcion la cual exportamos para que el connect los agregue a los componentes deseados.