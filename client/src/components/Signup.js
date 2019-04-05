import React, { Component } from 'react'
import AuthService from '../service/authService'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'


export default class Signup extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: "",
      password: '',
      imageUrl: ""
    }
    this.service = new AuthService()
  }

  handleFormSubmit = e => {
    e.preventDefault()
    const username = this.state.username
    const email = this.state.email
    const password = this.state.password
    const photo = this.state.photo

    this.service.signup(username, email, password, photo)
      .then(res => {
        this.setState({
          username: "",
          email: "",
          password: "",
          imageUrl: ""
        })
        this.props.setUser(res)

        window.location.assign('login')
      })
      .catch(err => err)
  }

  //esta funcion cambiara el valor del state, cada vez que se pulsa una tecla//
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleChangeIMG = (e) => {
    const { name, files, value } = e.target;
    this.setState({ "photo": files, [name]: value }, () => {
      console.log(this.state)
    });
  }

  render() {
    return (
      <div className="container column-center">
        {/* <p>
         ¿Estas registrado? 
         <Link to='/login' className="nav-element">
         Conectate</Link>
      </p> */}
        <p className="title">REGISTRATE</p>
        <div className="signup">
          <Form onSubmit={this.handleFormSubmit}>
            <Form.Group controlId="formBasicEmail">

              <Form.Control type="username" name="username" placeholder="Enter username" value={this.state.username} onChange={e =>
                this.handleChange(e)} />

              <Form.Control type="email" name="email" placeholder="Enter email" value={this.state.email} onChange={e =>
                this.handleChange(e)} />

            </Form.Group>
            <Form.Group controlId="formBasicPassword">

              <Form.Control type="password" name="password" placeholder="Password" value={this.state.password} onChange={e =>
                this.handleChange(e)} />
            </Form.Group>
            <div className="form-group">

              <input className="form-control -file" type="file" name="imageUrl" placeholder="image" value={this.state.imageUrl} onChange={e => this.handleChangeIMG(e)} />
            </div>
            <Button className="-destacado" variant="primary" type="submit">Submit</Button>
          </Form></div>
      </div>
    )
  }
}
