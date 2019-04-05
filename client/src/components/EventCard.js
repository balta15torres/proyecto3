import React from 'react'
import { Link } from 'react-router-dom'
import NavBottom from './NavBottom/NavBottom'

const EventCard = Event => {

  const participantsInscribed = Event.participants - Event.idParticipants.length
  return (
   
    <div >
      <div >

        <Link className="event-card row-start" to={`/eventDetails/${Event._id}`}>
          <div className="img-event">
          </div>
          <div className="description-event">
            <p className="location">{Event.location}</p>
            <p className="center">- {Event.center}</p>
            <p className="data">- {Event.data}</p>
          </div>
          <div className="participant">
            <p>{participantsInscribed}</p>
          </div>
        </Link>
      </div>
      <NavBottom />


    </div>


  )

}
export default EventCard