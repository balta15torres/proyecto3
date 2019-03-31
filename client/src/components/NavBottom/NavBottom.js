import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './NavBottom.css'

export default class NavBottom extends Component {



  
  render() {
    return (
      // onSelect={selectedKey => alert(`selected ${selectedKey}`)}
    <div className="navBottom"> 
        
          <Link to="/home">Home</Link>
        
          <Link to="/listEvents">Tus eventos</Link>
        
          <Link to="/creatEvent">Crear eventos</Link>
        
          <Link to="">Home</Link>
        
    </div>
    )
  }
}
