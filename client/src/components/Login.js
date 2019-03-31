import React, { Component } from 'react'
import AuthService from '../service/authService'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'


export default class Login extends Component {

  constructor(props) {
    super(props)
    this.state = { email: '', password: '' }
    this.service = new AuthService()
  }

  handleFormSubmit = e => {
    e.preventDefault()
    const email = this.state.email
    const password = this.state.password

    this.service.login(email, password)
      .then(res => {
        this.setState({ email: "", password: "" })

        this.props.setUser(res)

        window.location.assign('Home')
      })
      .catch(err => err)
  }

  //esta funcion cambiara el valor del state, cada vez que se pulsa una tecla//
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }


  render() {

    return (

      <div className="container column-center">
        <div className="logo">
          <p>LOGO</p></div>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Group controlId="formBasicEmail">

            <Form.Control type="email" name="email" placeholder="Enter email" value={this.state.email} onChange={e => this.handleChange(e)} />
          
          </Form.Group>

          <Form.Group controlId="formBasicPassword">

            <Form.Control type="password" name="password" placeholder="Password" value={this.state.password} onChange={e => this.handleChange(e)} />
          
          </Form.Group>

          <Button type="submit">Submit</Button>
        
        </Form>

        <p>¿Aún no estás registrado? </p>
        <Link to='/signup' className="nav-element"><u>Registrarse</u> </Link>

      </div>

    )
  }
}
