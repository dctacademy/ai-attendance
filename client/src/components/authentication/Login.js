import React from 'react'
import axios from '../../config/axios'
import { MDBIcon } from "mdbreact"
import { Redirect } from 'react-router-dom'
import { Card, CardBody } from 'reactstrap'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            notice: '',
            redirect: false,
            type: "password"
        }
    }
    
    handleChecked = (e) => {
        e.target.checked ? this.setState(() => ({ type: "text" })) : this.setState(() => ({ type: "password" }))
    }
    handleChange = (e) => {
        e.persist()
        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { email, password } = this.state
        const formData = {
            email,
            password
        }
        console.log(this.props)
        axios.post("/users/login", formData)
            .then(res => {
                axios.defaults.headers['x-auth'] = res.data
                localStorage.setItem('token', res.data)
                this.props.handleIsAuthenticated(true)
                this.setState(() => ({
                    redirect: true
                }))
            })
            .catch(err => {
                console.log(err)
                this.setState(() => ({
                    notice: err.response.data.notice
                }))
            })
        this.setState(() => ({
            email: '',
            password: '',
            confirmPassword: ''
        }))
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to="/" />
        }
        return (
            <div className="container ">
                {
                    this.state.notice && <p>{this.state.notice}</p>
                }
                <Card className="m-5" >
                    <form onSubmit={this.handleSubmit} className="form">
                        <CardBody>
                            <h2 className="m-3 text-center"><MDBIcon icon="sign-in-alt" /> Please Log in</h2>

                            <div className="form-group ml-5 mr-5">
                                <label><MDBIcon icon="envelope" /> Email:</label>
                                <input className="form-control" type="email" value={this.state.email} onChange={this.handleChange} placeholder="enter email id" name="email" required />
                            </div>

                            <div className="form-group ml-5 mr-5">
                                <label ><MDBIcon icon="key" /> Password:</label>
                                <input className="form-control" type={this.state.type} value={this.state.password} onChange={this.handleChange} placeholder="enter password" name="password" required />
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
export default Login