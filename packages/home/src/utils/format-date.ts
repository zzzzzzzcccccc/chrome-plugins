export default function formatDate(dateInstance: Date) {
  const timestamp = dateInstance.getTime();
  const year = dateInstance.getFullYear();
  const month = dateInstance.getMonth() + 1;
  const date = dateInstance.getDate();
  const day = dateInstance.getDay();
  const hours = dateInstance.getHours();
  const minute = dateInstance.getMinutes();
  const seconds = dateInstance.getSeconds();
  const localeString = dateInstance.toLocaleString();

  return {
    timestamp,
    year,
    month,
    date,
    day,
    hours: hours < 10 ? `0${hours}` : hours,
    minute: minute < 10 ? `0${minute}` : minute,
    seconds: seconds < 10 ? `0${seconds}` : seconds,
    localeString,
  };
}
