import React, { Component } from 'react'
import NavBottom from './NavBottom/NavBottom'
import GoogleApiWrapper from '../lib/GoogleApi'


export default class Home extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="container -home">
        <NavBottom />
        <div className="mapa">
          <GoogleApiWrapper {...this.props} />
        </div>



      </div>
    )
  }
}
