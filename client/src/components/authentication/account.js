import React from 'react'
import axios from '../../config/axios'
import { MDBIcon } from "mdbreact"
import { Link } from 'react-router-dom'

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
            <div>{
                this.state.isLoaded ?
                    <div className="container text-center" >
                        <h2 className="text-center" ><MDBIcon icon="user" /> {this.state.user.name}'s Profile </h2>
                        <button type="button" className="btn btn-primary">
                            Followers <span className="badge badge-light">{this.state.user.followers.length}</span>
                        </button>
                        <button type="button" className="btn btn-primary">
                            Following <span className="badge badge-light">{this.state.user.following.length}</span>
                        </button>
                        {this.state.stories.length === 0 ? (<p> No stories found</p>) :
                            (
                                <div className="m-1">
                                    {
                                        this.state.stories.filter(story => story.user === this.state.user._id).map(story => {
                                            return (
                                                <div className="card mb-3" key={story._id}>
                                                    <div className="row no-gutters">
                                                        <div className="col-md-4">
                                                            <img src={`http://localhost:3025/${story.previewImageUrl}`} className="card-img" alt="..." />
                                                        </div>
                                                        <div className="col-md-8">
                                                            <div className="card-body">
                                                                <h5 className="card-title"><Link to={`/story/${story._id}`}>{story.title}</Link></h5>
                                                                <p className="card-text"><small className="text-muted">{story.publishedDate}</small></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                </div>
                            )
                        }
                    </div> : <h2 className="d-block text-center">Loading...</h2>
            }
            </div>
        )
    }
}
export default Account