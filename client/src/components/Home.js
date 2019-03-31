import React, { Component } from 'react'
import NavBottom from './NavBottom/NavBottom'
import NavTop from './NavTop/NavTop'

import GoogleApiWrapper from '../lib/GoogleApi'


export default class Home extends Component {
  render() {
    return (
      <div>
       <NavBottom/>
       <NavTop/>
      <GoogleApiWrapper />

       
      </div>
    )
  }
}
