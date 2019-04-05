import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './NavBottom.css'

export default class NavBottom extends Component {




  render() {
    return (
      // onSelect={selectedKey => alert(`selected ${selectedKey}`)}
      <div className="navBottom">

        <Link to="/home">
          <img src="/img/home-icon.png" alt="" />
        </Link>

        <Link to="/EventList">
          <img src="/img/event.png" alt="" />
        </Link>

        <Link to="/creatEvent">
          <img className="addEvent" src="/img/eventmas.png" alt="" />
        </Link>

        <Link to="/profile">
          <img src="/img/user-dark.png" alt="" />
        </Link>

      </div>
    )
  }
}
