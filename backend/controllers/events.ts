import { Response, Router } from 'express';
import EventModel from '../models/event';
import { EventType } from '../utils/interfaces';

const eventsRouter = Router();

eventsRouter.get('/', async (req, res: Response) => {
  console.log('GET');
  const events = await EventModel.find({}).populate('user', { username: 1 });
  console.log('events:', events);
  res.json(events);
});

eventsRouter.get('/:id', async (req, res: Response) => {
  const event = await EventModel.findById(req.params.id);
  if (event) res.json(event);
  else res.status(404).end();
});

eventsRouter.post('/', async (req, res: Response) => {
  console.log('POST');
  const { body, user } = req;

  if (!user) {
    return res.status(401).json({ error: 'missing or invalid token' });
  }

  const { event } = body;
  const { description, allDay, start, end } = event;

  const newEventModel = new EventModel({
    description,
    allDay,
    start,
    end,
    user: user.id,
  });

  const savedEventModel = await newEventModel.save();
  user.events = user.events.concat(savedEventModel._id);
  await user.save();
  res.status(201).json(savedEventModel);
});

eventsRouter.delete('/:id', async (req, res: Response) => {
  const { id } = req.params;
  const { user } = req;

  if (!user) {
    return res.status(401).json({
      error: 'missing or invalid token',
    });
  }

  const eventToDelete = await EventModel.findById(id);

  if (eventToDelete?.user?.toString() !== user.id.toString()) {
    res.status(401).end();
  } else {
    await EventModel.findByIdAndDelete(id);

    user.events = user.events.filter(
      (event: EventType) => event !== eventToDelete
    );
    await user.save();

    res.status(204).end();
  }
});

eventsRouter.put('/:id', async (req, res: Response) => {
  const { id } = req.params;
  const { description, allDay, start, end } = req.body;

  const event = {
    description,
    allDay,
    start,
    end,
  };

  const updatedEventModel = await EventModel.findByIdAndUpdate(id, event, {
    new: true,
  });
  res.json(updatedEventModel);
});

export default eventsRouter;
