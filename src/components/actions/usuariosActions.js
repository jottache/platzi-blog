import axios from 'axios'
import {TRAER_TODOS} from '../../types/usuariosTypes'


export const traerTodos = () => async (dispatch) =>{
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')

        dispatch({
            type: TRAER_TODOS,
            payload: response.data
        })
    } catch (error) {
        console.log('error:', error.message)
    }
}

/*aqui tenemos la accion, es una arrow function la cual llama a la funcion dispatch que trae redux, usamos doble arrow function para reducir el codigo que qeudaria asi:

            const traerTodos = () => {
                return (dispatch) => {
                    dispatch({
                        type: 'traer_usuarios',
                        payload: [1, 2, 3]
                    });
                };
            };

esta funcion dispatch recibe un objeto con el type (el cual es el case del reducer de usuariosReducer) y el payload, que es lo que va a retornar con el estado nuevo

ahora importamos el axios aqui para poder traer los datos de la API, justo antes del dispatch usamos el axios y al dispatch le damos los datos de la respuesta segun los datos del API como esta funcion la llamamos en el componentDidMounth() mostrara los datos. es importante hacer que la arrow function del dispatch sea asincrona ya que estamos usando una promesa
*/

//tambien usamos el archivo types para evitar errores de typo en el nombre de los type del dispatch. debe estar encerrado dentro de llaves en el import

//otro metodo para evitar errores es usar try catch, que no solo nos ayuda a identificar el error sino que nos permite mostrarle al usuario cuando ocurre uno de estos errores y poder notificar acciones recomendadas. el codigo a ejecutar (en este caso la promesa) permanece dentro del try mientras que el catch encierra el error y cuando este suceda, ejecutara lo que este dentro de las instrucciones, podemos utilizar un componente incluso para mostrar un error de una manera mas visual