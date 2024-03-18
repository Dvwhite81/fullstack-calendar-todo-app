import { useState } from 'react';

import { months, weekdays } from '../../utils/helpers';
import CalendarDays from './CalendarDays';

const Calendar = () => {
  const [currentDay, setCurrentDay] = useState(new Date().getDate());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentDate, setCurrentDate] = useState(
    new Date(currentYear, currentMonth, currentDay)
  );

  const getNextMonth = () => {
    if (currentMonth + 1 > 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const getPrevMonth = () => {
    if (currentMonth - 1 < 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  console.log('currentDay:', currentDay);
  console.log('currentDate:', currentDate);

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={getPrevMonth}>prev</button>
        <h2 className="calendar-header-text">
          {months[currentMonth]} {currentYear}
        </h2>
        <button onClick={getNextMonth}>next</button>
      </div>
      <div className="calendar-body">
        <div className="table-header">
          {weekdays.map((day) => (
            <div className="weekday">
              <p className="weekday-text">{day}</p>
            </div>
          ))}
        </div>
        <CalendarDays
          currentDay={currentDay}
          setCurrentDay={setCurrentDay}
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
          currentYear={currentYear}
          setCurrentYear={setCurrentYear}
          setCurrentDate={setCurrentDate}
        />
      </div>
      <p>{currentDate.toDateString()}</p>
    </div>
  );
};

export default Calendar;
