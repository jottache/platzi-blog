import React, {Component} from 'react'
import axios from 'axios'

class App extends Component{
    
    state = {
        users: []
    }

    async componentDidMount(){
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        this.setState({
            users:[{
                name: 'jose',
                email: 'jose@gmail.com',
                link: 'joseito.com'
            },
            {
                name: 'jose',
                email: 'jose@gmail.com',
                link: 'joseito.com'
            }
        ]
        })
    }

    ponerFIlas = () => (
        this.state.users.map((user)=>(
            
                <tr>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.link}</td>
                </tr>
            
        ))
    )

    render(){
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
export default App