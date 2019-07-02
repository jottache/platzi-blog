import {TRAER_TODOS} from '../types/usuariosTypes'


const INITIAL_STATE = {
    users: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case TRAER_TODOS:
            return {...state, users: action.payload}
        default: 
            return state
    }
}

//aqui creamos el dato inicial de este reducer el cual es un array vacio, y creamos el reducer el cual sera una arrow function que recibe como parametros el estado inicial del reducer y la accion que es la que detonara el cambio del estado. esta funcion debe tener un switch la cual recibe los accions (enviados por el dispatch) y dependiendo de el nombre de la accion, el cual sera un caso, retornara 2 cosas: el estado inicial desglosado y lo que tendra el action.payload que viene del dispatch. es importante entender que el desglosado (...state) lo que hace es usar todos los datos del estado y le agrega lo que le mandamos por el payload, esto retornara un estado nuevo, no sobrescribe el estado anterior

//aqui tambien usamos el archivo type para evitar errores de typo.. debe estar encerrado dentro de llaves en el import