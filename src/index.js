import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import { createStore } from 'redux'

/* initialState = {
    data: []
}

store = createStore(
    (state)=>state,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
) */

ReactDOM.render(<App/>, document.getElementById('root'))