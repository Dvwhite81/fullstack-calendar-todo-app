export const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const getCurrentDays = (
  day: number,
  month: number,
  year: number,
  firstDay: Date,
  weekdayOfFirstDay: number
) => {
  const currentDays = [];

  for (let d = 0; d < 42; d++) {
    if (d === 0 && weekdayOfFirstDay === 0) {
      firstDay.setDate(firstDay.getDate() - 7);
    } else if (d === 0) {
      firstDay.setDate(firstDay.getDate() + (d - weekdayOfFirstDay));
    } else {
      firstDay.setDate(firstDay.getDate() + 1);
    }

    const calendarDay = {
      currentMonth: firstDay.getMonth() === month,
      date: new Date(firstDay),
      month: firstDay.getMonth(),
      number: firstDay.getDate(),
      selected:
        firstDay.toDateString() === new Date(year, month, day).toDateString(),
      year: firstDay.getFullYear(),
    };

    currentDays.push(calendarDay);
  }

  return currentDays;
};
