import React, { Component } from 'react'
import AuthService from '../service/authService'
import NavBottom from './NavBottom/NavBottom'

export default class EventDetails extends Component {

    constructor(props){

        super(props)

        this.state = { 
            event : {}
    }

        this.service = new AuthService()

    }

    componentDidMount() {
      //console.log(this.props.match.params.id)
      console.log(this.state.event.organization)
      this.service.getOneEvent(this.props.match.params.id)
          .then(res => this.setState({ event: res, organization :{} }))
  }

removeEvento(){

    this.service.removeEvent(this.props.match.params.id)    
    .then(res => this.setState({event:res}))
    window.location.assign('/EventList')
}

    

  render() {
      console.log(this.state.event.organization)
      return (
          <div>
          <button onClick={() => this.removeEvento(this.state.event.id)}>Eliminar</button>
     <img src="/img/img-prueba2.jpg" alt="" className="event-image-detail"/>
      
           <div className="description-profile">
               <div className="userName">
                   <p className="title">Location</p>
                   <p>{this.state.event.location}</p>
               </div>
               <div className="userName">
                   <p className="title">centro</p>
                   <p>{this.state.event.center}</p>
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
               <div className="userName">
                   <p className="title">Comments</p>
                   <p>{this.state.event.comments}</p>
               </div>
           </div> 
           
              
           <NavBottom/>

          </div>

      
 
    )
  }
}
