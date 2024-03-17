import { SyntheticEvent, useState } from 'react';
import moment from 'moment';

interface AddEventFormProps {
  addEvent: (
    description: string,
    allDay: boolean,
    start: string,
    end: string
  ) => void;
}

const AddEventForm = ({ addEvent }: AddEventFormProps) => {
  const [description, setDescription] = useState('');
  const [allDay, setAllDay] = useState(false);
  const [start, setStart] = useState(moment().format('yyyy-MM-DD'));
  const [end, setEnd] = useState(moment().format('yyyy-MM-DD'));

  const handleAddEvent = (e: SyntheticEvent) => {
    e.preventDefault();

    if (description !== '' && start && end) {
      addEvent(description, allDay, start, end);
    }
  };
  return (
    <form onSubmit={handleAddEvent}>
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
  );
};

export default AddEventForm;
