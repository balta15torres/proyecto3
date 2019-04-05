import React, { Component } from 'react'
import AuthService from '../service/authService'
import NavBottom from './NavBottom/NavBottom'

export default class EventDetails extends Component {

    constructor(props) {

        super(props)

        this.state = {
            event: undefined,


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
            .then(res => this.setState({ event: res }))

        window.location.assign('/EventList')

    }



    render() {
        if (this.state.event) {
            const participantsInscribed = this.state.event.participants - this.state.event.idParticipants.length

            return (
                <div>
                    {/* <button onClick={() => this.removeEvento(this.state.event.id)}>Eliminar</button> */}

                  

                    <div className="img-event -full"></div>
                    <button className="btn -destacado" onClick={() => this.addUserEvento(this.state.event.id)}>Inscribete al evento</button>
                    <div className="description-profile container">
                        <div className="userName">
                            <span className="title">Distrito : </span>
                            <span>{this.state.event.location}</span>
                        </div>
                        <div className="userName">
                            <span className="title">Centro deportivo : </span>
                            <span>{this.state.event.center}</span>
                        </div>
                        <div className="userName">
                            <span className="title">Fecha : </span>
                            <span>{this.state.event.data}</span>
                        </div>
                        <div className="userName">
                            <span className="title">Hora : </span>
                            <span>{this.state.event.hour}</span>
                        </div>
                        <div className="userName">
                            <span className="title">Nº de participantes : </span>
                            <span>{participantsInscribed}</span>
                            
                        </div>
                        <div className="userName">
                            <span className="title">Participantes : </span>
                            <div>{this.state.event.idParticipants.map(user => <span> {user.email} </span>)}</div>
                        </div>
                        <div className="userName">
                            <span className="title">Descripción del evento : </span>
                            <span>{this.state.event.comments}</span>

                        </div>
                        <div className="userName">
                            <span className="title">Teléfono de contacto :</span>
                            <span>{this.state.event.tlf}</span>

                        </div>
                        
                    </div>


                    <NavBottom />

                </div>



            )
        } else return (<div></div>)
    }
}
