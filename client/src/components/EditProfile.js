import React, { Component } from 'react'
import NavBottom from './NavBottom/NavBottom'
import AuthService from '../service/authService'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

export default class EditProfile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: {
        imageUrl: '',
        username: '',
        email: '',
        password:""
      }
    }
    this.service = new AuthService()
    this.getUser()

  }

  getEditUser = () => {
    this.service.getEditDataUser()
      .then(res => {
        const { imageUrl, username, email,password } = res

        this.setState({
          imageUrl,
          username,
          email,
          password
        })

        this.props.setUser(res.data)



      })
      .catch(err => console.log(err))
  }

  getUser = () => {
    this.service.getDataProfile()
      .then(res => {
        const { imageUrl, username, email ,password} = res
        // console.log(imageUrl, username, email)
        this.setState({
          imageUrl,
          username,
          email,
          password
        })

        // this.props.setUser(res.data)

      })
      .catch(err => err)
  }


  handleFormSubmit = e => {
    e.preventDefault()
    const username = this.state.user.username
    const email = this.state.user.email
    const photo = this.state.photo
    const password = this.state.user.password

    this.service.editProfile(username, email, photo,password)
      .then(res => {
        this.setState({
          username: "",
          email: "",
          imageUrl: "",
          password:""
        }, () => {

          // this.props.setUser(res)

          window.location.assign('profile')
        })
      })
      .catch(err => err)
  }

  //esta funcion cambiara el valor del state, cada vez que se pulsa una tecla//
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ user: { ...this.state.user, [name]: value } });
    // console.log(this.state)
  }

  handleChangeIMG = (e) => {
    const { name, files, value } = e.target;
    this.setState({ "photo": files[0], [name]: value }, () => {
      // console.log(this.state)
    });
  }


  render() {
    return (

      <div className="container column-center">
        <h1 className="title">Editar perfil</h1>
        <form onSubmit={this.handleFormSubmit}>
          
          <div className="description-profile">
            <div className="userName">

              <input type="username" className="form-control" name="username" placeholder={this.state.username} value={this.state.user.username} onChange={e => this.handleChange(e)} />
            </div>
            <div className="email">

              <input type="email" className="form-control" name="email" placeholder={this.state.email} value={this.state.user.email} onChange={e => this.handleChange(e)} />

            </div>
            <div>
              <input className="form-control" type="password" name="password" placeholder="********" value={this.state.user.password} onChange={e => this.handleChange(e)} />
            </div>
            <div>
              <input className="form-control" type="file" name="imageUrl" placeholder={this.state.imageUrl} value={this.state.user.imageUrl} onChange={e => this.handleChangeIMG(e)} />
            </div>
          </div>
          <Button className="-destacado" variant="primary" type="submit">editar</Button>
        </form>
        <NavBottom />
        <Link to="/" className="nav-logout">Logout</Link>
      </div>
    )
  }
}
