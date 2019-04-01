import React, { Component } from 'react'
import AuthService from '../service/authService'
import NavBottom from './NavBottom/NavBottom'

export default class EventDetails extends Component {

    constructor(props){

        super(props)

        this.state = { event : {} }

        this.service = new AuthService()

    }

    componentDidMount() {
      console.log(this.props.match.params.id)

      this.service.getOneEvent(this.props.match.params.id)
          .then(response => this.setState({ event: response }))
  }

    

  render() {
    return (
      <div>
      <h1>Detalles Evento</h1>
      
           <div className="description-profile">
               <div className="userName">
                   <p className="title">Location</p>
                   <p>{this.state.event.location}</p>
               </div>
               <div className="userName">
                   <p className="title">Data</p>
                   <p>{this.state.event.data}</p>
               </div>
               <div className="userName">
                   <p className="title">Hour</p>
                   <p>{this.state.event.hour}</p>
               </div>
               <div className="userName">
                   <p className="title">Participants</p>
                   <p>{this.state.event.participants}</p>
               </div>
           </div> 

           <button type="delete">Delete</button>
              
           <NavBottom/>

          </div>

      
 
    )
  }
}
