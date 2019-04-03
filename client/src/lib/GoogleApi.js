import React, { Component } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import AuthService from '../service/authService'
import { Link } from 'react-router-dom'
import {BrowserRouter as Router} from 'react-router-dom'

export class MapContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      center:{
        title: '',
        location : {
          latitude :"",
          longitude : ""
        },
        organization : 
        {
          schedule:"",
          services:""
        } 
      },
      centros:[]
      
    }

   
    this.service = new AuthService()

  }

  getCenter = () => {
    //console.log("sdf")
    this.service.getDataCenter() 
    .then(res => {
      //console.log(res)

      this.setState({
        centros: res
      })
    })
    .catch(err => 
      console.log(err)
    )

  }


  componentDidMount(){
    this.getCenter()
  }

  onMarkerClick = (props, marker, e) =>{
  console.log(props.events)
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      title : props.title,
      events: props.events
    })};
 
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        title : "eooo",
      })
    }
  };

    
 

  
  render() {
console.log(this.props)
    return (
      <div className="map">
      <Map google={this.props.google} zoom={14} 
      onClick={this.mapClicked}
        initialCenter={{
            lat: 40.3922936,
            lng: -3.6985593}}>
        
 
        
        {this.state.centros.map((centro, index) => {
          //console.log(centro.events)
          return <Marker key={index} title={centro.title} events={centro.events}position={{lat:centro.location.latitude, lng:centro.location.longitude}} 
          onClick={this.onMarkerClick} 
          />})}

         
         
         <InfoWindow
         
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1 className="desc-map">{this.state.title}</h1>
              {console.log(this.state)}
              <Router>
        {this.state.events ? this.state.events.map((event, index) => <p key={index} className="desc-map">
         
         <Link to={`/eventDetails/${event._id}`}>Detalles evento</Link>
         </p>)
         :null}
        </Router>
            </div>
        </InfoWindow>
        
        
      <Marker onClick={this.onMarkerClick}
        
        name={this.state.centros}
        

      />
        
        
        
        
      </Map>
      </div>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyDUeQXCyJDlhOtCB8JwWAk8zCxpjk6k-jo'
})(MapContainer)