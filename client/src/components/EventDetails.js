import React, { Component } from 'react'
import AuthService from '../service/authService'
import NavBottom from './NavBottom/NavBottom'

export default class EventDetails extends Component {

    constructor(props) {

        super(props)

        this.state = {
            event: undefined
           
        }

        this.service = new AuthService()

    }

    componentDidMount() {
        //console.log(this.props.match.params.id)
        //console.log(this.state.event.organization)
        this.service.getOneEvent(this.props.match.params.id)
            .then(res => this.setState({ event: res }))
    }

    removeEvento() {

        this.service.removeEvent(this.props.match.params.id)
            .then(res => this.setState({ event: res }))
        window.location.assign('/EventList')
    }

    addUserEvento(props) {
        
        this.service.addUserEvent(this.props.match.params.id)
        .then(res => this.setState ({event:res}))

        // window.location.assign('/EventDetails')
        
    }



    render() {
        if(this.state.event){
            console.log(this.state.event.idParticipants[0])
        return (
            <div>
                <button onClick={() => this.removeEvento(this.state.event.id)}>Eliminar</button>
                
                <button onClick={() => this.addUserEvento(this.state.event.id)}>inscribirte</button>
                
                <img src="/img/img-prueba2.jpg" alt="" className="event-image-detail" />

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
                        <div>{this.state.event.idParticipants.map(user => <p><strong>username:</strong>{user.username} <br></br><strong>email:</strong>{user.email} </p>)}</div>
                    </div>
                    <div className="userName">
                        <p className="title">Comments</p>
                        <p>{this.state.event.comments}</p>
                    </div>
                </div>


                <NavBottom />

            </div>



        )
        } else return(<div>0</div>)
    }
}
