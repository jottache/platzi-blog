import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import '../css/eye.css'


const Tabla = (props)=>{
    const ponerFIlas = () => (
        props.users.map((user,key)=>(   //le pasamos key como parametros, nos permitira tener un una numeracion desde el 0 
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.website}</td>
                    <td>
                        <Link to={`/publicaciones/${key}`}>      {/* este link se conecta con react router y nos recibe el key para agregarlo a la ruta*/}   
                            <div className="eye-solid2 icon"></div>  {/* este es un icono creado con vanilla css, tiene forma de un ojo */}
                        </Link>
                    </td>
                </tr>
        ))
    )

    return(
        <div>
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
                           ponerFIlas()
                        }
                </tbody>
            </table>
    </div>
    )
}

const mapStateToProps = (reducers)=>{
    return reducers.usuariosReducer
}

export default connect(mapStateToProps) (Tabla) //no necesitamos las acciones en este componente por que el componente usuarios ya las esta trayendo, ya trae los usuarios

//conectamos el componente con el store gracias a connect ya este componente puede obtener los datos de los reducers. en este caso queremos obtener los de usuariosReducer que es donde llegan los datos de la API por medio de la accion. debemos recordar que este es un Dumb Component por lo tanto no es una clase y las funciones deben estar con CONST, tambien es importante recordar que por el tipo de componente tampoco llevara this, unicamente props.