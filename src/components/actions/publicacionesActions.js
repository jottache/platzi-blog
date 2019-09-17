import {ACTUALIZAR} from '../../types/publicacionesTypes'
import axios from 'axios'
import * as usuariosTypes from '../../types/usuariosTypes' 

const {TRAER_TODOS: USUARIOS_TRAER_TODOS} = usuariosTypes  //esto lo hacemos para sacar unicamente uno de los valores y renombrarlo para us uso

export const traerPorUser = (key) => async (dispatch, getState) =>{
    const {users} = getState().usuariosReducer  // metemos en una constante el estado de usuariosReducer que ya tendra todos los datos de usuario y lo abrimos con destructuring
    const {publicaciones} = getState().publicacionesReducer
    const user_id = users[key].id   //en una constante metemos el id del user. el key representa el user espesifico. 
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${user_id}`)  //pasamos el id por la url para que traiga lso datos de un usuario en espesifico

    const nuevas = response.data.map((publicacion)=>(
        {
            ...publicacion,
        comentarios: [],
        abierto: false
    }
    ))

    const publicaciones_actualizadas = [
        ...publicaciones,
        nuevas //ahora estoy agregandole a las publicaciones que son un array vacio, todo lo que llegue de la promesa, mas 2 keys, comentarios que es un array vacio y abierto que es un key que empieza en falso
    ]
        dispatch({
            type: ACTUALIZAR,
            payload: publicaciones_actualizadas
        })
    
    const publicaciones_key = publicaciones_actualizadas.length -1
    const usuarios_actualizados = [...users]
    usuarios_actualizados[key] = {
        ...users[key],
        publicaciones_key: publicaciones_key
    }
    //aqui creamos una constante y dentro le hacemos un .length a publicaciones_actualizadas para saber el tamaño del array, luego le restamos 1 para que la posicion sea exacta con respecto al numero de arrays, es decir, en caso de que llegue 1 solo, sea en la posicion 0, si llegan dos tendra la posicion 1 y asi...
    //luego agarramos el estado de user, lo abrimos y le agregamos un key/valor con publicaciones_key

    dispatch({
        type: USUARIOS_TRAER_TODOS,
        payload: usuarios_actualizados
    })

}
//esta funcion recibira dichos parametros desde el onclick y en el dispatch hacemos que haga un console.log de, la cantidad de arrays que hay en publicaciones y la publiccion exacta a cual clickeamos de ese susuario
export const abrirCerrar = (publicaciones_key,comentarios_key) => (dispatch,getState)=>{
    const {publicaciones} = getState().publicacionesReducer
                                     //cantidad de arrays - publicacion seleccionada
    const seleccionada = publicaciones[publicaciones_key][comentarios_key]
    //con seleccionada estoy tomando la publicacion a la que le di click de el usuario al que le di click.

    const actualizada = {
        ...seleccionada,
        abierto: !seleccionada.abierto
    } //actualizada le hace un spread operator a seleccionada(la que acabo de darle click) y le cambia el estado de abierto al estado contrario de abierto que este en ese momento, esto funcionara para que cuando esta bierto podamos cerrarlo


    //esta es la parte de inmutabilidad
    //necesito decirle nivel por nivel que publicacion estoy eligiendo
    const publicaciones_actualizadas = [...publicaciones] //metemos en un array todas las publicaciones
    publicaciones_actualizadas[publicaciones_key] = [...publicaciones[publicaciones_key]]
    publicaciones_actualizadas[publicaciones_key][comentarios_key] = actualizada
    
    dispatch({
        type: ACTUALIZAR,
        payload: publicaciones_actualizadas
    })
    //al usuario clickear en una publicacion del usuario mostrara cambiara el estados
}

export const traerComentarios = (publicaciones_key,comentarios_key) => async (dispatch, getState) =>{
    const {publicaciones} = getState().publicacionesReducer
    const seleccionada = publicaciones[publicaciones_key][comentarios_key]

    const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${seleccionada.id}`)
    const actualizada = {
        ...seleccionada,
        comentarios: response.data
    }
    
    const publicaciones_actualizadas = [...publicaciones]//creamos una nueva constante llamada publicaciones_actualizadas y le damos en un array todo lo que publicaciones tiene.
    publicaciones_actualizadas[publicaciones_key] = [...publicaciones[publicaciones_key]]//nos estamos llendo a uno en espesifico y le ponemos todo lo que tiene las publicaciones originales de esa casilla en espesifico
    publicaciones_actualizadas[publicaciones_key][comentarios_key] = actualizada //vamos un nivel mas adentro y la otra casilla a la que le dimos click la metemos en la constante actualizada
    dispatch({
        type: ACTUALIZAR,
        payload: publicaciones_actualizadas
    })
    
}






//Acción para que nos traiga las publicaciones de cierto usuario.

//aqui tambien traemos los types de usuarios

//queremos tener los datos de varios usuarios, por ejemplo, si tenemos los datos del usuario 10 y al volver a la lista de usuaarios le damos click a otro, queremos tener ambos datos disponibles . para esto tomamos el estado del reducer de publicaciones y luego creamos un array donde estaran todos esos datos. estos datos seran: los datos del reducer el cual tendra los datos de la primera promesa ya realizada al buscar un usuario, y los datos de la respuesta de la promesa que se realizara al clickear en otro usuario
//nota: la promesa debe estar antes de el array donde se meten los datos, obviamente.

