import axios from 'axios'

export const traerTodos = () => async (dispatch) =>{
    const response = await axios.get('https://jsonplaceholder.typicode.com/users')

    dispatch({
        type: 'get_users',
        payload: response.data
    })
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