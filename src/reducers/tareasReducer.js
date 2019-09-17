import {TRAER_TAREAS,CARGANDO,ERROR,CAMBIO_USUARIO_ID,CAMBIO_TITULO,AGREGADA} from '../types/tareasTypes'

const INITIAL_STATE = {
    tareas: {},
    cargando: false,
    error: '',
    usuario_id: '',
    title: ''
}
export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case TRAER_TAREAS:
            return {...state,
                tareas: action.payload,
                cargando: false
                }
        
        case CARGANDO:
            return {...state, cargando: true}
        case ERROR:
            return {...state, 
                error: action.payload,
                cargando: false
            }
        case CAMBIO_USUARIO_ID:
            return {...state, usuario_id: action.payload}
        case CAMBIO_TITULO:
            return {...state, title: action.payload}
        case AGREGADA:
            return {...state, tareas: {}, cargando: false, error: ''}
        default: 
            return state
    }
}