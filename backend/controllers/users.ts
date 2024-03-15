import { Router } from 'express';
import 'express-async-errors';

import User from '../models/user';

const usersRouter = Router();

const populateQuery = [
  { path: 'events', select: 'title' },
  { path: 'toDos', select: 'description' },
];

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate(populateQuery);
  res.json(users);
});

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

usersRouter.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default usersRouter;
