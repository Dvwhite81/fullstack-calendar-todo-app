import { SyntheticEvent, useEffect, useState } from 'react';
import moment from 'moment';
import './App.css';
import { AuthResult, EventType, UserType } from './utils/types';
import userService from './services/userService';

function App() {
  const [loggedInUser, setLoggedInUser] = useState<UserType | null>(null);
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registered, setRegistered] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [description, setDescription] = useState('');
  const [allDay, setAllDay] = useState(false);
  const [start, setStart] = useState(moment().format('yyyy-MM-DD'));
  const [end, setEnd] = useState(moment().format('yyyy-MM-DD'));

  const [showEvents, setShowEvents] = useState(false);
  const [userEvents, setUserEvents] = useState<EventType[]>([]);

  useEffect(() => {
    const checkedLoggedIn = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        const result = await userService.getUserByToken(token);

        if (result) {
          const { success } = result;

          if (success) {
            const { user } = result;
            setLoggedInUser(user);
            setRegistered(true);
          }
        }
      }
    };

    checkedLoggedIn();
  }, []);

  const handleShowEvents = () => {
    setShowEvents(true);
    console.log('userEvents:', userEvents);
  };

  const showMessage = (text: string) => {
    setMessage(text);
    setTimeout(() => {
      setMessage(null);
    }, 2000);
  };

  const handleLogOut = () => {
    localStorage.removeItem('token');
  };

  const handleRegister = async () => {
    if (registerUsername === '' || registerPassword === '') {
      return;
    }

    if (registerPassword !== confirmation) {
      return;
    }

    const result: AuthResult | undefined = await userService.register(
      registerUsername,
      registerPassword
    );

    if (result) {
      const { success } = result;
      console.log('register result:', result);
      if (success) {
        console.log('register success:', success);
        const { user } = result;
        console.log('register USER:', user);

        setConfirmation('');
        setRegistered(true);
        handleLogin(registerUsername, registerPassword);
        setRegisterUsername('');
        setRegisterPassword('');
      }
    }
  };

  const handleRegisterSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    handleRegister();
  };

  const handleLogin = async (username: string, password: string) => {
    if (username === '' || password === '') {
      return;
    }

    const result: AuthResult | undefined = await userService.login(
      username,
      password
    );

    if (result) {
      const { success, message } = result;
      console.log('login result:', result);
      if (success) {
        const { user, token } = result;
        console.log('login USER:', user);
        if (user && token) {
          setLoggedInUser(user);
          localStorage.setItem('token', token);

          setUserEvents(user.events);
        }

        setLoginUsername('');
        setLoginPassword('');
        showMessage(message);
      }
    }
  };

  const handleLogInSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    handleLogin(loginUsername, loginPassword);
  };

  const addEvent = async (e: SyntheticEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if (!loggedInUser || !token) return;

    const newEvent = {
      description,
      allDay,
      start: moment(start).format('yyyy-MM-DD'),
      end: moment(end).format('yyyy-MM-DD'),
    };

    const result = await userService.addUserEvent(token, newEvent);

    if (result) {
      const { success, message } = result;

      if (success) {
        showMessage(message);
        setDescription('');
        setAllDay(false);
        setStart(moment().format('yyyy-MM-DD'));
        setEnd(moment().format('yyyy-MM-DD'));
        setUserEvents(result.events);
      }
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    console.log('handleDeleteEvent eventId:', eventId);
    if (!loggedInUser) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    const result = await userService.deleteUserEvent(token, eventId);
    console.log('handleDelete result:', result);
    if (result) {
      const { success, events } = result;

      if (success) {
        setUserEvents(events);
        showMessage('Deleted event');
      }
    }
  };

  return (
    <div id="main-container">
      {message && <p>Message: {message}</p>}
      {loggedInUser && (
        <div>
          <h2>Logged In User: {loggedInUser.username}</h2>
          <button type="button" onClick={handleLogOut}>
            Log Out
          </button>

          {!showEvents && (
            <button type="button" onClick={handleShowEvents}>
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
                  <li key={event.id}>
                    <p>{event.description}</p>
                    <button
                      type="button"
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      x
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={addEvent}>
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={({ target }) => setDescription(target.value)}
            />
            <label>All Day?</label>
            <input
              type="checkbox"
              checked={allDay === true}
              onChange={() => setAllDay((prev) => !prev)}
            />
            <label>Start</label>
            <input
              type="date"
              value={start}
              onChange={({ target }) => setStart(target.value)}
            />
            <label>End</label>
            <input
              type="date"
              value={end}
              onChange={({ target }) => setEnd(target.value)}
            />
            <button type="submit">Add Event</button>
          </form>
        </div>
      )}
      {registered && !loggedInUser && (
        <form onSubmit={handleLogInSubmit}>
          <h2>Log In</h2>
          <label>Username</label>
          <input
            type="text"
            value={loginUsername}
            onChange={({ target }) => setLoginUsername(target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            value={loginPassword}
            onChange={({ target }) => setLoginPassword(target.value)}
          />
          <button type="submit">Log In</button>
        </form>
      )}
      {!registered && !loggedInUser && (
        <form onSubmit={handleRegisterSubmit}>
          <h2>Register</h2>
          <label>Username</label>
          <input
            type="text"
            value={registerUsername}
            onChange={({ target }) => setRegisterUsername(target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            value={registerPassword}
            onChange={({ target }) => setRegisterPassword(target.value)}
          />
          <label>Confirm</label>
          <input
            type="password"
            value={confirmation}
            onChange={({ target }) => setConfirmation(target.value)}
          />
          <button type="submit">Register</button>
        </form>
      )}
    </div>
  );
}

export default App;
