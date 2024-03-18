import { useState } from 'react';
import { getCurrentDays } from '../../utils/helpers';
import AddEventForm from '../Forms/AddEventForm';

interface CalendarDaysProps {
  currentDay: number;
  setCurrentDay: (day: number) => void;
  currentMonth: number;
  setCurrentMonth: (month: number) => void;
  currentYear: number;
  setCurrentYear: (year: number) => void;
  setCurrentDate: (date: Date) => void;
  addEvent: (
    description: string,
    allDay: boolean,
    start: string,
    end: string
  ) => void;
}

const CalendarDays = ({
  currentDay,
  setCurrentDay,
  currentMonth,
  setCurrentMonth,
  currentYear,
  setCurrentYear,
  setCurrentDate,
  addEvent,
}: CalendarDaysProps) => {
  const [showForm, setShowForm] = useState(false);

  const firstDay = new Date(currentYear, currentMonth, 1);
  const weekdayOfFirstDay = firstDay.getDay();
  const currentDays = getCurrentDays(
    currentDay,
    currentMonth,
    currentYear,
    firstDay,
    weekdayOfFirstDay
  );

  const setDay = (year: number, month: number, day: number) => {
    setCurrentDay(day);
    setCurrentMonth(month);
    setCurrentYear(year);
    setCurrentDate(new Date(year, month, day));
  };

  const handleDayClick = (year: number, month: number, day: number) => {
    setDay(year, month, day);
    // Open Modal
    setShowForm(true);
  };

  const hideForm = () => setShowForm(false);

  return (
    <div className="table-content">
      {showForm && <AddEventForm addEvent={addEvent} hideForm={hideForm} />}

      {currentDays.map((d) => (
        <div
          key={d.date.toDateString()}
          className={
            'calendar-day' +
            (d.currentMonth ? ' current' : '') +
            (d.selected ? ' selected' : '')
          }
          onClick={() => handleDayClick(d.year, d.month, d.number)}
        >
          <p className="calendar-day-text">{d.number}</p>
        </div>
      ))}
    </div>
  );
};

export default CalendarDays;
