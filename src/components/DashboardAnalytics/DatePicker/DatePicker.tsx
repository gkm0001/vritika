import { useState } from 'react';
import { DatePicker, DatePickerProps } from '@mantine/dates';
import classes from './DatePicker.module.css';

import '@mantine/dates/styles.css';

import { Indicator } from '@mantine/core';

const dayRenderer: DatePickerProps['renderDay'] = (date) => {
  const today = new Date();
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  const day = date.getDate();

  return (
    <Indicator size={6} offset={-5} zIndex={2} disabled={!isToday}>
      <div>{day}</div>
    </Indicator>
  );
};

const DatePickerSection = () => {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  return (
    <DatePicker
      p={10}
      px={30}
      bg="#fff"
      type="range"
      allowSingleDateInRange
      size="lg"
      defaultDate={new Date()}
      value={value}
      onChange={setValue}
      className={classes.calender}
      renderDay={dayRenderer}
      classNames={{ calendarHeader: classes.calender, day: classes.day }}
    />
  );
};
export default DatePickerSection;
