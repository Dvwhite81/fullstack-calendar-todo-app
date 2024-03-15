import axios from 'axios';

const baseUrl = 'http://localhost:7000/api';

const login = async (username: string, password: string) => {
  const user = { username, password };
  const { data } = await axios.post(`${baseUrl}/login`, user);
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

const addUserRecipe = async (username: string, recipe: Recipe) => {
  const { data } = await axios.post(`${baseUrl}/users/${username}/recipes`, {
    recipe: recipe,
  });

  if (data.success) {
    return {
      success: true,
      message: data.message,
      newRecipe: recipe,
      recipes: data.recipes,
    };
  } else {
    return {
      success: false,
      message: data.message,
    };
  }
};

const deleteUserRecipe = async (username: string, recipe: Recipe) => {
  const { data } = await axios.put(
    `${baseUrl}/users/${username}/recipes`,
    recipe
  );

  if (data.success) {
    return {
      success: true,
      message: data.message,
      recipes: data.recipes,
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
  addUserRecipe,
  deleteUserRecipe,
  getUserByToken,
  getUserRecipes,
  login,
  register,
};
