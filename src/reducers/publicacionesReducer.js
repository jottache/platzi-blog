import {ACTUALIZAR, CARGANDO,ERROR} from '../types/publicacionesTypes'


const INITIAL_STATE = {
    publicaciones: [],
    cargando: false,
    error: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case ACTUALIZAR:
            return {...state, 
                publicaciones: action.payload,
                cargando: false,
                error: ''
            }
            case CARGANDO:
                    return {...state, cargando: true}
                case ERROR:
                    return {...state, 
                        error: action.payload,
                        cargando: false
                    }
        default: 
            return state
    }
}

//creamos un types para publicaciones de manera que no tengamos que modificar demasiado los types y case de otros reducer, solo debemos cambiar el contenido de las constantes de los types

//usamos la misma sintaxis para manejar los estados de error y cargando.

//