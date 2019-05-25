import React from 'react'
import axios from '../../config/axios'
class Logout extends React.Component{
    
    componentDidMount(){
        axios.delete("/users/logout")
            .then(()=>{
                localStorage.clear()
                this.props.handleIsAuthenticated(false)
                this.props.history.push('/')
            })
            .catch(err=>console.log(err))        
    }
    render(){
        return(
            <div>
            </div>
        )
    }
  }
  export default Logout
