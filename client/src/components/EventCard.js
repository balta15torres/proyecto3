import React from 'react'
import { Link } from 'react-router-dom'
import NavBottom from './NavBottom/NavBottom'

const EventCard = Event => {
  console.log(Event.center.organization)
  return (
    
      <div className="">
    <div className="event-card row-start">
           <img src="/img/img-prueba2.jpg" alt="" className="image-event"/>
           <div className="description-event">
               <p className="location">{Event.location}</p>
               <p className="center">{Event.center}</p>
               <p className="data">{Event.data}</p>
               {/* <p className="hour">{Event.hour}</p> */}
               <Link to={`/eventDetails/${Event._id}`}>Ver detalles</Link>
           </div>
           <div className="participant">
            <p>{Event.participants}</p>
           </div>
       </div>
            <NavBottom/>

           
       </div>
      
      
    )
  
}
export default EventCard