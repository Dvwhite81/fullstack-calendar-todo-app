import { Router } from 'express';
import 'express-async-errors';

import User from '../models/user';
import EventModel from '../models/event';

const usersRouter = Router();

const populateQuery = [
  { path: 'events', select: 'title' },
  { path: 'toDos', select: 'description' },
];

// Get All Users
usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate(populateQuery);
  res.json(users);
});

// Get User by ID
usersRouter.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json({
      user,
      events: user.events,
      toDos: user.toDos,
    });
  } else {
    res.status(404).end();
  }
});

// Get User Events by Username
usersRouter.get('/:username/events', async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username: username });

  if (user) {
    res.json({
      events: user.events,
    });
  } else {
    res.status(404).end();
  }
});

// Get User ToDos by Username
usersRouter.get('/:username/toDos', async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username: username });

  if (user) {
    res.json({
      toDos: user.toDos,
    });
  } else {
    res.status(404).end();
  }
});

// Delete Event
usersRouter.put('/:username/events/:eventId', async (req, res) => {
  const { username, eventId } = req.params;
  const user = await User.findOne({ username: username });

  if (user) {
    const { events } = user;
    user.events = events.filter(
      (event) => event._id.toString() !== eventId.toString()
    );

    await user.save();

    await EventModel.findByIdAndDelete(eventId);

    res.json({
      events: user.events,
    });
  } else {
    res.status(404).end();
  }
});

// Delete User
usersRouter.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default usersRouter;
