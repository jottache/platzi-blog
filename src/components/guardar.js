import React, {Component} from 'react'
import {connect} from 'react-redux'
import Spinner from './Spinner'
import Fatal from './Fatal'
import {Redirect} from 'react-router-dom'

import * as tareasActions from '../components/actions/tareasActions'


class Guardar extends Component{
    componentDidMount(){
        const {
            match: {params: {usuario_id,tarea_id}},
            tareas,
            cambioUsuarioId,
            cambioTitulo
        } = this.props

        if(usuario_id && tarea_id){
            const tarea = tareas[usuario_id][tarea_id]
            cambioUsuarioId(tarea.userID)
            cambioTitulo(tarea.title)
        }
    }
    cambioID = (event) =>{
        this.props.cambioUsuarioId(event.target.value)
    }
    cambioTI= (event) =>{
        this.props.cambioTitulo(event.target.value)
    }
    guardar = () =>{
        const {usuario_id, title, agregar} = this.props
        const nuevaTarea = {
            userID: usuario_id,
            titulo: title,
            completed: false
        }
        agregar(nuevaTarea)  
    }
    desabilitar = () => {
        const {usuario_id, title, cargando} = this.props
        if(cargando){
            return true
        }
        if(!usuario_id || !title){
            return true
        }
        return false
    }
    mostrarAccion = () => {
        const {error,cargando} = this.props
        if(cargando){
            return <Spinner/>
        }
        if(error){
            return <Fatal mensaje={error}/>
        }
    }
    render(){
        return(
            <div>
                <h1>Guardar Tarea</h1>
                usuario id:
                <input type="number" value={this.props.usuario_id} onChange={this.cambioID}/>
                <br/>
                <br/>
                titulo:
                <input type="text" value={this.props.title} onChange={this.cambioTI}/>
                <br/><br/>
                <button 
                    onClick={this.guardar}
                    disabled={this.desabilitar()}  //aqui tengo que correr la funcion ya que es una propiedad que se evalua apenas carga el boton
                >
                    guardar
                </button>
                {this.mostrarAccion()}
            </div>
        )
    }
}
const mapStateToProps = ({tareasReducer}) =>{
    return tareasReducer
}

export default connect(mapStateToProps, tareasActions) (Guardar)