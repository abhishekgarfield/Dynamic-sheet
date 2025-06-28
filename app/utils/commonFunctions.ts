import moment from 'moment';

export const getTimeInMinutes = (timestamp: string): string => {
  const now = moment();
  const past = moment(timestamp);

  if (!past.isValid()) {
    return 'Invalid date';
  }

  const differenceInMinutes = now.diff(past, 'minutes');
  const differenceInHours = now.diff(past, 'hours');
  const differenceInDays = now.diff(past, 'days');
  const differenceInMonths = now.diff(past, 'months');

  if (differenceInMinutes < 1) {
    return 'Just now';
  } else if (differenceInMinutes === 1) {
    return '1 min ago';
  } else if (differenceInMinutes < 60) {
    return `${differenceInMinutes} mins ago`;
  } else if (differenceInHours === 1) {
    return '1 h ago';
  } else if (differenceInHours < 24) {
    return `${differenceInHours} hrs ago`;
  } else if (differenceInDays === 1) {
    return '1 day ago';
  } else if (differenceInDays < 30) {
    return `${differenceInDays} days ago`;
  } else if (differenceInMonths === 1) {
    return '1 month ago';
  } else {
    return `${differenceInMonths} months ago`;
  }
};
