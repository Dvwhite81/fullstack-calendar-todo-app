import { Router } from 'express';
import 'express-async-errors';
import bcrypt from 'bcryptjs';
import User from '../models/user';

const registerRouter = Router();

registerRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    passwordHash,
  });
  console.log('register user:', user);
  const savedUser = await user.save();
  res.status(201).json(savedUser);
});

export default registerRouter;
