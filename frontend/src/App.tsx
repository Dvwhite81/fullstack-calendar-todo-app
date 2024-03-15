import { SyntheticEvent, useState } from 'react';
import './App.css';
import { AuthResult, UserType } from './utils/types';
import userService from './services/userService';

function App() {
  const [loggedInUser, setLoggedInUser] = useState<UserType | null>(null);
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registered, setRegistered] = useState(false);

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
        const { user, token } = result;
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
          localStorage.setItem('user', user._id);
        }

        setLoginUsername('');
        setLoginPassword('');
      }
    }
  };

  const handleLogInSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    handleLogin(loginUsername, loginPassword);
  };

  return (
    <div id="main-container">
      {loggedInUser && <h2>{loggedInUser.username}</h2>}
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
      {!registered && (
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
