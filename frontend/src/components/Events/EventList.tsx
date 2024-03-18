import { useState } from 'react';
import { EventType } from '../../utils/types';

interface EventListProps {
  userEvents: EventType[];
  handleDeleteEvent: (eventId: string) => void;
}

const EventList = ({ userEvents, handleDeleteEvent }: EventListProps) => {
  const [showEvents, setShowEvents] = useState(false);

  return (
    <div className="events-list-container">
      {!showEvents && (
        <button type="button" onClick={() => setShowEvents(true)}>
          Show Events
        </button>
      )}

      {showEvents && (
        <div>
          <button type="button" onClick={() => setShowEvents(false)}>
            Hide Events
          </button>
          <ul>
            {userEvents.map((event) => (
              <li key={event._id}>
                <p>{event.description}</p>
                <button
                  type="button"
                  onClick={() => handleDeleteEvent(event._id)}
                >
                  x
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EventList;
