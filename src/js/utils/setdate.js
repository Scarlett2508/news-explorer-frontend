import { months } from '../constants/others';
import { findMonth } from './findMonth';
function setDate (data){
  const date = new Date(data);
  const monthNumber = date.getMonth();
  return `${date.getDate()} ${findMonth(months,monthNumber)}, ${date.getFullYear()}`;
}


export { setDate };