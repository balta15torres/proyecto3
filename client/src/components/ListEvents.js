import React, { Component } from 'react'
import NavBottom from './NavBottom/NavBottom'
import NavTop from './NavTop/NavTop'


export default class ListEvents extends Component {

  constructor(props) {
    super(props)
    this.state = {
      events: []
    }

    

  }
  
  render() {
    return (
      <div>
        <NavBottom/>
       <NavTop/>
        
        </div>
      
    )
  }
}
