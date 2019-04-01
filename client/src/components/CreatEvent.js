import React, { Component } from 'react'

import AuthService from '../service/authService'
import NavBottom from './NavBottom/NavBottom'
import NavTop from './NavTop/NavTop'
import Button from 'react-bootstrap/Button'

export default class CreatEvent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            event: {
                location: '',
                data: '',
                hour: '',
                participants: ''
            }
        }
        //console.log(this.state)
        this.service = new AuthService()
        // this.getEvent()
    }


    handleSubmit = e => {
        e.preventDefault()
        const location = this.state.location
        const data = this.state.data
        const hour = this.state.hour
        const participants = this.state.participants

        this.service.getDataEvent(location, data, hour, participants)
            .then(res => {
                this.setState({
                    event: {
                        location: '',
                        data: '',
                        hour: '',
                        participants: ''
                    }
                })
                console.log(this.setState)
                //this.service = new Event()
                this.props.setUser(res.data)
                window.location.assign('EventList')
            })
            .catch(err => err)
    }

    handleChange = (e) => {
        const { name, value } = e.target

        //this.setState({...this.state.event, [name]: value})

        this.setState({ [name]: value });
    }

    getEvent = () => {
        this.service.getDataEvent()
            .then(res => {
                const { location, data, hour, participants } = res

                this.setState({
                    location: location,
                    data: data,
                    hour: hour,
                    participants: participants
                })

                this.props.setUser(res.data)

            })
            .catch(err => err)
    }

    render() {
        
        return (
            
            <div className="container column-center">
                <div>
                <NavBottom />
                <NavTop />
                </div>
                <h2 className="title">NUEVO EVENTO</h2>
                <form onSubmit={this.handleSubmit}>

                    <div className="form-group">

                        <select type="options" className="form-control" name="location" value={this.state.location} onChange={e => this.handleChange(e)}>
                            {/* poner en las options los distritos de la api C.Madrid */}
                            <option>¿Distrito?</option>
                            <option>¿Distrito?</option>

                        </select>
                    </div>

                    <div className="form-group">

                        <input type="date" className="form-control" name="data" placeholder="Fecha" value={this.state.data} onChange={e => this.handleChange(e)} />
                    </div>

                    <div className="form-group">

                        <input type="time" className="form-control" name="hour" placeholder="Hora" value={this.state.hour} onChange={e => this.handleChange(e)} />
                    </div>

                    <div className="form-group">
                        <input type="number" className="form-control" name="participants" placeholder="Numero de participantes" value={this.state.participants} onChange={e => this.handleChange(e)} />
                    </div>

                    <Button variant="primary" type="submit">Submit</Button>

                </form>
                


            </div>
        )
    }
}
