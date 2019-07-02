import React, {Component} from 'react'

class App extends Component{
    render(){

        const ponerFIlas = () => [
            <tr>
                <td>jose</td>
                <td>jose@gmail.com</td>
                <td>joseito.com</td>
            </tr>,
            <tr>
                <td>jose</td>
                <td>jose@gmail.com</td>
                <td>joseito.com</td>
            </tr>
        ]
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
                                ponerFIlas()
                            }
                    </tbody>
                </table>
            </div>
        )
    }
}
export default App