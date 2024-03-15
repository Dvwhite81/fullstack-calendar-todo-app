import axios from 'axios';
import { EventFormData } from '../utils/types';

const baseUrl = 'http://localhost:7000/api';

const login = async (username: string, password: string) => {
  const user = { username, password };
  const { data } = await axios.post(`${baseUrl}/login`, user);
  console.log('userService login data:', data);
  if (data.success) {
    return {
      success: true,
      message: data.message,
      user: data.user,
      token: data.token,
    };
  } else {
    return {
      success: false,
      message: data.message,
    };
  }
};

const register = async (username: string, password: string) => {
  const user = { username, password };

  const { data } = await axios.post(`${baseUrl}/register`, user);
  console.log('userService register data:', data);
  if (data.success) {
    return login(username, password);
  } else {
    return {
      success: false,
      message: data.message,
    };
  }
};

const getUserEvents = async (username: string) => {
  const { data } = await axios.get(`${baseUrl}/users/${username}/events`);
  if (data.success) {
    return {
      success: true,
      recipes: data.recipes,
    };
  } else {
    return {
      success: false,
      message: data.message,
    };
  }
};

const addUserEvent = async (username: string, newEvent: EventFormData) => {
  const { data } = await axios.post(`${baseUrl}/users/${username}/events`, {
    event: newEvent,
  });

  if (data.success) {
    return {
      success: true,
      message: data.message,
      newEvent: newEvent,
      events: data.events,
    };
  } else {
    return {
      success: false,
      message: data.message,
    };
  }
};

const deleteUserEvent = async (username: string, eventId: string) => {
  const { data } = await axios.put(
    `${baseUrl}/users/${username}/events/${eventId}`
  );

  if (data.success) {
    return {
      success: true,
      message: data.message,
      events: data.events,
    };
  }
};

const getUserByToken = async (token: string) => {
  const { data } = await axios.get(`${baseUrl}/users/${token}`);

  if (data.success) {
    return {
      success: true,
      message: data.message,
      user: data.user,
    };
  } else {
    return {
      success: false,
      message: data.message,
    };
  }
};

export default {
  addUserEvent,
  deleteUserEvent,
  getUserByToken,
  getUserEvents,
  login,
  register,
};
