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
                listCenter:undefined,
                location: '',
                center:[],
                data: '',
                hour: '',
                participants: '',
                comments: ""
            }
        }
        //console.log(this.state)
        this.service = new AuthService()
        // this.getEvent()
    }


    handleSubmit = e => {
        e.preventDefault()

        console.log(this.state)
        const location     = this.state.event.location
        const center       = this.state.event.center
        const data         = this.state.event.data
        const hour         = this.state.event.hour
        const participants = this.state.event.participants
        const comments     = this.state.event.comments

        this.service.getDataEvent(location, center,data, hour, participants,comments)
            .then(res => {
                this.setState({
                    event: {
                        location: '',
                        center:'',
                        data: '',
                        hour: '',
                        participants: '',
                        comments:''
                    }
                })
                
                //this.service = new Event()
                this.props.setUser(res.data)
                window.location.assign('EventList')
            })
            .catch(err => err)
            
        }

    handleChange = (e) => {
        const { name, value } = e.target

        //this.setState({...this.state.event, [name]: value})
        if(name == "location"){
            this.service.getCenter(value)
            .then(centros => {
                this.setState({event : { ...this.state.event ,[name]: value, listCenter:centros}})
            })
        } else {   
            this.setState({ event: {...this.state.event ,[name]: value }});
        }
    }

    getEvent = () => {
        this.service.getDataEvent()
            .then(res => {
                const { listCenter,location, center,data, hour, participants, comments } = res

                this.setState({
                    listCenter,
                    location,
                    center,
                    data,
                    hour,
                    participants,
                    comments

                })

                this.props.setUser(res.data)

            })
            .catch(err => console.log(err))
            
    }

    
    render() {
        console.log(this.state.event.center)
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
                            <option value="" disabled selected >¿distrito?</option>
                            <option value='ARGANZUELA'>ARGANZUELA</option>
                            <option value='BARAJAS'>BARAJAS</option>
                            <option value='CARABANCHEL'>CARABANCHEL</option>
                            <option value='CHAMARTIN'>CHAMARTIN</option>
                            <option value='CHAMBERI'>CHAMBERI</option>
                            <option value='CIUDAD LINEAL'>CIUDAD LINEAL</option>
                            <option value='FUENCARRAL-EL PARDO'>FUENCARRAL-EL PARDO</option>
                            <option value='HORTALEZA'>HORTALEZA</option>
                            <option value='LATINA'>LATINA</option>
                            <option value='MORATALAZ'>MORATALAZ</option>
                            <option value='MONCLOA'>MONCLOA</option>
                            <option value='PUENTE DE VALLECAS'>PUENTE DE VALLECAS</option>
                            <option value='RETIRO'>RETIRO</option>
                            <option value='SALAMANCA'>SALAMANCA</option>
                            <option value='SAN BLAS-CANILLEJAS'>SAN BLAS-CANILLEJAS</option>
                            <option value='TETUAN'>TETUAN</option>
                            <option value='USERA'>USERA</option>
                            <option value='VICALVARO'>VICALVARO</option>
                            <option value='VILLA DE VALLECAS'>VILLA DE VALLECAS</option>
                            <option value='VILLAVERDE'>VILLAVERDE</option>

                        </select>
                    </div>

                    <div className="form-group">

                        <select type="options" className="form-control" name="center" value={this.state.event.listCenter || ""} onChange={e => this.handleChange(e)}>
                            { this.state.event.listCenter!== undefined && this.state.event.listCenter.map((centro, index) => <option key={index} value={centro.title}>{centro.title}</option>)}
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
                    
                    <div className="form-group">
                        <input type="string" className="form-control" name="comments" placeholder="Comentarios" value={this.state.comments} onChange={e => this.handleChange(e)} />
                    </div>

                    <Button variant="primary" type="submit">Submit</Button>

                </form>
                


            </div>
        )
    }
}
