import React from 'react'
import { Link } from 'react-router-dom'
import NavBottom from './NavBottom/NavBottom'

const EventCard = Event => {
  //console.log(Event.location)
  return (
    
      <div>
       
           
          
           <div className="col-lg-3 col-md-4 col-sm-6">
               <div>
                   <p className="title">Location</p>
                   <p>{Event.location} </p>
                   
               </div>
               <div>
                   <p className="title">Data</p>
                   <p>{Event.data}</p>
               </div>
               <div>
                   <p className="title">Hour</p>
                   <p>{Event.hour}</p>
               </div>
               <div>
                   <p className="title">Participant</p>
                   <p>{Event.participants}</p>
               </div>
               <Link to={`/eventDetails/${Event._id}`}>Ver detalles</Link>
               
            </div>
            <NavBottom/>

           
       </div>
      
      
    )
  
}
export default EventCard