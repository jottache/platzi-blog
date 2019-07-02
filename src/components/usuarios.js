import React, {Component} from 'react'
import axios from 'axios'

class Usuarios extends Component{
    
    state = {
        users: []
    }

    async componentDidMount(){
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        console.log(response)
        this.setState({
            users: response.data
        })
    }

    ponerFIlas = () => (
        this.state.users.map((user)=>(
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.website}</td>
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
export default Usuarios