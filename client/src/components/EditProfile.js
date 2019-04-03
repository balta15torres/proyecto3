import React, { Component } from 'react'
import NavBottom from './NavBottom/NavBottom' 
import AuthService from '../service/authService'
import Button from 'react-bootstrap/Button'

export default class EditProfile extends Component {

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

  getEditUser = () => {
    this.service.getEditDataUser()
    .then(res=> {
      const {imageUrl,username,email} = res

      this.setState({
        imageUrl,
        username,
        email
      })

      this.props.setUser(res.data)



  })
  .catch(err => console.log(err))
  }

  getUser = () => {
    this.service.getDataProfile()
    .then (res =>{
        const {imageUrl, username, email} = res
        console.log(imageUrl, username, email)
        this.setState({
            imageUrl, 
            username,   
            email
        })

        // this.props.setUser(res.data)
    
    })
    .catch (err => err)
}
  
  
  handleFormSubmit = e => {
    e.preventDefault()
    const username = this.state.username
    const email = this.state.email
    const photo = this.state.photo

    this.service.editProfile(username, email, photo)
      .then(res => {
        this.setState({
          username: "",
          email: "",
          imageUrl: ""
        })
        this.props.setUser(res)

        window.location.assign('/profile')
      })
      .catch(err => err)
  }

  //esta funcion cambiara el valor del state, cada vez que se pulsa una tecla//
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({user:{...this.state.user, [name]: value }});
  }
    

  render() {
    return (
      
      <div className="container column-center">
        <h1>modifica</h1>
        <form onSubmit={this.handleSubmit}>
        <Button variant="primary" type="submit">Submit</Button>
        <div className="description-profile">
               <div className="userName">
                   
                   <input type="username" className="form-control" name="username" placeholder={this.state.username} value={this.state.user.username} onChange={e => this.handleChange(e)} />
               </div>
               <div className="email">
                  
                   <input type="email" className="form-control" name="email" placeholder={this.state.email} value={this.state.user.email} onChange={e => this.handleChange(e)} />
                  
               </div>
               <div>
                  <input className="form-control" type="file" name="imageUrl" placeholder={this.state.imageUrl} value={this.state.user.imageUrl} onChange={e => this.handleChangeIMG(e)} />
               </div>
        </div>
        </form>
        <NavBottom/>
      </div>
    )
  }
}
