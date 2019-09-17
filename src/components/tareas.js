import React, {Component} from 'react'
import {connect} from 'react-redux'

import * as tareasActions from '../components/actions/tareasActions'
import Spinner from '../components/Spinner'
import Fatal from '../components/Fatal'

class Tareas extends Component {
    componentDidMount = ()=> {
        if(!Object.keys(this.props.tareas).length){
            this.props.traerTareas()
        }
    }
    mostrarContenido = () => {
        const {tareas, cargando, error} = this.props
        if (cargando){
            return <Spinner/>
        }
        if (error){
            return <Fatal mensaje={error}/>
        }
        return Object.keys(tareas).map((usuario_id)=>(  //object se mete en las propiedades del objeto, y keys son los atributos (keys) de este objeto
            <div key={usuario_id}>
                <h1>tareas del usuario {usuario_id}</h1>
                <div>
                    {this.ponerTareas(usuario_id)}
                </div>
            </div>
        ))
    }
    ponerTareas = (usuario_id) =>{
        const {tareas} = this.props //objeto que llega por propiedades desde tareasActions, es como decir this.props.tareas
        const por_usuario = {
            ...tareas[usuario_id]
        }
        return Object.keys(por_usuario).map((tarea_id)=>(
                <div key={tarea_id}>
                    <input type="checkbox" defaultChecked={por_usuario[tarea_id].completed}/>
                    {
                        por_usuario[tarea_id].title
                    }
                </div>         
        ))
    }

    render(){
        return(
            <div>
                {this.mostrarContenido()}
            </div>
        )
    }
}

const mapStateToProps = ({tareasReducer}) =>{
    return tareasReducer
}
export default connect(mapStateToProps, tareasActions)(Tareas)