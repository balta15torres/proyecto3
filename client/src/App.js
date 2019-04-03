import React, { Component } from 'react'
import './App.css'
import { Switch, Route } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import Home from "./components/Home"
import Profile from "./components/Profile"
import CreatEvent from './components/CreatEvent'
import EventList from './components/EventList'
import EventDetails from './components/EventDetails'
import EventCard from './components/EventCard'
import EditProfile from './components/EditProfile'



class App extends Component {
  constructor(props){
    super(props)
    this.state = { loggedInUser: null }
  }

  setTheUser = userObj => {
    this.setState({ loggedInUser: userObj })
  }

  render() {

    return (
      <div className="App">
        
        <header className="App-header">
       
        {/* <p>¿Estas registrado? <Link to='/login' className="nav-element">Conectate</Link></p> 
        <Link to='/signup' className="nav-element">Registrarse</Link> */}
       
          
          
          <Switch>
            
            <Route exact path='/signup'       render={() => <Signup       setUser={this.setTheUser}/>}/>
            <Route exact path='/login'        render={() => <Login        setUser={this.setTheUser}/>}/>
            <Route exact path='/home'         render={() => <Home         setUser={this.setTheUser}/>}/>
            <Route exact path='/profile'      render={() => <Profile      setUser={this.setTheUser}/>}/>
            <Route exact path='/creatEvent'   render={() => <CreatEvent   setUser={this.setTheUser}/>}/>
            <Route exact path='/eventList'    render={() => <EventList    setUser={this.setTheUser}/>}/>
            <Route exact path='/eventCard'    render={() => <EventCard    setUser={this.setTheUser}/>}/>
            <Route exact path='/editProfile'  render={() => <EditProfile  setUser={this.loggedInUser}/>}/>
            <Route path='/eventDetails/:id' exact component={EventDetails}/>

          </Switch>
        </header>
      </div>
    )
  }
}

export default App
