import React, { Component } from 'react'
// import Modal from 'react-modal'
import AuthService from '../service/authService'
import NavBottom from './NavBottom/NavBottom'
import NavTop from './NavTop/NavTop'

export default class CreatEvent extends Component {
  constructor(props) {
      super(props)
      this.state = {
        event:{
            location:'',
            data:'',
            hour:'',
            participants:''
    }
}
//console.log(this.state)
        this.service = new AuthService()
        this.getEvent()
 }

 
 handleSubmit = e => {
     e.preventDefault()
     const location = this.state.location
     const data = this.state.data
     const hour = this.state.hour
     const participants = this.state.participants
     
     this.service.getDataEvent(location, data, hour,participants)
     .then(res => {
         this.setState({
             event:{
                location:'',
                  data:'',
                  hour:'',
                  participants:''
                }
            })
            console.log(this.setState)
            //this.service = new Event()
            this.props.setUser(res.data)
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
        .then(res =>{
            const {location, data, hour, participants} = res
   
            this.setState({
                location: location, 
                data:data, 
                hour:hour, 
                participants:participants})
   
            this.props.setUser(res.data)
   
        })
        .catch (err => err)
    }
    
    render() {
        return (
      <div>
          {/* <button onClick={this.openModal} className="btn newCoaster btn-primary">Nuevo evento</button> */}
            {/* <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={customStyles}>  */}
            <NavBottom/>
       <NavTop/>
                    <h2>Nuevo evento</h2>
                    <form onSubmit={this.handleSubmit}>

                        <div className="form-group">
                
                            <label>¿Distrito?</label>
                            <select type="options" className="form-control" name="distrito" value={this.state.location} onChange={e => this.handleChange(e)}>
                            {/* poner en las options los distritos de la api C.Madrid */}
                            <option>¿Distrito?</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Fecha</label>
                            <input type="date" className="form-control" name="data" value={this.state.data} onChange={e => this.handleChange(e)} />
                        </div>

                        <div className="form-group">
                            <label>Hora</label>
                            <input type="time" className="form-control" name="hour" value={this.state.hour} onChange={e => this.handleChange(e)}  />
                        </div>

                        <div className="form-group">
                            <label>Numero de participantes</label>
                            <input type="number" className="form-control" name="participants" value={this.state.participants} onChange={e => this.handleChange(e)}  />
                        </div>

                        {/* <div className="form-group">
                            <label>Imagen</label>
                            <input type="file" className="form-control"  />
                        </div> */}

                        <button type="submit" className="btn btn-primary">Crear</button>

                    </form>

                {/* </Modal> */}
    </div>
    )
  }
}
