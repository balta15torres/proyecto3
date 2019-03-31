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
        <div>
        <Card style={{ width: '20rem' }}>
       
            <ListGroup className="list-group-flush" style={{color : "black"}}>
            <ListGroupItem>
         
                <img className="card-img-top" src={this.state.imageUrl} alt={this.state.imageUrl} />
            </ListGroupItem>
            <ListGroupItem>{this.state.username}</ListGroupItem>
            <ListGroupItem>{this.state.email}</ListGroupItem>
            </ListGroup>
        <Card.Body>
            <Link to="/">edit perfil</Link>
            
        </Card.Body>
        </Card>
        <NavBottom/>
        </div>
       
       
       )
    }
}

/* <Button variant="primary" type="submit">Tus eventos</Button>
<Button variant="primary" type="submit">Crear eventos</Button> */