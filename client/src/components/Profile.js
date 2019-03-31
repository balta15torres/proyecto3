import React, { Component } from 'react'
import AuthService from '../service/authService'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import NavBottom from './NavBottom/NavBottom'
import { Link } from 'react-router-dom'




export default class Profile extends Component {

    constructor(props){
        super(props)
        this.state = { 
            user:{
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
        .then (res =>{
            const {imageUrl, username, email} = res
            
            this.setState({ 
                imageUrl: imageUrl, 
                username: username, 
                email: email 
            })

            this.props.setUser(res.data)
        
        })
        .catch (err => err)
    }


render() {
    return (
       <div className="container column-center">
       <Link to="" className="edit"></Link>
           <div className="image-profile">
           <img src="/img/img-prueba.jpg"/>
            {/* <img className="card-img-top" src={this.state.imageUrl} alt={this.state.imageUrl} /> */}
           </div>
           <div className="description-profile">
               <div className="userName">
                   <p className="title">User name</p>
                   <p>{this.state.username}</p>
               </div>
               <div className="email">
                   <p className="title">Email</p>
                   <p>{this.state.email}</p>
               </div>
           </div>
           <NavBottom/>
       </div>

        
       
       
       )
    }
}

/* <Button variant="primary" type="submit">Tus eventos</Button>
<Button variant="primary" type="submit">Crear eventos</Button> */