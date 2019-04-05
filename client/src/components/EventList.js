import React, { Component } from 'react'
import AuthService from '../service/authService'
import EventCard from './EventCard'
import NavBottom from './NavBottom/NavBottom'

export default class EventDetails extends Component {

    constructor(props) {

        super(props)

        this.state = { events: [] }

        this.service = new AuthService()

    }

    getAllEvents = () => {
        return this.service.getEvents()
            .then(data => {
                this.setState({
                    events: data
                })
            })
    }
    componentDidMount() {
        this.getAllEvents()
    }

    render() {

        return (
            <div className="container">

                <h1 className="title">Lista de eventos</h1>
                <div >
                    {
                        this.state.events.map(event => <EventCard key={event._id} {...event} />)
                    }
                </div>
                <NavBottom />
            </div>
        )
    }
}
