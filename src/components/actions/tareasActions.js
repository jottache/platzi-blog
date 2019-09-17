import axios from 'axios'
import {TRAER_TAREAS, CARGANDO,ERROR,CAMBIO_USUARIO_ID,CAMBIO_TITULO,AGREGADA} from '../../types/tareasTypes'


export const traerTareas = () => async (dispatch) =>{
    dispatch({
        type: CARGANDO
    })
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos')

        const tareas = {}
        response.data.map((tar)=>(
            tareas[tar.userId] = {
                ...tareas[tar.userId],  //esta es la parte de inmutable, sin ella no funciona porque se reescribe
                [tar.id]: {
                    ...tar
                }
            }
        ))
        console.log(tareas)

        dispatch({
            type: TRAER_TAREAS,
            payload: tareas
        })
    } catch (error) {
        console.log('error:', error.message)
        dispatch({
            type: ERROR,
            payload: 'informacion de tareas no disponible!'
        })
    }

}

export const cambioUsuarioId = (usuario_id) => (dispatch) =>{
    dispatch({
        type: CAMBIO_USUARIO_ID,
        payload: usuario_id
    })
}
export const cambioTitulo = (titulo) => (dispatch) =>{
    dispatch({
        type: CAMBIO_TITULO,
        payload: titulo
    })
}
export const agregar=(nuevaTarea)=>async(dispatch)=>{
    dispatch({
        type: CARGANDO
    })
    try{
        const response = await axios.post('https://jsonplaceholder.typicode.com/todos',nuevaTarea)
        console.log(response.data)
        dispatch({
            type: AGREGADA
        })
        }
    catch{
        dispatch({
            type: ERROR,
            payload: 'error'
        })
    }
}
export const editar =(tarea_editada) =>(dispatch)=>{
    console.log(tarea_editada)
}