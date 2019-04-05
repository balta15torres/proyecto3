import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "./NavTop.css"

export default class NavTop extends Component {

  render() {
    return (
      <div className="navTop">

        <Link to="/logout">Logout</Link>

        <Link to="/profile">Perfil</Link>

      </div>
    )
  }
}
