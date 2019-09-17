import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as publicacionesActions from '../../components/actions/publicacionesActions'
import * as usuariosActions from '../../components/actions/usuariosActions'
import Spinner from '../Spinner'
import Fatal from '../Fatal'
import Comentarios from './Comentarios'

/* const {TraerTodos: usuariosTraerTodos} = usuariosActions
const {TraerTodos: publicacionesTraerTodos} = publicacionesActions */

class Publicaciones extends Component {
    async componentDidMount(){
        if(!this.props.usuariosReducer.users.length){  //para realizar la promesa solo cuando no haya nada dentro estado de usuariosReducer
            await this.props.usuariosTraerTodos()
        }
        if (this.props.usuariosReducer.error){ //para que el error pueda mostrarse debemos crear este if para que no haga ninguna busqueda si ya viene un error
            return;
        }
        if(!('publicaciones_key' in this.props.usuariosReducer.users[this.props.match.params.key])){
            this.props.traerPorUser(this.props.match.params.key)
        }
        //para realizar la promesa de las publicaciones de un usuario solo cuando demos click en un usuario que no posea el key publicaciones_key
    }

    ponerUsuario = () => {
        if (this.props.usuariosReducer.cargando || !this.props.usuariosReducer.users.length){ //se mostrara cuando este cargando, este estado viene del reducer de usuarios
            return <Spinner/>
        }
        if (this.props.usuariosReducer.error ){
            return <Fatal mensaje={this.props.usuariosReducer.error}/> //se mostrara si hay un error, viene del estado del reducer de usuarios
        }
        if (this.props.usuariosReducer.users.length){  //evalua si en el estado del reducer de usuarios llega algo, entonces buscara dentro del estado de users y dependiendo de la key mostrara el nombre del usuario en un h1
            return <h1 className="pub_name">publicaciones de {this.props.usuariosReducer.users[this.props.match.params.key].name}</h1>
        }
    }
    ponerPublicaciones = () =>{
        const {
            usuariosReducer, //this.props.usuariosReducer
            usuariosReducer: {users},   //this.props.usuariosReducer.users
            publicacionesReducer,   //this.props.publicacionesReducer
            publicacionesReducer: {publicaciones},  //this.props.publicacionesReducer.publicaciones
            match: {params: {key}}  //this.props.match.params.key
        } = this.props  //hacemos esto para no escribir continuamente this.props
        

        if(!users.length) return;   //evaluamos si llega algo dentro del array de users, para que no haga nada si no llega datos en ponerUsuario
        if(usuariosReducer.error) return;   //evaluamos si llega el error de usuariosReducer, para que si llega un error en el usuario, no sea necesario hacer ninguna accion en esta funcion sino que solo se renderizara la funcion del error en ponerUsuario
        if(publicacionesReducer.cargando){  //si llega cargando colocamos el spinner
            return <Spinner/>
        }
        if(publicacionesReducer.error){ //si llega error en publicacionesReducer colocamos el fatal
            return <Fatal mensaje={publicacionesReducer.error}/>
        }
        if(!publicaciones.length) return;   //evaluamos si llega vacio el array de publicacionesReducer.publicaciones, de ser asi no retorna nada
        if(!('publicaciones_key' in users[key])) return;    //evaluamos si llega la key que creamos dentro de el usuario que seleccionemos, esto es importante ya que cada usuario que seleccionemos tiene su propio publicaciones_key, y esto nos permitira elegirlo.
        const {publicaciones_key} = users[key]  // sacamos esa key del usuario que seleccionamos
        //de llegar algo en el array de publicaciones, hacemos un map dependiendo de la key que seleccionamos y devolvemos un div con el titulo y publicacion
        return this.mostrarInfo(publicaciones[publicaciones_key],publicaciones_key)
        
    }
    mostrarInfo = (publicaciones /* esta representa cada usuario */,publicaciones_key/* esta representa la cantidad de arreglos dentro de publicaciones */) => {
        return(
            publicaciones.map((publicacion,comentarios_key)=>(    
                <div className="pub_titulo" key={publicacion.id} 
                onClick={()=>this.mostrarComentarios(publicaciones_key,comentarios_key, publicacion.comentarios)}>
                    <h3>{publicacion.title}</h3>
                    <p>{publicacion.body}</p>
                    {
                        (publicacion.abierto) ? <Comentarios comentarios={publicacion.comentarios}/> : '' //componente que tendra los comentarios
                    }
                </div>
            ))
        )
    }
    // mostrarInfo es una funcion que se tendra el div donde se muestra el titulo y el cuerpo de la publicacion de cada usuario, esta funcion al estar dentro de otra, no tiene acceso directo a las constantes que estan fuera de ella, por ende tenemos que pasarselas como parametros.
    //publicaciones_key es el numero que representa la cantidad de datos dentro del array de publicaciones -1
    //publicaciones[publicaciones_key] es el usuario que seleccionamos para saber sus publicaciones,
    //estas son las constantes que debemos pasarle por parametros a esta funcion para que pueda renderizar los datos de dicho usuario, debemos hacer un map de todas las publicaciones de un usuario para obtenerlas por separado,
    //luego creamos una funcion que se activara por click, esta la metemos dentro del div con un onClick y esta misma va a llamar a esa funcion que recibe por nombre abrirCerrar(), a esta funcion le vamos a pasar por parametros dos cosas, la primera eslas publicaciones_key ya que hay que recordar q las publicaciones son un arreglo de arreglos. luego tenemos que saber de cual de todas las publicaciones del usuario le dimos click, asi que tenemos que mandarle esa publicacion en espesifico por parametros, esto lo sacamos con el map, agregandole otro parametro que llamaremos comentarios_key
    mostrarComentarios = (publicaciones_key,comentarios_key,comentarios) => {
        this.props.abrirCerrar(publicaciones_key,comentarios_key)
        if(!comentarios.length){
            this.props.traerComentarios(publicaciones_key,comentarios_key)
        }
    }
    
    render(){
        console.log(this.props)
        return(
            <div>
                {this.ponerUsuario()}
                {this.ponerPublicaciones()}
            </div>
        )
    }
}

const mapStateToProps = ({usuariosReducer,publicacionesReducer})=>{
    return {
        usuariosReducer,
        publicacionesReducer
    }
}
const mapDispatchToProps = {
    ...publicacionesActions,
    ...usuariosActions
}

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones)

//queremos pasar los datos de store a este componente, para eso lo que tenemos que hacer es conectarto con connect, sin embargo, si nos vamos desde la pagina de los usuarios a esta, los datos se transfieren directamente PERO al refrescar la pagina de publicaciones no podremos contar con esos datos, llegaria un arreglo vacio ya que no se estan llamando desde esta pagina. para arreglar esto lo que debemos hacer es pasar las acciones que necesitamos, en este caso la accion que contiene la funcion que llama a la API esta en usuariosActions, asi que debemos importarlo, una vez lo importamos dentro del componenDidMount() creamos un if que nos permite evaluar si ese arreglo llega vacio, y si no llega vacio llamamos a la funcion traerTodos(), de esta forma ya tendriamos los datos de la API

//multiples reducer en un componente: para pasar mas de un reducer en un componente solo hay que pasarselo al mapStateToProps por parametros, si tenemos mas de un reducer en un componente es necesario espesificar cual estamos usando, por ejemplo: ya no podemos pasar "this.props.users.length" por que no estariamos espesificando de que reducer usar los datos, tendriamos que agregar el reducer asi: "this.props.usuariosReducer.users.length"

//como vamos a pasar mas de una accion en este componente, creamos un objeto llamada mapDispatchToProps que ira al lado del mapStateToProps dentro del connect, y dentro del pasamos los dispatch (action creators) que utilizaremos, estas acciones debemos usarlas con sintaxis extendida u espread operator (...) para acceder a todos sus datos.

//