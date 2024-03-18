import { SyntheticEvent, useEffect } from 'react';

import { EventType, UserType } from '../utils/types';
import { useNavigate } from 'react-router-dom';
import Calendar from '../components/Calendar/Calendar';

interface HomePageProps {
  loggedInUser: UserType | null;
  userEvents: EventType[];
  addEvent: (
    description: string,
    allDay: boolean,
    start: string,
    end: string
  ) => void;
  handleDeleteEvent: (eventId: string) => void;
  handleLogOut: (e: SyntheticEvent) => void;
}

const HomePage = ({ loggedInUser, addEvent }: HomePageProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser) {
      navigate('/login');
    }
  });

  return (
    <div className="page home-page">
      <Calendar addEvent={addEvent} />
    </div>
  );
};

export default HomePage;
