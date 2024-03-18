import { SyntheticEvent, useEffect, useState } from 'react';

import { EventType, UserType } from '../utils/types';
import AddEventForm from '../components/Forms/AddEventForm';
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

const HomePage = ({ loggedInUser, addEvent, handleLogOut }: HomePageProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('useEffect loggedInUser:', loggedInUser);

    if (!loggedInUser) {
      navigate('/login');
    }
  });

  return (
    <div className="page home-page">
      <h2>Logged In User: {loggedInUser?.username}</h2>
      <button type="button" onClick={handleLogOut}>
        Log Out
      </button>

      <Calendar />

      <AddEventForm addEvent={addEvent} />
    </div>
  );
};

export default HomePage;
