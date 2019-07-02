import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as usuariosActions from '../components/actions/usuariosActions'

class Usuarios extends Component{
    
   

    componentDidMount(){
        this.props.traerTodos()
    }

    ponerFIlas = () => (
        this.props.users.map((user)=>(
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.website}</td>
                </tr>
        ))
    )

    render(){
        console.log(this.props)
        return(
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>nombre</th>
                            <th>email</th>
                            <th>link</th>
                        </tr>
                    </thead>
                    <tbody>
                            {
                               this.ponerFIlas()
                            }
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (reducers) =>{
    return reducers.usuariosReducer
}

export default connect(mapStateToProps,usuariosActions) (Usuarios) 


//el componentDidMount debe ser una funcion asincrona si es que en esta estamos esperando datos de una API
//si usamos la libreria de axios para hacer promesas usamos axios.get('url') para llamar la API

// el connect funciona como el conector de los componentes al store. una vez que se lo agregamos a un componente este ya tendra disponible todos los reducer que le enviamos del combineReducers, este connect tiene dentro de sus parametros una funcion que por convencion llamamos "mapStateToProps" la cual usaremos despues de el render completo del componente para recibir los reducers, sera una funcion hecha con arrow Function y recibira por parametro todos los reducers, luego, dentro de esta funcion podemos decidir cual de todos los reducers queremos añadirle a el componente llamandolo por el nombre del reducer que tiene en el combineReducer, es este caso usamos "reducers.usuariosReducer"

//ahora que tenemos esos datos por propiedades en el componente debemos hacer uso de "Props" en vez de "State" cuando queramos hacer uso de esos datos.

//luego en el connect agregamos el action que vamos a utilizar en el componente, ya tendriamos disponible las funciones que creemos en usuariosActions (como por ejemplo traetTodos() )y la llamamos en el componentDidMount con this.props.traerTodos() ya que viene por propiedades del connect. si hacemos un console.log notaremos que obtenemos un objeto que dentro de ella tiene la funcion traerTodos() 

//notamos tenemos 2 hystories en la consola, ya que estamos haciendo un console.log de las propiedades en el render y luego en el componentDidMount() estamos llamando a la funcion traerTodos(), una de estas hystoris sera el estado inicial y el otro tendra el estado nuevo con lo que le mandamos en el payload de la accion al reducer.

