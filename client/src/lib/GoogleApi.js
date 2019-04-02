// import {GoogleApiWrapper} from 'google-maps-react';
// import React, { Component } from 'react'
 
// // ...
 
// export class MapContainer extends React.Component {
//     constructor() {
//         super()
//     }

//     render() {
//         return <h1>test</h1>
//     }
// }

// const LoadingContainer = (props) => (
//     <div>Fancy loading container!</div>
//   )
 
// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyDUeQXCyJDlhOtCB8JwWAk8zCxpjk6k-jo', 
//   LoadingContainer: LoadingContainer

// })(MapContainer)

//40.3826568,-3.692763,15z

import React, { Component } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import AuthService from '../service/authService'

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

  
  render() {

    return (
      <div className="map">
      <Map google={this.props.google} zoom={14} 
        initialCenter={{
            lat: 40.3922936,
            lng: -3.6985593
        }}>
 
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
        {this.state.centros.map((centro, index) => {
          return <Marker key={index} title={centro.title} position={{lat:centro.location.latitude, lng:centro.location.longitude}}/>
          
        })}
        
        
        
        {/* <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow> */}
      </Map>
      </div>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyDUeQXCyJDlhOtCB8JwWAk8zCxpjk6k-jo'
})(MapContainer)