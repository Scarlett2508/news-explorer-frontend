import { MS_IN_DAY } from '../constants';

export function getLastWeekDate() {
  const currentDate = new Date();
  const previousDateInMs = 7 * MS_IN_DAY;
  const previousDate = new Date(currentDate.getTime() - previousDateInMs);

  return previousDate.toISOString().slice(0, 10);
}
