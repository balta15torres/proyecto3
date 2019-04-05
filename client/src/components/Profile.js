import React, { Component } from 'react'
import AuthService from '../service/authService'

import NavBottom from './NavBottom/NavBottom'
import { Link } from 'react-router-dom'




export default class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: {
                imageUrl: '',
                username: '',
                email: ''
            }
        }
        this.service = new AuthService()
        this.getUser()
    }

    getUser = () => {
        this.service.getDataProfile()
            .then(res => {
                const { imageUrl, username, email } = res

                this.setState({
                    imageUrl: imageUrl,
                    username: username,
                    email: email
                })

                this.props.setUser(res.data)

            })
            .catch(err => err)
    }


    render() {
        return (
            <div className="container column-center">
                <Link to="/editProfile" className="edit"></Link>
                <div className="image-profile">
                    
                    <img className="card-img-top" src={this.state.imageUrl} alt={this.state.imageUrl} />
                </div>
                <div className="">
                    <div className="userName">
                       
                        <p className="title">{this.state.username}</p>
                    </div>
                    <div className="email">
                       
                        <p>{this.state.email}</p>
                    </div>
                </div>
                <NavBottom />
                <Link to="/" className="nav-logout">Logout</Link>
            </div>




        )
    }
}

