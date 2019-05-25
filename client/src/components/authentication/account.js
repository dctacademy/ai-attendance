import React from 'react'
import axios from '../../config/axios'

class Account extends React.Component {
    constructor() {
        super()
        this.state = {
            user: '',
            stories: [],
            isLoaded: false
        }
    }
    componentDidMount() {
        axios.get("/users/account")
            .then(res => {
                this.setState(() => ({ user: res.data, isLoaded: true }))
            })
            .catch(err => console.log(err))
        axios.get('/story')
            .then(res => {
                this.setState(() => ({ stories: res.data }))
            })
            .catch(err => console.log(err))
    }
    render() {
        console.log(this.state.user)
        return (
            <div>
                Yolo
            </div>
        )
    }
}
export default Account