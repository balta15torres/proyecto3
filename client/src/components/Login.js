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

      <div>
        <Link to='/signup' className="nav-element">Registrarse</Link>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Group controlId="formBasicEmail">

            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" value={this.state.email} onChange={e => this.handleChange(e)} />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Password" value={this.state.password} onChange={e => this.handleChange(e)} />
          </Form.Group>

          <Button variant="primary" type="submit">
Submit</Button>
        </Form>



      </div>

    )
  }
}
