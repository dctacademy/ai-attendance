import React from 'react'
import axios from '../../config/axios'
import { Card, CardBody } from 'reactstrap'
import { MDBIcon } from "mdbreact"

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            isRegistered: false,
            type: "password"
        }
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { name, username, email, password, confirmPassword } = this.state
        if (password !== confirmPassword) {
            window.alert("Password didn't match")
        } else {
            const formData = {
                name,
                username,
                email,
                password
            }
            axios.post(`/users/register`, formData)
                .then(res => console.log(res.data))
                .then(() => this.props.history.push('/users/login'))
                .catch(err => console.log(err))
            this.setState(() => ({
                name: '',
                username: '',
                email: '',
                password: ''
            }))
        }

    }
    handleChange = (e) => {
        e.persist()
        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
    }
    handleChecked = (e) => {
        e.target.checked ? this.setState(() => ({ type: "text" })) : this.setState(() => ({ type: "password" }))
    }
    render() {
        return (
            <div className="container">
                <Card className="m-5" >
                    <form onSubmit={this.handleSubmit} className="form">
                        <CardBody>
                            <h2 className="m-3  text-center"><MDBIcon icon="user-plus" /> Please Register </h2>

                            <div className="form-group ml-5 mr-5">
                                <label ><MDBIcon icon="user" /> Name:</label>
                                <input className="form-control" type="text" value={this.state.name} onChange={this.handleChange} placeholder="enter name" name="name" required />
                            </div>

                            <div className="form-group ml-5 mr-5">
                                <label ><MDBIcon icon="user" /> Username:</label>
                                <input className="form-control" type="text" value={this.state.username} onChange={this.handleChange} placeholder="enter username" name="username" required />
                            </div>

                            <div className="form-group ml-5 mr-5">
                                <label ><MDBIcon icon="envelope" /> Email:</label>
                                <input className="form-control" type="email" value={this.state.email} onChange={this.handleChange} placeholder="enter email id" name="email" required />
                            </div>

                            <div className="form-group ml-5 mr-5">
                                <label ><MDBIcon icon="key" /> Password:</label>
                                <input className="form-control" type={this.state.type} value={this.state.password} onChange={this.handleChange} placeholder="enter password" name="password" required />
                            </div>
                            <div className="form-group ml-5 mr-5">
                                <label ><MDBIcon icon="key" /> Confirm Password:</label>
                                <input className="form-control" type={this.state.type} value={this.state.confirmPassword} onChange={this.handleChange} placeholder="confirm password" name="confirmPassword" required />
                            </div>
                            <div className="form-group ml-5 mr-5">
                                <input type='checkbox' onChange={this.handleChecked} className="checkbox m-2" />
                                <label> show password</label>
                            </div>

                            <input type="submit" className="btn btn-primary ml-5" />
                        </CardBody>
                    </form>
                </Card>
            </div>
        )
    }

}

export default Register
