import React from 'react'

const Fatal = (props) =>(
    <h2 className="fatal">{props.mensaje}</h2>
)

export default Fatal

//este componente le llegan propiedades enviadas desde su padre (usuarios) 