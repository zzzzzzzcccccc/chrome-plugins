import React, { useState, useEffect, useMemo } from 'react';
import { Typography } from '@mui/material';
import { useTheme, useTranslation } from '../../hooks';
import { timer } from '../../utils';

function RealTime() {
  const t = useTranslation();
  const [dateInstance, setInstance] = useState(new Date());
  const { theme } = useTheme();

  const { month, date, day, hours, minute, seconds } = useMemo(() => {
    const year = dateInstance.getFullYear();
    const month = dateInstance.getMonth() + 1;
    const date = dateInstance.getDate();
    const day = dateInstance.getDay();
    const hours = dateInstance.getHours();
    const minute = dateInstance.getMinutes();
    const seconds = dateInstance.getSeconds();
    return {
      year,
      month,
      date,
      day,
      hours: hours < 10 ? `0${hours}` : hours,
      minute: minute < 10 ? `0${minute}` : minute,
      seconds: seconds < 10 ? `0${seconds}` : seconds,
    };
  }, [dateInstance]);

  useEffect(() => {
    const timerId = timer.setInterval(() => setInstance(new Date()), 1000 / 60);

    return () => {
      timer.clearInterval(timerId);
    };
  }, []);

  return (
    <Typography sx={{ ml: 2, color: theme.palette.text.primary }} variant="body1">
      {month}/{date} {hours}:{minute}:{seconds} {t(`day${day}`)}
    </Typography>
  );
}

export default RealTime;
