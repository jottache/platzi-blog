import React from 'react'

const Comentarios = (props) =>{

    const ponerComentarios = () => (
        props.comentarios.map((comentario)=>(
            <li key={comentario.id}>
                <h3>{comentario.email}</h3>
                <p>{comentario.body}</p>
            </li>
        ))
    )
    return(
        <ul>
            {ponerComentarios()}
        </ul>
    )
}
export default Comentarios